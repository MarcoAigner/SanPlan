<template>
  <v-app>
    <v-main>
      <!--<Test :messages="messages" @msg-provided="postMessage"></Test>-->
      <ArticleUsage
        :articleUsages="articleUsages"
        :articles="articles"
        @article-used="postArticleUsage"
       ></ArticleUsage>
    </v-main>
  </v-app>
</template>

<script>
// import Test from './components/Test'
import ArticleUsage from './components/ArticleUsage.vue'
const axios = require('axios').default

export default {
  name: 'App',

  components: {
    // Test
    ArticleUsage
  },

  data: () => ({
    messages: null,
    services: null,
    articleUsages: null,
    articles: null
  }),
  mounted () {
    // this.getMessages()
    this.getServices()
    this.getArticleUsage()
    this.getArticles()
  },
  methods: {
    postArticleUsage: async function (articleUsage) {
      await axios.post('/api/article-usage', articleUsage)
        .then(response => { console.log(response) })
        .catch(error => { console.log(error) })
      this.getArticleUsage()
    },
    getServices: async function () {
      await axios.get('/api/medical-service?active=true')
        .then(response => { this.services = response.data })
        .catch(error => { console.log(error) })
    },
    getArticleUsage: async function () {
      await axios.get('/api/article-usage/f892ba64-daa8-11eb-93c1-0c9d92c91130')
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
