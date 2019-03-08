import React from 'react'
import Link from 'next/link'
import RegisterForm from '../components/RegisterForm'

function register() {
  document.title = "dnd-tool register"
  return (
    <div>
      <Link href='/'>
       <button>Back to Login</button>
      </Link>
      <p>You're one step closer to enhanced dungeons, items, and experiences</p>
      <RegisterForm/>
    </div>
  )
}

export default register
