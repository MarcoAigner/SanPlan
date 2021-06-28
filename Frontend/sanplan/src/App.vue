<template>
  <v-app>
    <v-main>
      <Test :messages="messages" @msg-provided="postMessage"></Test>
    </v-main>
  </v-app>
</template>

<script>
import Test from './components/Test'
const axios = require('axios').default

export default {
  name: 'App',

  components: {
    Test
  },

  data: () => ({
    messages: null
  }),
  mounted () {
    this.getMessages()
  },
  methods: {
    getMessages: async function () {
      console.log('We are now in App.vue')
      await axios.get('/api')
        .then(response => { this.messages = response.data })
        .catch(error => { console.log(error) })
    },
    postMessage: async function (message) {
      await axios.post('/api', { message: message })
        .then(response => console.log(response))
        .catch(error => console.log(error))
      this.getMessages()
    }
  }
}
</script>
