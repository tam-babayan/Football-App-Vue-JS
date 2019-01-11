import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import NavBar from './components/Nav_bar.vue'
import LeaguesIcons from './components/Leagues_icons.vue'
import BreadCrumbsMatch from './components/Breadcrumbs_match_details.vue'
import BreadCrumbsTeam from './components/Breadcrumbs_team_details.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueBreadcrumbs from 'vue-breadcrumbs'

Vue.use(Vuetify)
Vue.component('navBar', NavBar)
Vue.component('leaguesIcons', LeaguesIcons)
Vue.component('breadCrumbsMatch', BreadCrumbsMatch)
Vue.component('breadCrumbsTeam', BreadCrumbsTeam)
Vue.use(VueBreadcrumbs)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDY1h7DRZVDA-kiv0hU7EgEAd4Jz-QHxDA',
    libraries: 'places'
  }
})

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
