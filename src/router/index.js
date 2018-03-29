import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import orders from '@/components/orders'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children:[
        {
          path: '/orders',
          name: 'orders',
          component: orders,
        },
      ]
    },

  ]
})
