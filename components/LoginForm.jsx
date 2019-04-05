import React from 'react'
import axios from 'axios'

const Login = () => {

  function onLogin(e) {
    e.preventDefault()
    console.log('logging in..')
    axios.post('/login', {username: 'play'}).then(response => {
      console.log('we logged in')
      console.log('response: ' + response.data)
    })
  }
  return (
    <>
    <form onSubmit={onLogin}>
      <label>
        username
        <input 
          type="text" 
          name="username"
          required />
      </label>
      <br/>
      <label>
        password
        <input 
          type="password"
          name="password"
          required />
      </label>
      <br/>
      <button type="submit">login</button>
    </form>
    </>
  )
}

export default Login
