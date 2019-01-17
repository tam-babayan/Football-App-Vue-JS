<template>
<v-container>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <h1 class="font-weight-medium text-xs-center">Favorites</h1>
        <v-layout>
          <v-flex>
            <v-card v-for="competition in favorites" :key="competition.id">
              <router-link :to='{ path: "/game-list/" + competition.id }'>
                <v-img :src='competition.logo'  alt='league'/>
              </router-link>
              <v-flex mb-4>
                <h5 class="font-weight-medium text-xs-center">{{competition.country}}</h5>
                <v-spacer></v-spacer>
                <h4 class="font-weight-medium text-xs-center">{{competition.name}}</h4>
              </v-flex>
            </v-card>
          </v-flex>
        </v-layout>
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
        this.$router.push('/')
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
