import React, { useState, useEffect, useCallback } from 'react'
import firebase from '../components/firebase'
import CreateGame from './CreateGame'

function MyGamesManager({ userId }) {
  const [gamesList, setGamesList] = useState(undefined)
  const [isCreatingGame, setIsCreatingGame] = useState(false)

  const onCreateGame = useCallback(() => {
    console.log('on create game')
    setIsCreatingGame(false)
  }, [isCreatingGame])

  // Trying to figure how to only run effect on mount (working), 
  // and when onCreateGame is called
  useEffect(() => {
    console.log('effect called')
    firebase
      .firestore()
      .collection('/games')
      .where('creatorId', '==', userId)
      .get()
      .then(games => {
        setGamesList(games.docs)
      }).catch(err => alert(err))
  }, [userId, onCreateGame])

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
  } else if (isCreatingGame) {
    return <CreateGame onCreateGame={() => onCreateGame()}/>
  } else {
    return (
      <>
        <button onClick={onCreateGameClick}>Create Game</button>
        <ul>
          {gamesList.length > 0 ?
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
