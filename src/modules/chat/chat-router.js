import store from '@/state/store'

export default [
    {
        path: '/chat',
        name: 'chat',
        meta: { authRequired: true },
        component: () => import('@/router/views/chat/index'),
        async beforeEnter(from, to, next) {
          await store.dispatch("messenger/onLoad")
          await next()
        }
      },

]