<template>
<v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="grey darken-3">
                <v-toolbar-title>SignUp form</v-toolbar-title>
              </v-toolbar>
              <div class="g-signin2" data-onsuccess="onSignIn">
              <v-btn @click="signup()" color="red">Google Sign Up</v-btn></div>
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
                <v-btn color="primary">Sign Up</v-btn>
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
  methods: {
    signup () {
      var provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    }
  }
}
</script>

<style>

</style>
