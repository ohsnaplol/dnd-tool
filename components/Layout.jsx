import React, { useContext } from 'react'
import UserContext from '../components/UserContext'
import firebase from '../components/firebase'
import Link from 'next/link'

function Layout(props) {
  const user = useContext(UserContext)
  function handleLogout () {
    firebase.auth().signOut()
  }
  const { children } = props
  return (
    <div className='layout'>
      <Link href="/"><a>index</a></Link>
      <Link href="/games"><a>games</a></Link>
      <span>dashboard</span>
      {user && 
        <>
          <span>{user.displayName}</span>
          {user.photoURL && <img src={user.photoURL} alt="Profile"/>}
          <button onClick={handleLogout}>Logout</button>
        </>
      }
      {children}
      <style jsx>{`
        img {
          height: 20px;
        }
        .layout > * {
          margin-right: 10px;
        }
      `}</style>
    </div>
  )
}

export default Layout
