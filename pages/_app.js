import React from 'react'
import UserContext from '../components/UserContext'
import App, { Container } from 'next/app'
import Link from 'next/link'
import firebase from '../components/firebase'

class Layout extends React.Component {
  render () {
    const { children } = this.props
    return (
      <div className='layout'>
        <Link href="/"><a>index</a></Link>
        <Link href="/games"><a>games</a></Link> dashboard
        {children}
      </div>
    )
  }
}

export default class MyApp extends App {
  static async getInitialProps ({ req, query }) {
    const user = req && req.session ? req.session.decodedToken : null
    return { user }
  }

  constructor (props) {
    super(props)
    this.state = {
      user: this.props.user,
    }
  }

  componentDidMount () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user })
        return user
          .getIdToken()
          .then(token => {
              // eslint-disable-next-line no-undef
              return fetch('/api/login', {
                method: 'POST',
                // eslint-disable-next-line no-undef
                headers: new Headers({ 'Content-Type': 'application/json' }),
                credentials: 'same-origin',
                body: JSON.stringify({ token })
              })
          })
      } else {
        this.setState({ user: null })
        // eslint-disable-next-line no-undef
        fetch('/api/logout', {
          method: 'POST',
          credentials: 'same-origin'
        })
      }
    })
  }

  render () {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <UserContext.Provider value={this.state.user}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserContext.Provider>
      </Container>
    )
  }
}