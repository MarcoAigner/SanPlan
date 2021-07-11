<template>
    <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
              <v-col cols="12" sm="8">
                <v-card>
                  <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>Aktive Sanitätswachdienste</v-toolbar-title>
                        </v-toolbar>
                      <v-col
                        v-for="(service, id) in services"
                        :key="id"
                      >
                        <v-card
                          color="white"
                          @click="consoleLog(service)"
                        >
                          <v-card-title>{{service.title}}</v-card-title>
                          <v-card-subtitle v-if="service.medicalService">{{service.medicalService.number}}</v-card-subtitle>
                        </v-card>
                      </v-col>
                </v-card>
              </v-col>
            </v-row>
    </v-container>
</template>

<script>
const axios = require('axios').default
export default {
  name: 'Services',
  data: () => ({
    loading: false,
    services: []
  }),
  mounted () {
    this.getServices()
  },
  methods: {
    getServices: async function () {
      await axios.get('/api/medical-service?active=true')
        .then(response => { this.services = response.data })
        .catch(error => { console.log(error) })
    },
    consoleLog: function (service) {
      console.log(service)
      const uuid = service.uuid
      console.log(uuid)
      this.$router.push({ name: 'ArticleUsage', params: { service: uuid } })
    }
  },
  computed: {
  }

}
</script>
