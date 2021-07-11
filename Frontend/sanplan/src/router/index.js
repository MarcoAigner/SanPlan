import Vue from 'vue'
import Router from 'vue-router'
import Services from '@/components/Services'
import ArticleUsage from '@/components/ArticleUsage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Services',
      component: Services
    },
    {
      path: '/article-usage',
      name: 'ArticleUsage',
      component: ArticleUsage
    }
  ]
})
