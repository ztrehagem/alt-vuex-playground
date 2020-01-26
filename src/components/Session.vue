<template lang="pug">
div
  h2 Session
  div isLoggedIn: {{ isLoggedIn }}
  div(v-if="isLoggedIn")
    button(@click="logout" :disabled="disabled") logout
  div(v-else)
    input(type="text" v-model="email" placeholder="email")
    input(type="password" v-model="password" placeholder="password")
    button(@click="login" :disabled="disabled") login
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data: () => ({
    email: '',
    password: '',
    disabled: false,
  }),

  computed:{
    isLoggedIn() {
      return this.$store.session.state.isLoggedIn
    },
  },

  methods: {
    async login() {
      this.disabled = true

      try {
        await this.$store.session.actions.login(this.email, this.password)
      } catch (error) {
        console.warn(error)
      } finally {
        this.disabled = false
      }
    },

    async logout() {
      this.disabled = true

      try {
        await this.$store.session.actions.logout()
      } catch (error) {
        console.warn(error)
      } finally {
        this.disabled = false
      }
    }
  },
})
</script>
