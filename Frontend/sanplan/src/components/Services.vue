<template>
    <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
              <v-col cols="12" sm="8">
                <v-card>
                  <v-toolbar color="primary" dark flat>
                        <v-row
                          class="justify-space-between"
                        >
                          <v-toolbar-title
                           class="pl-4"
                          >Aktive Sanitätswachdienste</v-toolbar-title>
                        </v-row>
                        </v-toolbar>
                      <v-btn
                            color="red"
                            dark
                            @click="resetDemo"
                            class="pr-4"
                          >Demo zurücksetzen</v-btn>
                      <v-col
                        v-for="(service, id) in services"
                        :key="id"
                      >
                        <v-card
                          color="white"
                          @click="moveToService(service)"
                        >
                          <v-card-title>{{service.title}}</v-card-title>
                          <v-card-subtitle v-if="service.medicalService">{{service.medicalService.number}}</v-card-subtitle>
                        </v-card>
                      </v-col>
                  <v-card-actions>
                    <v-dialog
                    v-model="dialog"
                    width="500"
                    :scrollable="false"
                    @click:outside="resetInput">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      v-bind="attrs"
                      v-on="on"
                    >Neuer Sanitätswachdienst</v-btn>
                  </template>
                  <v-card>
                    <v-toolbar color="primary" dark flat>
                          <v-row class="justify-space-between align-center pl-4">
                            <v-toolbar-title
                          >Neuer Sanitätswachdienst</v-toolbar-title>
                          <v-btn
                            icon
                            dark
                            @click="resetInput"
                          >
                              <v-icon>mdi-close</v-icon>
                          </v-btn>
                          </v-row>
                    </v-toolbar>
                    <v-card-text>
                      <br>
                      <v-text-field
                      label="Titel"
                      outlined
                      spellcheck="false"
                      hide-details="auto"
                      v-model="title"
                      ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        color="primary"
                        @click="postNewService"
                        :disabled="title === ''"
                      >Dienst anlegen</v-btn>
                    </v-card-actions>
                  </v-card>
                  </v-dialog>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
            <v-dialog
                        v-model="resetDialog"
                        persistent
                        width="300"
                      >
                        <v-card
                          color="primary"
                          dark
                        >
                          <v-card-text>
                            Die Demo wird zurückgesetzt
                            <v-progress-linear
                              indeterminate
                              color="white"
                              class="mb-0"
                            ></v-progress-linear>
                          </v-card-text>
                        </v-card>
                      </v-dialog>
    </v-container>
</template>

<script>
const axios = require('axios').default
export default {
  name: 'Services',
  data: () => ({
    loading: false,
    dialog: false,
    services: [],
    title: '',
    resetDialog: false
  }),
  mounted () {
    this.getServices()
  },
  methods: {
    resetDemo: async function () {
      this.resetDialog = true
      await axios.get(`${process.env.VUE_APP_API_URL}/reset`)
        .then(() => (this.resetDialog = false))
        .catch(error => console.log(error))
      this.getServices()
      // this.resetDialog = false
    },
    resetInput: function () {
      if (this.dialog === true) {
        this.dialog = false
      }
      this.title = ''
    },
    getServices: async function () {
      await axios.get(`${process.env.VUE_APP_API_URL}/medical-service?active=true`)
        .then(response => { this.services = response.data })
        .catch(error => { console.log(error) })
    },
    moveToService: function (service) {
      const uuid = service.uuid
      this.$router.push({ name: 'ArticleUsage', params: { service: uuid } })
    },
    postNewService: async function () {
      await axios.post(`${process.env.VUE_APP_API_URL}/medical-service`, this.newService)
        .then(response => this.services.push(response.data))
        .catch(error => console.log(error))
      this.resetInput()
    }
  },
  computed: {
    newService: function () {
      const endDate = new Date()
      endDate.setTime(endDate.getTime() + (2 * 60 * 60 * 1000))
      return {
        title: this.title,
        start: new Date().toISOString(),
        end: endDate.toISOString(),
        responsible: {
          firstName: 'Chef',
          lastName: 'Vom Dienst'
        },
        medicalService: {
          number: `#${this.services[this.services.length - 1].id + 1}/21`
        }
      }
    }
  }

}
</script>
