<template>
    <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
              <v-col cols="12" sm="8">
                <v-card>
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>SanPlan</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                    <v-simple-table>
                      <template>
                        <thead>
                          <tr>
                            <th class="text-left">ID</th>
                            <th class="text-left">Nachricht</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="message in messages" :key="message.id">
                            <td>{{ message.id }}</td>
                            <td>{{ message.message}}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                    <v-text-field
                    label="Neue Nachricht eingeben"
                    v-model="input"
                    @keyup.enter="post"
                    :loading="loading">
                    </v-text-field>
                    <v-btn :disabled="loading" @click="post" color="primary">Nachricht speichern</v-btn>
                    </v-card-text>
                </v-card>
              </v-col>
            </v-row>
    </v-container>
</template>

<script>
export default {
  name: 'Test',
  data: () => ({
    input: '',
    loading: false
  }),
  props: {
    messages: Array
  },
  watch: {
    messages: function () {
      this.loading = false
    }
  },
  methods: {
    post: function () {
      console.log('Inside post function')
      this.$emit('msg-provided', this.input)
      this.input = ''
      this.loading = true
    }
  }
}
</script>
