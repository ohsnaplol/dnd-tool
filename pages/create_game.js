import React, {useState} from 'react'
import firebase from '../components/firebase'
import Router from 'next/router'

function create_game() {
  const [gameTitle, setGameTitle] = useState('')

  function onCreateGameButtonPush() {
    firebase
    .firestore()
    .collection('/games')
    .doc()
    .set({
        title: gameTitle
    })
    .then(() => {
        alert('game created')
        Router.push('/games')
    })
  }

  return (
    <div>
      <label for="game-input">Game title</label>
      <input placeholder="Game title" id="game-input" value={gameTitle} onChange={(e) => setGameTitle(e.target.value)}/>
      <button onClick={() => onCreateGameButtonPush()}>Create Game</button>
    </div>
  )
}

export default create_game
