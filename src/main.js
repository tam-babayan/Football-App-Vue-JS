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
