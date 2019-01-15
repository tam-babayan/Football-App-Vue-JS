import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import NavBar from './components/Nav_bar.vue'
import LeaguesIcons from './components/Leagues_icons.vue'
import BreadCrumbsMatch from './components/Breadcrumbs_match_details.vue'
import Favorites from './components/Favorites.vue'
import VueBreadcrumbs from 'vue-breadcrumbs'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.use(Vuetify)
Vue.component('navBar', NavBar)
Vue.component('leaguesIcons', LeaguesIcons)
Vue.component('breadCrumbsMatch', BreadCrumbsMatch)
Vue.component('favorites', Favorites)
Vue.use(VueBreadcrumbs)

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyAxALiFeYeMFrwu2QcmnvVfxf6P7loC4_A',
  authDomain: 'football-scores-3a5f0.firebaseapp.com',
  databaseURL: 'https://football-scores-3a5f0.firebaseio.com',
  projectId: 'football-scores-3a5f0',
  storageBucket: 'football-scores-3a5f0.appspot.com',
  messagingSenderId: '457456514432'
}
firebase.initializeApp(config)
Vue.config.productionTip = false

export const eventBus = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
