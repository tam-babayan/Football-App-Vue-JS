<template>
    <v-container>
    <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title class="text-xs-center display-2">
            Favorites
        </v-card-title>
        <v-card-actions v-for="competition in favorites" :key="competition.id">
            <router-link :to='{ path: "/game-list/" + competition.id }'>
                <img :src='competition.logo' class='card-img-top ' alt='league'/>
            </router-link>
        <p class='grey-text'>{{competition.country}}</p>
        <p class='dark-grey-text'>{{competition.name}}</p>
        </v-card-actions>
      </v-card>
    </v-flex>
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
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user
        this.isLoggedIn = true
        this.fetchFavorites()
      } else {
        this.isLoggedIn = false
      }
    })
  },
  computed: {
    favorites () {
      return this.competitions.filter(one => one.isFavorite === true)
    }
  },
  methods: {
    fetchFavorites () {
      if (this.isLoggedIn) {
        database.ref('users/ ' + this.user.uid + ' /favorites').once('value')
          .then(snapshot => {
            var favorites = snapshot.val()
            this.competitions = this.competitions.map(one => {
              if (favorites.includes(one.id)) {
                one.isFavorite = true
              }
              return one
            })
          })
      }
    }
  }
}
</script>

<style>

</style>
