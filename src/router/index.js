import Vue from 'vue'
import Router from 'vue-router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Home from '../components/Home.vue'
import GameList from '../components/Game_list.vue'
import GameDetails from '../components/Game_Details.vue'
import TeamDetails from '../components/Team_Details.vue'

Vue.use(Vuetify)
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [{
    path: '/',
    name: 'Home',
    component: Home,
    props: true
  },
  {
    path: '/game-list/:id',
    name: 'GameList',
    component: GameList,
    props: true
  },
  {
    path: '/game-details/:id',
    name: 'GameDetails',
    component: GameDetails,
    props: true
  },
  {
    path: '/team-details/:id',
    name: 'TeamDetails',
    component: TeamDetails,
    props: true
  }
  ]
})
