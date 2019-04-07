import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import clientCredentials from '../credentials/client'

firebase.initializeApp(clientCredentials)
module.exports = firebase