import React, { useContext } from 'react'
import UserContext from '../components/UserContext'

function games(props) {
  const user = useContext(UserContext)

  return (
    <div>
      <button>Create game</button>
    </div>
  )
}

export default games