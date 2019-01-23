import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Articles from '@/components/Articles'
import ArticlePage from '@/components/ArticlePage'
import CreateArticles from '@/components/CreateArticles'
import UpdateArticles from '@/components/UpdateArticles'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'Articles',
      component: Articles
    },
    {
      path: '/article/:id',
      name: 'ArticlePage',
      component: ArticlePage
    },
    {
      path: '/create',
      name: 'CreateArticles',
      component: CreateArticles
    },
    {
      path: '/update/:id',
      name: 'UpdateArticles',
      component: UpdateArticles
    }
  ]
})
