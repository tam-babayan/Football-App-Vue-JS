<template>
<main>
    <div class="container">
      <hr>
      <section class="text-center mb-4">
        <div class="row wow fadeIn">
          <div class="col-lg-3 col-md-6 mb-4" v-for="competition in competitions" :key="competition.id">
            <div class="card">
              <div class="view overlay">
                <router-link :to="{ path: '/game-list/' + competition.id }">
                  <img :src="competition.logo" class="card-img-top" >
                </router-link>
              </div>
              <div class="card-body text-center">
                <a href="" class="grey-text">
                  <h5>{{competition.country}}</h5>
                </a>
                <h5>
                  <strong>
                    <a href="" class="dark-grey-text">{{competition.name}}</a>
                  </strong>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
  <!-- <v-layout>
    <v-flex xs12 sm8 offset-sm2>
          <v-layout row wrap>
            <v-flex v-for="competition in competitions" :key="competition.id" d-flex>
                <router-link class="nav-item" :to="{ path: '/game-list/' + competition.id }">
                  <v-img :src="competition.logo" width="200" height="200" aspect-ratio="1"></v-img>
                </router-link>
            </v-flex>
          </v-layout>
    </v-flex>
  </v-layout> -->
</template>

<script>
import competitions from '../assets/data/competitions.json'
export default {
  data: function () {
    return {
      competitions: competitions
    }
  }
}
</script>

<style scoped>
</style>
