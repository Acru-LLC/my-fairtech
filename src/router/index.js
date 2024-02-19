import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/index9.vue')
  },
  {
    path: '/home-1',
    name: 'Index-1',
    component: () => import('../views/index1.vue')
  },
  {
    path: '/home-2',
    name: 'Index-2',
    component: () => import('../views/index2.vue')
  },
  {
    path: '/home-3',
    name: 'Index-3',
    component: () => import('../views/index3.vue')
  },
  {
    path: '/home-4',
    name: 'Index-4',
    component: () => import('../views/index4.vue')
  },
  {
    path: '/home-5',
    name: 'Index-5',
    component: () => import('../views/index5.vue')
  },
  {
    path: '/home-6',
    name: 'Index-6',
    component: () => import('../views/index6.vue')
  },
  {
    path: '/home-7',
    name: 'Index-7',
    component: () => import('../views/index7.vue')
  },
  {
    path: '/home-8',
    name: 'Index-8',
    component: () => import('../views/index8.vue')
  },
  {
    path: '/home-9',
    name: 'Index-9',
    component: () => import('../views/index9.vue')
  },
  {
    path: "/login",
    name: "Login page",
    component: () => import('../views/login.vue')
  },
  {
    path: "/register",
    name: "Signup page",
    component: () => import('../views/signup.vue')
  },
  {
    path: '/forgot-password',
    name: 'Forgot Password page',
    component: () => import('../views/forgot-password.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
