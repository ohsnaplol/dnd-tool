import React, { useContext } from 'react'
import MyGamesManager from '../components/MyGamesManager'
import UserContext from '../components/UserContext'

function dashboard() {
  const user = useContext(UserContext)

  return (
    <div>
      <div id="game-manager-container">
        <h2>My Games</h2>
        <MyGamesManager userId={user.uid}/>
      </div>
      <style jsx>{`
        #game-manager-container {
          border: 5px solid black
        }
      `}</style>
    </div>
  )
}

export default dashboard
