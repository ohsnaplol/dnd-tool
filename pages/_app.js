import React from 'react'
import UserContext from '../components/UserContext'
import App, { Container } from 'next/app'
import firebase from '../components/firebase'
import Layout from '../components/Layout'

/**
 * This class wraps our entire web app. Checks for auth changes on Google's servers,
 * and maintains this state in the MyApp state. It re-renders the whole app
 * if a change is made to the Auth state. We make the user state aviailable
 * globally with UserContext component which uses the React Context API.
 */
export default class MyApp extends App {
  static async getInitialProps ({ req, query }) {
    const user = req && req.session ? req.session.decodedToken : null
    return { user }
  }

  constructor (props) {
    super(props)
    this.state = {
      user: this.props.user,
    }
  }

  componentDidMount () {
    /**
     * This function listens for changes in auth state on Google's server, (logged in, logged out)
     * If a user is found, set the user state to the user object. Submit their 
     * token to our database in the POST request so we know if they're logged in on our database.
     * If they're not logged in on Google's server, send a logout request to our server.
     */
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user })
        return user
          .getIdToken()
          .then(token => {
              // eslint-disable-next-line no-undef
              return fetch('/api/login', {
                method: 'POST',
                // eslint-disable-next-line no-undef
                headers: new Headers({ 'Content-Type': 'application/json' }),
                credentials: 'same-origin',
                body: JSON.stringify({ token })
              })
          })
      } else {
        this.setState({ user: null })
        // eslint-disable-next-line no-undef
        fetch('/api/logout', {
          method: 'POST',
          credentials: 'same-origin'
        })
      }
    })
  }
  /**
   * Render is run when the component mounts, then every time the state or props are modified.
   */
  render () {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <UserContext.Provider value={this.state.user}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserContext.Provider>
      </Container>
    )
  }
}