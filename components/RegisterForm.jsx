import React from 'react'

function RegisterForm() {
  return (
    <form>
        <label>
          username
          <input 
            name="name"
            required/>
        </label><br/>
        <label>
          password
          <input 
            name="password" 
            type="password"
            required/>
        </label><br/>
        <label>
          password again
          <input 
            name="passwordVerify" 
            type="password"
            required/>
        </label><br/>
        <button type="submit">register</button>
      </form>
  )
}

export default RegisterForm
