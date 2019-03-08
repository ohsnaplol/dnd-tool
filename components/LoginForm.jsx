import React from 'react'

const Login = () => {
  return (
    <form>
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
  )
}

export default Login
