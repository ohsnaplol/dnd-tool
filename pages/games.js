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

games.getInitialProps = async ({ req }) => {
  const user = req && req.session ? req.session.decodedToken : null
  return { user }
}

export default games