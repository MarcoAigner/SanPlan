<template>
  <v-app>
    <v-main>
      <ArticleUsage
        :articles="articles"
        @article-used="postArticleUsage"
       ></ArticleUsage>
       <!--<Services
        :services="services"
       ></Services>-->
    </v-main>
  </v-app>
</template>

<script>
import ArticleUsage from './components/ArticleUsage.vue'
// import Services from './components/Services.vue'
const axios = require('axios').default

export default {
  name: 'App',

  components: {
    ArticleUsage
    // Services
  },

  data: () => ({
    services: null,
    articles: null
  }),
  mounted () {
    this.getServices()
    this.getArticles()
  },
  methods: {
    getServices: async function () {
      await axios.get('/api/medical-service?active=true')
        .then(response => { this.services = response.data })
        .catch(error => { console.log(error) })
    },
    getArticles: async function () {
      await axios.get('/api/article')
        .then(response => { this.articles = response.data })
        .catch(error => { console.log(error) })
    }
  }
}
</script>
