<template>
  <div>
    <v-navigation-drawer v-model="drawer" app class="grey lighten-4" temporary>
        <v-list>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>
                <span>Menu</span>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <template v-for="(item, index) in items">
            <v-list-tile :href="item.href" :to="{name: item.href}" :key="index" exact>
              <v-list-tile-action>
                <v-icon light v-html="item.icon"></v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar app>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>Yo!</v-toolbar-title>
        <v-spacer></v-spacer>
        <div v-if="isLoggedIn === true">
          {{name}}
          <v-btn icon @click="signOut()">
          <i class="material-icons">
            lock_open
          </i>
        </v-btn>
        </div>
        <div v-else-if="isLoggedIn === false">
          <v-btn icon @click="signIn()">
            Login
            <i class="material-icons">
              lock
            </i>
          </v-btn>
        </div>
        <div v-else>
          Loading...
        </div>
      </v-toolbar>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  data () {
    return {
      drawer: false,
      name: null,
      isLoggedIn: null
    }
  },
  mounted () {
    this.getCurrentUser()
  },
  computed: {
    items () {
      var items = [{
        href: 'Home',
        router: true,
        title: 'Home',
        icon: 'home'
      }]

      if (this.isLoggedIn) {
        items.push({
          href: 'Favorites',
          router: true,
          title: 'Favorites',
          icon: 'favorite'
        })
      } else {
        items.push({
          href: 'SignUp',
          router: true,
          title: 'SignUp',
          icon: 'how_to_reg'
        })
      }

      return items
    }
  },
  methods: {
    getCurrentUser () {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.name = user.displayName
          this.isLoggedIn = true
        } else {
          this.isLoggedIn = false
        }
      })
    },
    signIn () {
      var provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },
    signOut () {
      firebase.auth().signOut().then(() => {
        this.isLoggedIn = false
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style scope>
</style>
