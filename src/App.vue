<script>
import { defineComponent } from 'vue'
import { client } from './client.js'

export default defineComponent({
  setup() {
    console.log('setup')
    client.send('Hello World!!!')
  }
})
</script>
<template>
  <div class="App">
    Hello World!
  </div>
</template>
<style scoped>
  .App {
    font-family: Arial, Helvetica, sans-serif;
  }
</style>
