import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index'
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      // 跳转到index
      path: '/', component: Index, children: [
        // 默认跳转到goods
        { path: '/', component: () => import('../views/Goods.vue') },
        // 跳转到goods
        { path: '/goods', component: () => import('../views/Goods.vue') },
        // 跳转到shop
        { path: '/Shop', component: () => import('../views/Shop.vue') },
        // 跳转到evaluat
        { path: '/Evaluat', component: () => import('../views/Evaluat.vue') },
      ]
    },
  ]
})
