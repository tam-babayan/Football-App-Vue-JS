import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import NavBar from './components/Nav_bar.vue'
import LeaguesIcons from './components/Leagues_icons.vue'
import BreadCrumbsMatch from './components/Breadcrumbs_match_details.vue'
import VueBreadcrumbs from 'vue-breadcrumbs'

Vue.use(Vuetify)
Vue.component('navBar', NavBar)
Vue.component('leaguesIcons', LeaguesIcons)
Vue.component('breadCrumbsMatch', BreadCrumbsMatch)
Vue.use(VueBreadcrumbs)

// Initialize Firebase
// var config = {
//   apiKey: '<API_KEY>',
//   authDomain: '<PROJECT_ID>.firebaseapp.com',
//   databaseURL: 'https://<DATABASE_NAME>.firebaseio.com',
//   projectId: '<PROJECT_ID>',
//   storageBucket: '<BUCKET>.appspot.com',
//   messagingSenderId: '<SENDER_ID>'
// }
// this.firebase.initializeApp(config)
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
