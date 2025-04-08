import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/pages/Home.vue'),
    },
    {
      path: '/main',
      component: () => import('@/pages/MainPage.vue'),
    },
  ],
})
export default router
