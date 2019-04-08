import React, { useContext } from 'react'
import UserContext from '../components/UserContext'

function games(props) {
  const user = useContext(UserContext)

  return (
    <div>
      <p>Welcome. You must be {user && user.displayName}</p>
      <button>Create game</button>
    </div>
  )
}

export default games