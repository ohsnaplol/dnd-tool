import React, { Component } from 'react'
import UserContext from '../components/UserContext'
import firebase from '../components/firebase'

export default class Index extends Component {
  handleLogin (provider) {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  handleLogout () {
    firebase.auth().signOut()
  }

  render () {
    const user = this.context

    return (
      <div>
        <p>Welcome to dnd-tool{user && `, ${user.displayName}`}!</p>
        <p>
          Take your dungeon crawling to the next level 
          with real time maps, character data, and battle data!
        </p>
        {user ? (
          <button onClick={this.handleLogout}>Logout</button>
        ) : (
          <button onClick={this.handleLogin}>Google Login</button>
        )}
      </div>
    )
  }
}

Index.contextType = UserContext