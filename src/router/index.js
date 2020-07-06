import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login/Login.vue')
  },
  {
    path: '/',
    component: () => import(/* webpackChunkName: "about" */ '../views/layout/index.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "about" */ '../views/home/index.vue')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import(/* webpackChunkName: "about" */ '../views/qa/index.vue')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import(/* webpackChunkName: "about" */ '../views/video/index.vue')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import(/* webpackChunkName: "about" */ '../views/my/index.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
