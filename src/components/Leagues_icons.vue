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
                  <img :src='competition.logo' class='card-img-top ' alt='league'>
                </router-link>
              </div>
              <div class='card-body text-center'>
                <a href='' class='grey-text'>
                  <h5>{{competition.country}}</h5>
                </a>
                <h5>
                  <strong>
                    <a href='' class='dark-grey-text'>{{competition.name}}</a>
                  </strong>
                </h5>
                <button class="pink-text" @click="changeFavorites(competition.id)">
                  <i class="material-icons"  style="font-size: 40px">
                    favorite_border
                  </i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import competitions from '../assets/data/competitions.json'
import {eventBus} from '../main'
export default {
  data: function () {
    return {
      competitions: competitions,
      isLoggedIn: null,
      favorites: []
    }
  },
  created () {
    eventBus.$on('changeOfUserStatus', status => {
      this.isLoggedIn = status
      console.log(this.isLoggedIn)
    })
  },
  methods: {
    changeFavorites (id) {
      if (!this.isLoggedIn) {
        alert('Please Sign In')
      } else {
        if (!this.favorites.includes(id)) {
          this.favorites.push(id)
          console.log(this.favorites)
        } else {
          for (let i = 0; i < this.favorites.length; i++) {
            if (this.favorites[i] === id) {
              this.favorites.splice(i, 1)
            }
          }
          eventBus.$emit('changeOfFavorites', this.favorites)
          // this.favorites.map(one => one !== id)
          console.log(this.favorites)
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
