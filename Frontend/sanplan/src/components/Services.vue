<template>
    <v-container class="fill-height" fluid>
      <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>Aktive Sanitätswachdienste</v-toolbar-title>
                    </v-toolbar>
            <v-row align="center" justify="center">
              <v-col cols="12" sm="8">
                    <!--<v-list-item
                    two-line
                      v-for="service in services"
                      :key="service.id"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{service.title}}</v-list-item-title>
                        <v-list-item-subtitle v-if="service.medicalService">{{service.medicalService.number}}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>-->
                      <!--<v-list-item two-line v-for="service in services" :key="service.id">
                        <v-list-item-content>
                          <v-list-item-title>{{service.title}}</v-list-item-title>
                          <v-list-item-subtitle>{{service.medicalService.number}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>-->
                      <v-col
                        v-for="(service, id) in services"
                        :key="id"
                      >
                        <v-card
                          color="white"
                          @click="consoleLog"
                        >
                          <v-card-title>{{service.title}}</v-card-title>
                          <v-card-subtitle v-if="service.medicalService">{{service.medicalService.number}}</v-card-subtitle>
                          <v-card-text>
                            <br>
                            <v-row justify="space-around">
                              <p v-if="service.responsible">Einsatzleitung: {{service.responsible.firstName}} {{service.responsible.lastName}}</p>
                              <p v-if="service.address">{{service.address.address}}</p>
                              <v-col>
                                <p>{{new Date(service.start).toLocaleString('de-DE')}}</p>
                                <p> - </p>
                                <p>{{new Date(service.end).toLocaleString('de-DE')}}</p>
                              </v-col>
                            </v-row>
                          </v-card-text>
                          <br>
                        </v-card>
                      </v-col>
              </v-col>
            </v-row>
    </v-container>
</template>

<script>
export default {
  name: 'Services',
  data: () => ({
    loading: false
  }),
  props: {
    services: Array
  },
  watch: {
    services: function () {
      console.log(this.services)
    }
  },
  methods: {
    consoleLog: function () {
      console.log('Button clicked')
    }
  }

}
</script>
