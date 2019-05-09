require('dotenv').config();
const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const next = require('next')
const bodyparser = require('body-parser')
const admin = require('firebase-admin')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const firebase = admin.initializeApp(
  {
    credential: admin.credential.cert(require('./credentials/server')),
    databaseURL: "https://dnd-tool-234621.firebaseio.com"
  },
  'server'
)

app.prepare().then(() => {
  const server = express()
  server.use(bodyparser.json())
  server.use(
    session({
      secret: process.env.SESSION_SECRET,
      saveUninitialized: true,
      store: new FileStore({ path: '/tmp/sessions', secret: process.env.SESSION_SECRET }),
      resave: false,
      rolling: true,
      httpOnly: true,
      cookie: { maxAge: 604800000 } // week
    })
  )

  server.post('/api/game', (req, res, next) => {
    if (!req.body) return res.sendStatus(400)

    const { idToken, title } = req.body
    if (idToken && title) {
      firebase.auth().verifyIdToken(idToken)
        .then(decodedToken => {
          const creatorId = decodedToken.uid
          firebase
            .firestore()
            .collection('/games')
            .doc()
            .set({ creatorId, title })
            .then(() => res.sendStatus(200))
            .catch(() => res.sendStatus(500))
        })
    } else {
      return res.sendStatus(400)
    }
  })

  server.use((req, res, next) => {
    req.firebaseServer = firebase
    next()
  })

  server.post('/api/login', (req, res) => {
    if (!req.body) return res.sendStatus(400)

    const token = req.body.token
    firebase
      .auth()
      .verifyIdToken(token)
      .then(decodedToken => {
        req.session.decodedToken = decodedToken
        return decodedToken
      })
      .then(decodedToken => res.json({ status: true, decodedToken }))
      .catch(error => res.json({ error }))
  })

  server.post('/api/logout', (req, res) => {
    req.session.decodedToken = null
    res.json({ status: true })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
