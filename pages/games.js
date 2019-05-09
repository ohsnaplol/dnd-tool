import React, { useContext, useState, useEffect } from 'react'
import firebase from '../components/firebase'
import UserContext from '../components/UserContext'
import Link from 'next/link'

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
      <Link href="/create_game"><a href="/create_game">Create game</a></Link>
      {gamesList !== undefined ? 
        <ol>
          {gamesList.map(doc => 
            <li key={doc.id}>{doc.data().title}</li>
          )}
        </ol>
        :
        <p>Loading games...</p>
      }
    </div>
  )
}

export default games