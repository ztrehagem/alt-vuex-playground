<template lang="pug">
div
  h2 Foo
  div count: {{ count }}
  div
    button(@click="increment") increment
  div
    input(type="number" v-model="input")
    button(@click="add") add
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    input: '',
  }),

  computed: {
    count() {
      return this.$store.counter.state.count
    },
  },

  methods: {
    increment() {
      this.$store.counter.actions.increment()
    },

    add() {
      this.$store.counter.actions.add(Number(this.input))
    },
  },
})
</script>
