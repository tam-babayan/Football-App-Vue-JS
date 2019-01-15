import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyAxALiFeYeMFrwu2QcmnvVfxf6P7loC4_A',
  authDomain: 'football-scores-3a5f0.firebaseapp.com',
  databaseURL: 'https://football-scores-3a5f0.firebaseio.com',
  projectId: 'football-scores-3a5f0',
  storageBucket: 'football-scores-3a5f0.appspot.com',
  messagingSenderId: '457456514432'
}
firebase.initializeApp(config)
export var database = firebase.database()
