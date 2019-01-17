<template>
<v-app id="inspire">
    <v-content>
      <v-container >
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="blue darken-3">
                <v-layout justify-space-between row>
                <v-toolbar-title>Sign In</v-toolbar-title>
                <i @click="userSignIn()">
                  <v-img src="./static/img/btn_google_signin_light_normal_web.png" :width="200" :height='50'></v-img>
                </i>
                </v-layout>
              </v-toolbar>
              <!-- <v-btn @click="signup()" color="blue">Google Sign Up</v-btn> -->
              <v-card-text>
                <v-form @submit.prevent="signup" v-model="valid">
                  <v-text-field v-model="firstname" :rules="nameRules"
                        :counter="10"
                        label="First name"
                        required>
                  </v-text-field>
                  <v-text-field v-model="lastname" :rules="nameRules"
                        :counter="10"
                        label="Last name"
                        required>
                  </v-text-field>
                  <v-text-field v-model="email" :rules="emailRules"
                        label="E-mail"
                        required>
                  </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary">Sign In</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
export default {
  name: 'signUp',
  data: () => ({
    valid: false,
    firstname: '',
    lastname: '',
    isLoggedIn: null,
    nameRules: [
      v => !!v || 'Name is required',
      v => v.length <= 10 || 'Name must be less than 10 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ]
  }),
  mounted () {
    this.getCurrentUser()
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
    userSignIn () {
      var provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
      this.isLoggedIn = true
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
