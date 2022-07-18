<template>
  <div></div>
</template>
<script>
// import jwt_decode from "jwt-decode";
import { mapState, mapActions } from 'vuex'
import UserService from '@/services/user.service'
import VueJwtDecode from 'vue-jwt-decode'

export default {
  name: 'Login',
  mounted() {
    // set the toke and reload
    const token = this.$route.query._token
    localStorage.setItem('token', token)
    this.setToken(token)
    if (token || localStorage.getItem('token')) {
      this.handleLogin(token)
    } else {
      this.handleRedirect()
    }
  },
  methods: {
    handleLogin(token) {
      this.$cookies.set('_token', token)

      // Update the user cookie
      if (token) {
        this.$cookies.set('_token', token, {
          domain: process.env.COOKIEDOMAIN,
          path: '/',
          secure: process.env.COOKIESECURE,
          maxAge: 60 * 60 * 24 * 7,
        })
        this.handleLoginData(token)
      }

      // redirect to the homepage
      location.href = process.env.WEBSITEURL
    },
    handleLoginData(token) {
      localStorage.setItem('_token', token)
    },
    handleRedirect() {
      location.href = '/dashboard'
    },
  },
}
</script>
