<template>
    <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
              <v-col cols="12" sm="8">
                <v-card>
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>SanWD: Ulm vs. Oldenburg</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                    <v-simple-table>
                      <template>
                        <thead>
                          <tr>
                            <th class="text-left">Artikel</th>
                            <th class="text-left">Einheit</th>
                            <th class="text-left">Stück</th>
                            <th class="text-left">Verbraucht von</th>
                            <th class="text-left">Zeitpunkt</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="articleUsage in articleUsages" :key="articleUsage.id">
                            <td>{{ articleUsage.article.name }}</td>
                            <td>{{ articleUsage.article.unit}}</td>
                            <td>{{ articleUsage.quantity}}</td>
                            <td>{{ articleUsage.person.lastName }}, {{articleUsage.person.firstName}}</td>
                            <td>{{ new Date(articleUsage.time).toLocaleString('de-DE') }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
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
                      <v-chip-group
                        mandatory
                        active-class="primary--text"
                        v-model="unit"
                      >
                      <v-skeleton-loader
                      v-if="!articleSelected"
                      type="chip"
                      boilerplate
                    ></v-skeleton-loader>
                        <v-chip
                            v-show="articleSelected"
                            outlined
                            v-for="unit in articleUnits"
                            :key="unit.id"
                            :value="unit.id"
                        >{{ unit.unit }}</v-chip>
                      </v-chip-group>
                      <br>
                      <h2>Stückzahl</h2>
                      <br>
                    <v-slider
                      min="1"
                      max="10"
                      v-model="quantity"
                      color="primary"
                      thumb-label
                      thumb-size="40"
                    >
                      <template v-slot:prepend>
                        <v-icon color="primary" @click="decrementQuantity">mdi-minus</v-icon>
                      </template>
                      <template v-slot:append>
                        <v-icon color="primary" @click="incrementQuantity">mdi-plus</v-icon>
                      </template>
                    </v-slider>
                    <v-btn :disabled="loading" @click="post" color="primary">Materialverbrauch speichern</v-btn>
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
    quantity: 1
  }),
  props: {
    articleUsages: Array,
    articles: Array
  },
  watch: {
    articleUsages: function () {
      this.loading = false
    }
  },
  methods: {
    post: function () {
      this.$emit('article-used', this.articleUsage)
      this.loading = true
    },
    incrementQuantity: function () {
      this.quantity++
    },
    decrementQuantity: function () {
      this.quantity--
    }
  },
  computed: {
    articleUsage: function () {
      return {
        serviceUuid: 'f892ba64-daa8-11eb-93c1-0c9d92c91130',
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
