import React, { useState, useEffect } from 'react'
import firebase from '../components/firebase'
import CreateGame from './CreateGame'

function MyGamesManager({ userId }) {
  const [gamesList, setGamesList] = useState(undefined)

  useEffect(() => {
    firebase
      .firestore()
      .collection('/games')
      .where('creatorId', '==', userId)
      .get()
      .then(games => {
        setGamesList(games.docs)
      }).catch(err => console.error(err))
  }, [userId])

  function onDeleteClick(id, index) {
    firebase
      .firestore()
      .collection('/games')
      .doc(id)
      .delete()
      .then(data => {
        console.log('data',data)
      })
      .catch(error => {
        console.error(error)
      })
    console.log('lets delete game of id', id, 'and index', index)
  }

  if (gamesList === undefined) {
    return <p>Loading...</p>
  } else {
    return (
      <>
        <CreateGame />
        <ul>
          {gamesList.length > 1 ?
            <ul>
              {gamesList.map((doc, i) =>
                <li key={doc.id}><span>{doc.data().title}</span><button onClick={() => onDeleteClick(doc.id, i)}>delete</button></li>
              )}
            </ul>
            :
            <p>You have no games.</p>
          }
        </ul>
      </>
    )
  }
}

export default MyGamesManager
