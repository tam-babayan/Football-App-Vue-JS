// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import NavBar from './components/Nav_bar.vue'
import LeaguesIcons from './components/Leagues_icons.vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(Vuetify)
Vue.component('navBar', NavBar)
Vue.component('leaguesIcons', LeaguesIcons)

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
