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
