import React from 'react'
import Link from 'next/link'
import Login from '../components/LoginForm'

export default function index() {
  return (
    <div>
      <p>Welcome to dnd-tool!</p>
      <p>
        Take your dungeon crawling to the next level 
        with real time maps, character data, and battle data!
      </p>
      <Login/><br/>
      <Link href='/register'>
        <button>register</button>
      </Link>
    </div>
  )
}
