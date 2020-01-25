import Vue from 'vue'
import App from './App.vue'
import * as store from './store'

Vue.prototype.$store = store

declare module 'vue/types/vue' {
  export interface Vue {
    readonly $store: typeof store
  }
}

const app = new Vue({
  render: h => h(App)
}).$mount('#app')

Object.defineProperty(window, '$app', { value: app })
