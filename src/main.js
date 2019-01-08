// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import carousel from './components/Carousel_images'
import calendar from './components/Calendar'
import 'vuetify/dist/vuetify.min.css'
import Home from './components/Home'
import NavBar from './components/Nav_bar.vue'
import GameList from './components/Game_list.vue'
import LeaguesIcons from './components/Leagues_icons.vue'
import staticJson from './assets/data/clubs.json'
import GameDetails from './components/Game_Details.vue'
import TeamDetails from './components/Team_Details.vue'

Vue.use(Vuetify)
Vue.component('home', Home)
Vue.component('navBar', NavBar)
Vue.component('gameList', GameList)
Vue.component('carousel', carousel)
Vue.component('calendar', calendar)
Vue.component('leaguesIcons', LeaguesIcons)
Vue.component('staticJson', staticJson)
Vue.component('gameDetails', GameDetails)
Vue.component('teamDetails', TeamDetails)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
