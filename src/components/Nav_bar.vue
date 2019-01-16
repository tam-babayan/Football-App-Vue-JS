<template>
  <v-container>
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
        <v-toolbar-title class="red--text">Gooaal!</v-toolbar-title>
        <v-spacer></v-spacer>
        <div v-if="isLoggedIn === true">
          <v-btn @click="signOut()" small>
            {{name}}
            <v-icon color="primary">account_circle</v-icon>
          </v-btn>
        </div>
        <div v-else-if="isLoggedIn === false">
          <v-btn @click="signIn()" small>
            Sign In
            <v-icon small color="primary">lock</v-icon>
          </v-btn>
        </div>
        <div v-else>
          Loading...
        </div>
      </v-toolbar>
  </v-container>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  data () {
    return {
      notifications: [
        'Mike, John responded to your email',
        'You have 5 new tasks',
        'You\'re now a friend with Andrew',
        'Another Notification',
        'Another One'
      ],
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
        items.push({
          href: 'Conversations',
          router: true,
          title: 'Conversations',
          icon: 'chat'
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
