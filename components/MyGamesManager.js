import React, { useState, useEffect, useCallback } from 'react'
import firebase from '../components/firebase'
import CreateGame from './CreateGame'

function MyGamesManager({ userId }) {
  const [gamesList, setGamesList] = useState(undefined)
  const [isCreatingGame, setIsCreatingGame] = useState(false)

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
      .then(() => {
        setGamesList(gamesList.filter(game => game.id !== id))
      })
      .catch(error => alert(error))
  }

  function onCreateGameClick() {
    setIsCreatingGame(true)
  }

  if (gamesList === undefined) {
    return <p>Loading...</p>
  } else {
    return (
      <>
        {isCreatingGame ?
          <CreateGame />
          :
          <>
            <button onClick={onCreateGameClick}>Create Game</button>
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
        }
      </>
    )
  }
}

export default MyGamesManager
