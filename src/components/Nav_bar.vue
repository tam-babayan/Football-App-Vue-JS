<template>
  <div>
    <v-navigation-drawer :width="200" v-model="drawer" app class="white" temporary>
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
      <v-toolbar app class="white" >
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title class="blue--text"></v-toolbar-title>
        <v-spacer></v-spacer>
        <div v-if="isLoggedIn === true" class="blue--text font-weight-medium">
          <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="50" offset-x>
            <i flat small slot="activator" dark>
              <v-spacer></v-spacer>
              <v-avatar size="35"><v-img :src="photo" alt="img"></v-img></v-avatar>
            </i>
            <v-card>
              <v-list>
                <v-list-tile avatar>
                  <v-list-tile-avatar>
                    <v-img :src="photo" alt="img"></v-img>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{name}}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
              <v-divider></v-divider>
              <v-list>
                <v-list-tile>
                  <v-list-tile-action>
                    <v-switch v-model="notification" color="blue"></v-switch>
                  </v-list-tile-action>
                  <v-list-tile-title>Enable notifications</v-list-tile-title>
                </v-list-tile>
              </v-list>
              <v-card-actions>
                <v-btn color="primary" flat @click="signOut()">Sign Out</v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </div>
        <div v-else-if="isLoggedIn === false">
          <v-btn flat @click="signIn()" small >
            <span class="primary--text body-2">Sign In</span>
            <v-icon  color="primary">lock</v-icon>
          </v-btn>
        </div>
        <div class="blue--text font-weight-medium" v-else>
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
      photo: null,
      isLoggedIn: null,
      // fav: true,
      menu: false,
      notification: false
    }
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
  mounted () {
    this.getCurrentUser()
  },
  methods: {
    getCurrentUser () {
      firebase.auth().onAuthStateChanged((user) => {
        console.log(user)
        if (user) {
          this.name = user.displayName
          this.photo = user.photoURL
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
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style scope>
v-icon {
  padding-top: 10px
}
</style>
