import Vue from 'vue'
import VueRouter from 'vue-router'
import Table from '@/views/Table'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/table'
  },
  {
    path: '/table',
    name: 'table',
    component: Table,
  },
  {
    path: '/chart',
    name: 'chart',
    component: () => import(/* webpackChunkName: "chart" */ '../views/Chart.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
