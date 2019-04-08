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
      <Link href="/games"><a>games</a></Link> dashboard
      {user && user.displayName}
      <img src="https://lh3.googleusercontent.com/-IP2t_UAceYM/AAAAAAAAAAI/AAAAAAABSz4/i0o5hk6NFt8/photo.jpg"/>
      {user && <button onClick={handleLogout}>Logout</button>}
      {children}
      <style jsx>{`
        img {
          height: 20px;
        }
      `}</style>
    </div>
  )
}

export default Layout
