import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import orders from '@/components/orders/orders'
import orderIndex from'@/components/orders/orderCenter/orderCenter-Laundry/index'
import newLaundry  from'@/components/orders/orderCenter/orderCenter-Laundry/new'
import cancelLaundry  from'@/components/orders/orderCenter/orderCenter-Laundry/cancel'
import endLaundry  from'@/components/orders/orderCenter/orderCenter-Laundry/end'
import hangLaundry  from'@/components/orders/orderCenter/orderCenter-Laundry/hang'
import inboundLaundry  from'@/components/orders/orderCenter/orderCenter-Laundry/inbound'
import outLaundry  from'@/components/orders/orderCenter/orderCenter-Laundry/out'
import returnLaundry  from'@/components/orders/orderCenter/orderCenter-Laundry/return'
import sentLaundry  from'@/components/orders/orderCenter/orderCenter-Laundry/sent'
import designerIndex  from'@/components/orders/orderCenter/orderCenter-Designer/index'
import newDesigner  from'@/components/orders/orderCenter/orderCenter-Designer/new'
import cancelDesigner   from'@/components/orders/orderCenter/orderCenter-Designer/cancel'
import endDesigner   from'@/components/orders/orderCenter/orderCenter-Designer/end'
import hangDesigner  from'@/components/orders/orderCenter/orderCenter-Designer/hang'
import inboundDesigner   from'@/components/orders/orderCenter/orderCenter-Designer/inbound'
import outDesigner  from'@/components/orders/orderCenter/orderCenter-Designer/out'
import returnDesigner   from'@/components/orders/orderCenter/orderCenter-Designer/return'
import sentDesigner   from'@/components/orders/orderCenter/orderCenter-Designer/sent'
import furnitureIndex  from'@/components/orders/orderCenter/orderCenter-Furniture/index'
import cancelFurniture  from'@/components/orders/orderCenter/orderCenter-Furniture/cancel'
import endFurniture  from'@/components/orders/orderCenter/orderCenter-Furniture/end'
import newFurniture  from'@/components/orders/orderCenter/orderCenter-Furniture/new'
import sentFurniture  from'@/components/orders/orderCenter/orderCenter-Furniture/sent'

import mallIndex  from'@/components/orders/orderCenter/orderCenter-Mall/index'
import cancelMall from'@/components/orders/orderCenter/orderCenter-Mall/cancel'
import endMall from'@/components/orders/orderCenter/orderCenter-Mall/end'
import newMall  from'@/components/orders/orderCenter/orderCenter-Mall/new'
import sentMall  from'@/components/orders/orderCenter/orderCenter-Mall/sent'



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
        }
      ]
    },
    {
      path: '/designerIndex',
      name: 'designerIndex',
      component: designerIndex,
      children:[
        {
          path: '/newDesigner',
          name: 'newDesigner',
          component: newDesigner,
        },
        {
          path: '/cancelDesigner',
          name: 'cancelDesigner',
          component: cancelDesigner,
        },
        {
          path: '/endDesigner',
          name: 'endDesigner',
          component: endDesigner,
        },
        {
          path: '/hangDesigner',
          name: 'hangDesigner',
          component: hangDesigner,
        },
        {
          path: '/outDesigner',
          name: 'outDesigner',
          component: outDesigner,
        },
        {
          path: '/returnDesigner',
          name: 'returnDesigner',
          component: returnDesigner,
        },
        {
          path: '/sentDesigner',
          name: 'sentDesigner',
          component: sentDesigner,
        },
        {
          path: '/inboundDesigner',
          name: 'inboundDesigner',
          component: inboundDesigner,
        },
      ]
    },
    {
      path:'/orderIndex',
      name:'orderIndex',
      component:orderIndex,
      children:[
        {
          path: '/newLaundry',
          name: 'newLaundry',
          component: newLaundry,
        },
        {
          path: '/cancelLaundry',
          name: 'cancelLaundry',
          component: cancelLaundry,
        },
        {
          path: '/endLaundry',
          name: 'endLaundry',
          component: endLaundry,
        },
        {
          path: '/hangLaundry',
          name: 'hangLaundry',
          component: hangLaundry,
        },
        {
          path: '/outLaundry',
          name: 'outLaundry',
          component: outLaundry,
        },
        {
          path: '/returnLaundry',
          name: 'returnLaundry',
          component: returnLaundry,
        },
        {
          path: '/sentLaundry',
          name: 'sentLaundry',
          component: sentLaundry,
        },
        {
          path: '/inboundLaundry',
          name: 'inboundLaundry',
          component: inboundLaundry,
        },
      ]
    },
    {
      path: '/furnitureIndex',
      name: 'furnitureIndex',
      component: furnitureIndex,
      children:[
        {
          path: '/cancelFurniture',
          name: 'cancelFurniture',
          component: cancelFurniture,
        },
        {
          path: '/endFurniture',
          name: 'endFurniture',
          component: endFurniture,
        },
        {
          path: '/newFurniture',
          name: 'newFurniture',
          component: newFurniture,
        },
        {
          path: '/sentFurniture',
          name: 'sentFurniture',
          component: sentFurniture,
        },
      ]
    },
    {
      path: '/mallIndex',
      name: 'mallIndex',
      component: mallIndex,
      children:[
        {
          path: '/cancelMall',
          name: 'cancelMall',
          component: cancelMall,
        },
        {
          path: '/endMall',
          name: 'endMall',
          component: endMall,
        },
        {
          path: '/newMall',
          name: 'newMall',
          component: newMall,
        },
        {
          path: '/sentMall',
          name: 'sentMall',
          component: sentMall,
        },
      ]
    },
  ]
})
