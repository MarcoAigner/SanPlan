<template>
    <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
              <v-col cols="12" sm="8">
                <v-card :loading="loading">
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>SanWD: Ulm vs. Oldenburg</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                    <br>
                    <v-data-table
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
                    <v-autocomplete
                      id="article"
                      label="Artikel"
                      :items="articleTitles"
                      v-model="article"
                      outlined
                      spellcheck="false"
                      hide-details="auto"
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
                    <v-btn  :disabled="everythingSelected" @click="post" color="primary">Als verbraucht verbuchen</v-btn>
                    </v-card-text>
                </v-card>
              </v-col>
            </v-row>
    </v-container>
</template>

<script>
export default {
  name: 'ArticleUsage',
  data: () => ({
    loading: false,
    article: '',
    unit: null,
    quantity: 1,
    tableData: [],
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
  props: {
    articleUsages: Array,
    articles: Array
  },
  watch: {
    articleUsages: function () {
      this.loading = false
      this.getTableData()
    }
  },
  methods: {
    getTableData: function () {
      const tableData = []
      this.articleUsages.map((el) => tableData.push({
        article: el.article.name,
        unit: el.article.unit,
        quantity: el.quantity,
        person: `${el.person.lastName}, ${el.person.firstName}`,
        time: new Date(el.time).toLocaleString('de-DE')
      }))
      this.tableData = tableData.reverse()
    },
    post: function () {
      this.$emit('article-used', this.articleUsage)
      this.loading = true
      this.article = null
      this.unit = null
      this.quantity = 1
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
        serviceUuid: 'cc5a3c1e-ddbe-11eb-8a3c-0c9d92c91130',
        articleId: this.unit,
        quantity: this.quantity,
        firstName: 'Max',
        lastName: 'Mustermensch'
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
        units = units.reverse()
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
