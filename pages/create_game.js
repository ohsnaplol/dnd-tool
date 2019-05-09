import React, {useState} from 'react'
import firebase from '../components/firebase'
import Router from 'next/router'
import Axios from 'axios';

function create_game() {
  const [title, setTitle] = useState('')

  function onCreateGameButtonPush() {
    firebase.auth().currentUser.getIdToken(true).then(idToken => {
      Axios.post('/api/game', {
        idToken,
        title,
      }).then(() => {
        alert('game created')
        Router.push('/games')
      })
    }).catch(err => alert(err))
  }

  return (
    <div>
      <label htmlFor="game-input">Game title</label>
      <input placeholder="Game title" id="game-input" value={title} onChange={(e) => setTitle(e.target.value)}/>
      <button onClick={() => onCreateGameButtonPush()}>Create Game</button>
    </div>
  )
}

export default create_game
