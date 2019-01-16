<template>
<main>
    <div class='container'>
      <hr>
      <section class='text-center mb-4'>
        <div class='row wow fadeIn'>
          <div class='col-lg-3 col-md-6 mb-4' v-for='competition in competitions' :key='competition.id'>
            <div class='card'>
              <div class='view overlay zoom'>
                <router-link :to='{ path: "/game-list/" + competition.id }'>
                  <img :src='competition.logo' class='card-img-top ' alt='league'/>
                </router-link>
              </div>
              <div class='card-body text-center'>
                  <h5 class='grey-text'>{{competition.country}}</h5>
                  <h5>
                    <strong>
                      <a href='' class='dark-grey-text'>{{competition.name}}</a>
                    </strong>
                  </h5>
                  <v-btn v-if="isFavoritesLoaded && isLoggedIn" flat icon color="pink"
                    @click='changeFavorites(competition.id)'>
                    <v-icon v-if="competition.isFavorite" large>star</v-icon>
                    <v-icon large v-else>star_border</v-icon>
                  </v-btn>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import { eventBus } from '../main'
import firebase from 'firebase/app'
import 'firebase/auth'
import competitions from '../assets/data/competitions.json'
import {database} from '../firebase/init'
export default {
  data: function () {
    return {
      competitions: competitions,
      isLoggedIn: null,
      user: null,
      isFavoritesLoaded: false
    }
  },
  created () {
    eventBus.$on('userIsSignedOut', (status) => {
      this.isLoggedIn = status
    })
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
  methods: {
    changeFavorites (id) {
      if (this.isLoggedIn) {
        this.competitions = this.competitions.map(one => {
          if (one.id === id) {
            one.isFavorite = !one.isFavorite
          }
          return one
        })
        var favorites = this.competitions.filter(one => one.isFavorite).map(one => one.id)
        database.ref('users/ ' + this.user.uid + ' /favorites').set(favorites)
      }
    },
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
          .finally(() => {
            this.isFavoritesLoaded = true
          })
      }
    }
  }
}
</script>

<style scoped>
</style>
