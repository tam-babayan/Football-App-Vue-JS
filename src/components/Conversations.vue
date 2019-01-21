<template>
    <v-container>
      <v-card>
        <div v-for="(massage, key) in messages" :key="key">
            <v-card>
              <v-card-title class="title blue--text">
                {{massage.name}}
                <v-spacer></v-spacer>
                <span class="body-1 grey--text">{{ moment(massage.date).format('YYYY-MM-DD, HH:mm') }}</span>
              </v-card-title>
                <v-card-text>
                  {{massage.body}}
                </v-card-text>
                <v-card-actions>
                  <v-flex px-3 pb-2>
                    <v-icon class="material-icons" color='primary' @click="vote(key, 'up')"> thumb_up</v-icon>
                      {{massage.likes}}
                    <v-icon class="material-icons" color='red' @click="vote(key, 'down')"> thumb_down</v-icon>
                      {{massage.dislikes}}
                  </v-flex>
                </v-card-actions>
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
          <v-btn @click="writeNewPost()" class="primary">Post</v-btn>
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
  // Get the currently signed-in user by setting an observer on the Auth object
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user
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
        date: new Date(),
        likes: 0,
        dislikes: 0
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
    },
    // increment likes and dislikes locally and update firebase post
    vote (id, direction) {
      if (direction === 'up') {
        this.messages[id].likes++
      } else {
        this.messages[id].dislikes++
      }
      var updates = {}
      updates[id] = this.messages[id]
      database
        .ref('posts')
        .update(updates)
    }
  }
}
</script>

<style scoped>
.v-text-field__slot {
  margin-right: 5px;
  margin-left: 5px
}
</style>
