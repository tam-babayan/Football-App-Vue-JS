<template>
    <v-container>
      <v-card>
        <div v-for="(massage, index) in messages" :key="index">
            <v-card>
              <v-card-title class="title blue--text">
                {{massage.name}}
                <v-spacer></v-spacer>
                <span class="body-1 grey--text">{{ moment(massage.date).format('YYYY-MM-DD, HH:mm') }}</span>
              </v-card-title>
                <v-card-text>
                  {{massage.body}}
                </v-card-text>
            </v-card>
        </div>
        </v-card>
        <v-textarea
            v-model="message"
            solo
            name='input'
            label="What's on you mind?"
            value=''>
        </v-textarea>
        <v-layout justify-center>
          <v-btn @click="writeNewPost()">Post</v-btn>
        </v-layout>
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
        console.log(this.user)
        this.isLoggedIn = true
        this.fetchPosts()
      } else {
        this.isLoggedIn = false
        this.$router.push('/')
      }
    })
  },
  methods: {
    writeNewPost () {
      // A post entry
      var postData = {
        name: this.user.displayName,
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
        .on('value', data => {
          this.messages = data.val()
        })
    }
  }
}
</script>

<style>

</style>
