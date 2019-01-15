<template>
    <v-container>
        <div v-for="(massage, index) in messages" :key="index">
            <v-card>{{massage.name}} {{ moment(massage.date).format('YYYY-MM-DD, HH:mm') }} {{massage.body}}</v-card>
        </div>
        <v-textarea
            v-model="message"
            solo
            name='input-7-4'
            label='Solo textarea'
            value='The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through.'>
        </v-textarea>
        <v-btn @click="writeNewPost()">Post</v-btn>
    </v-container>
</template>

<script>
import {database} from '../firebase/init'
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  name: 'Conversations',
  data () {
    return {
      message: '',
      isLoggedIn: null,
      user: null,
      messages: []
    }
  },
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user
        this.isLoggedIn = true
        this.fetchPosts()
      } else {
        this.isLoggedIn = false
      }
    })
  },
  methods: {
    writeNewPost () {
      // A post entry
      var postData = {
        name: this.user.email,
        body: this.message,
        date: new Date()
      }
      // Get a key for a new Post
      var newPostKey = database
        .ref()
        .child('posts')
        .push().key
      // Write the new post's data simultaneously in the posts list and the user's post list
      var updates = {}
      updates[newPostKey] = postData

      database
        .ref('posts')
        .update(updates)
      this.message = ''
      // Refresh list of post on the page
      this.fetchPosts()
    },
    fetchPosts () {
      // Access 'posts' collection
      database
        .ref('posts')
        .once('value', data => {
          console.log(data.val())
          this.messages = data.val()
        })
    }
  }
}
</script>

<style>

</style>
