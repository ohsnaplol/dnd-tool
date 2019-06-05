import React, { useContext } from 'react'
import UserContext from '../components/UserContext'
import firebase from '../components/firebase'
import Link from 'next/link'

function Layout(props) {
  const user = useContext(UserContext)
  function handleLogout() {
    firebase.auth().signOut()
  }
  const { children } = props
  return (
    <div className='layout'>
      <header>
        <h1>DND Tool</h1>
        {user &&
          <>
            <span>{user.displayName}</span>
            {user.photoURL && <img src={user.photoURL} alt="Profile" />}
            <button onClick={handleLogout}>Logout</button>
          </>
        }
      </header>
      {children}
      <style jsx>{`
        h1 {
          display: inline-block;
          margin-right: 20px;
        }
        img {
          height: 20px;
        }
        nav {
          display: inline-block;
        }
        nav > * {
          margin-right: 10px;
        }
      `}</style>
    </div>
  )
}

export default Layout
