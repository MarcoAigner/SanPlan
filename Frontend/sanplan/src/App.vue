<template>
  <v-app>
    <v-main>
      <ArticleUsage
        :articleUsages="articleUsages"
        :articles="articles"
        @article-used="postArticleUsage"
       ></ArticleUsage>
    </v-main>
  </v-app>
</template>

<script>
import ArticleUsage from './components/ArticleUsage.vue'
const axios = require('axios').default

export default {
  name: 'App',

  components: {
    ArticleUsage
  },

  data: () => ({
    messages: null,
    services: null,
    articleUsages: null,
    articles: null
  }),
  mounted () {
    this.getServices()
    this.getArticleUsage()
    this.getArticles()
  },
  methods: {
    postArticleUsage: async function (articleUsage) {
      const now = new Date().toISOString()
      articleUsage.time = now
      await axios.post('/api/article-usage', articleUsage)
        .catch(error => { console.log(error) })
      await this.getArticleUsage()
    },
    getServices: async function () {
      await axios.get('/api/medical-service?active=true')
        .then(response => { this.services = response.data })
        .catch(error => { console.log(error) })
    },
    getArticleUsage: async function () {
      await axios.get('/api/article-usage/516696a4-dd99-11eb-8a3c-0c9d92c91130')
        .then(response => { this.articleUsages = response.data })
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
