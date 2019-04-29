import React, { useContext, useState, useEffect } from 'react'
import firebase from '../components/firebase'
import UserContext from '../components/UserContext'

function games(props) {
  const user = useContext(UserContext)
  const [gamesList, setGamesList] = useState(undefined)
  useEffect(() => {
    firebase
    .firestore()
    .collection('/games')
    .get()
    .then(games => {
      setGamesList(games.docs)
    })
  }, [])

  return (
    <div>
      <button>Create game</button>
      {gamesList !== undefined && 
        <ol>
          {gamesList.map(doc => 
            <li key={doc.id}>{doc.data().title}</li>
          )}
        </ol>
      }
    </div>
  )
}

export default games