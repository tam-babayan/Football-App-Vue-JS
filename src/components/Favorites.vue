<template>
<v-container class="favorites">
  <h1 class="font-weight-medium text-xs-center">Favorites</h1>
  <v-layout row wrap justify-space-around>
    <v-card v-for="competition in favorites" :key="competition.id" width='300'>
      <v-icon class="delete material-icons" icon @click="deleteFavorite(competition.id)">delete</v-icon>
      <v-layout align-center justify-center>
          <router-link :to='{ path: "/game-list/" + competition.id }'>
            <v-img :src='competition.logo' width="150" alt='league'/>
          </router-link>
      </v-layout>
      <v-layout align-center justify-center>
          <v-card-text>
            <h4 class="font-weight-medium text-xs-center">{{competition.name}}</h4>
          </v-card-text>
      </v-layout>
    </v-card>
  </v-layout>
</v-container>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import competitions from '../assets/data/competitions.json'
import {database} from '../firebase/init'
export default {
  name: 'favorites',
  data () {
    return {
      competitions: competitions,
      isLoggedIn: null
    }
  },
  // Get the currently signed-in user by setting an observer on the Auth object
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user
        this.isLoggedIn = true
        this.fetchFavorites()
      } else {
        this.isLoggedIn = false
        this.$router.push('/')
      }
    })
  },
  // filters the object with "true" value
  computed: {
    favorites () {
      return this.competitions.filter(one => one.isFavorite === true)
    }
  },
  methods: {
    // fetching id list and mapping competitions to set the matching leagues isFavorite key into true
    fetchFavorites () {
      if (this.isLoggedIn) {
        database.ref(`users/${this.user.uid}/favorites`).once('value')
          .then(snapshot => {
            var favorites = snapshot.val() || []
            this.competitions = this.competitions.map(one => {
              if (favorites.includes(one.id)) {
                one.isFavorite = true
              }
              return one
            })
          })
      }
    },
    // mapping competitions to set the matching league isFavorite key into false
    deleteFavorite (id) {
      this.competitions = this.competitions.map(one => {
        if (one.id === id) {
          one.isFavorite = false
        }
        return one
      })
      // sending the changed favorite leagues list to database
      var favorites = this.competitions.filter(one => one.isFavorite).map(one => one.id)
      database.ref(`users/${this.user.uid}/favorites`).set(favorites)
    }
  }
}
</script>

<style scope>
.favorites .delete {
  position: absolute;
  right: 4px;
  color: #aaa;
}
.v-card {
  margin: 10px
}
</style>
