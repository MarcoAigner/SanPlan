<template>
    <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
              <v-col cols="12" sm="8">
                <v-card :loading="loading">
                    <v-toolbar color="primary" dark flat>
                      <v-btn
                            icon
                            dark
                            @click="goBack"
                          >
                              <v-icon>mdi-arrow-left</v-icon>
                          </v-btn>
                        <v-toolbar-title>{{service.title}}</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                    <br>
                    <v-data-table
                    height="25em"
                      :headers="tableHeaders"
                      :items="tableData"
                      :loading="loading"
                      loading-text="Material wird abgerufen"
                      no-data-text="Kein Material in der Datenbank"
                      sort-by-text="Sortieren nach"
                      :footer-props="{
                      showFirstLastPage: true,
                      firstIcon: 'mdi-arrow-collapse-left',
                      lastIcon: 'mdi-arrow-collapse-right',
                      prevIcon: 'mdi-minus',
                      nextIcon: 'mdi-plus',
                      'items-per-page-text': 'Artikel pro Seite',
                      }"
                      :header-props="{
                      'sort-by-text': 'Sortiere nach'
                      }"
                    >
                    </v-data-table>
                    <br>
                    <v-dialog
                    v-model="dialog"
                    width="500"
                    :scrollable="false">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        color="primary"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >Materialverbrauch melden</v-btn>
                    </template>
                    <v-card>
                      <v-toolbar color="primary" dark flat>
                          <v-row class="justify-space-between align-center pl-4">
                            <v-toolbar-title
                          >Was wurde verbraucht?</v-toolbar-title>
                          <v-btn
                            icon
                            dark
                            @click="dialog = false"
                          >
                              <v-icon>mdi-close</v-icon>
                          </v-btn>
                          </v-row>
                    </v-toolbar>
                    <v-card-text>
                      <br>
                      <v-autocomplete
                      id="article"
                      ref="article"
                      label="Artikel"
                      :items="articleTitles"
                      v-model="article"
                      outlined
                      spellcheck="false"
                      hide-details="auto"
                      @change="removeMobileKeyboard"
                    ></v-autocomplete>
                    <br>
                    <v-skeleton-loader
                      :loading="!articleSelected"
                      type="chip"
                      boilerplate
                      transition="fade-transition"
                    >
                      <v-chip-group
                        mandatory
                        active-class="primary--text"
                        v-model="unit"
                      >
                        <v-chip
                            v-show="articleSelected"
                            outlined
                            v-for="unit in articleUnits"
                            :key="unit.id"
                            :value="unit.id"
                        >{{ unit.unit }}</v-chip>
                      </v-chip-group>
                    </v-skeleton-loader>
                      <br>
                      <h2>Menge</h2>
                      <br>
                      <br>
                      <br>
                    <v-slider
                      min="1"
                      max="10"
                      v-model="quantity"
                      color="primary"
                      thumb-label="always"
                      thumb-size="40"
                    >
                      <template v-slot:prepend>
                        <v-icon color="primary" @click="decrementQuantity">mdi-minus</v-icon>
                      </template>
                      <template v-slot:append>
                        <v-icon color="primary" @click="incrementQuantity">mdi-plus</v-icon>
                      </template>
                    </v-slider>
                    </v-card-text>
                    <v-card-actions>
                      <v-row class="justify-space-around">
                        <v-btn   outlined :disabled="everythingSelected" @click="post" color="primary">Weiterer Artikel</v-btn>
                        <v-btn   :disabled="everythingSelected" @click="postClose" color="primary">Meldung abschließen</v-btn>
                      </v-row>
                    </v-card-actions>
                    <br>
                    </v-card>
                    </v-dialog>
                    </v-card-text>
                </v-card>
              </v-col>
            </v-row>
    </v-container>
</template>

<script>
const axios = require('axios').default
export default {
  name: 'ArticleUsage',
  data: () => ({
    loading: false,
    dialog: false,
    article: '',
    unit: null,
    quantity: 1,
    articleUsages: [],
    tableData: [],
    service: {},
    services: [],
    articles: [],
    tableHeaders: [
      {
        text: 'Artikel',
        align: 'start',
        value: 'article'
      },
      {
        text: 'Einheit',
        value: 'unit'
      },
      {
        text: 'Stück',
        value: 'quantity'
      },
      {
        text: 'Verbraucht von',
        value: 'person'
      },
      {
        text: 'Zeitpunkt',
        value: 'time'
      }

    ]
  }),
  mounted () {
    this.getService()
    this.getArticles()
    this.getArticleUsage()
  },
  watch: {
    articleUsages: function () {
      this.loading = false
      this.getTableData()
    },
    services: function () {
      this.getArticleUsage()
    }
  },
  methods: {
    removeMobileKeyboard: function () {
      this.$refs.article.blur()
    },
    goBack: function () {
      this.$router.go(-1)
    },
    getArticles: async function () {
      await axios.get(`${process.env.VUE_APP_API_URL}/article`)
        .then(response => { this.articles = response.data })
        .catch(error => { console.log(error) })
    },
    getServices: async function () {
      await axios.get(`${process.env.VUE_APP_API_URL}/medical-service?active=true`)
        .then(response => { this.services = response.data })
        .catch(error => { console.log(error) })
    },
    getService: async function () {
      await axios.get(`${process.env.VUE_APP_API_URL}/medical-service/${this.$route.params.service}`)
        .then(response => { this.service = response.data })
        .catch(error => console.log(error))
    },
    getArticleUsage: async function () {
      this.loading = true
      const url = `${process.env.VUE_APP_API_URL}/article-usage/${this.$route.params.service}`
      await axios.get(url)
        .then(response => { this.articleUsages = response.data })
        .catch(error => { console.log(error) })
      this.loading = false
    },
    getTableData: function () {
      const tableData = []
      this.articleUsages.map((el) => tableData.push({
        article: el.article.name,
        unit: el.article.unit,
        quantity: el.quantity,
        person: `${el.usedBy.lastName}, ${el.usedBy.firstName}`,
        time: new Date(el.time).toLocaleString('de-DE')
      }))
      this.tableData = tableData.reverse()
    },
    post: async function () {
      const now = new Date().toISOString()
      this.articleUsage.time = now
      await axios.post(`${process.env.VUE_APP_API_URL}/article-usage`, this.articleUsage)
        .catch(error => { console.log(error) })
      await this.getArticleUsage(this.$route.params.service)
      this.article = null
      this.unit = null
      this.quantity = 1
    },
    postClose: async function () {
      const now = new Date().toISOString()
      this.articleUsage.time = now
      await axios.post(`${process.env.VUE_APP_API_URL}/article-usage`, this.articleUsage)
        .catch(error => { console.log(error) })
      await this.getArticleUsage(this.$route.params.service)
      this.article = null
      this.unit = null
      this.quantity = 1
      this.dialog = false
    },
    incrementQuantity: function () {
      this.quantity++
    },
    decrementQuantity: function () {
      this.quantity--
    }
  },
  computed: {
    everythingSelected: function () {
      if (!this.article || !this.unit) {
        return true
      } else {
        return false
      }
    },
    articleUsage: function () {
      return {
        serviceUuid: this.$route.params.service,
        articleId: this.unit,
        quantity: this.quantity,
        usedBy: {
          firstName: 'Max',
          lastName: 'Mustermensch'
        }
      }
    },
    articleTitles: function () {
      if (this.articles) {
        return this.articles.map((article) => article.name).sort()
      }
      return []
    },
    articleUnits: function () {
      if (this.article) {
        const currentArticle = this.articles.find(art => art.name === this.article)
        let units = currentArticle.units.map((unit) => ({ id: unit.id, unit: unit.unit }))
        units = units.sort((a, b) => {
          if (a.timesUsed < b.timesUsed) {
            return -1
          }
          if (a.timesUsed > b.timesUsed) {
            return 1
          }
          return 0
        })
        return units
      }
      return []
    },
    articleSelected: function () {
      if (this.articleUnits.length === 0) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>
