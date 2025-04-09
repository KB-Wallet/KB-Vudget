import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      // 지연로딩 적용!
      component: () => import('@/pages/Home.vue'),
    },
    {
      path: '/mypage',
      component: () => import('@/components/MyPage.vue'),
    },
    {
      path: '/mypage/edit',
      component: () => import('@/components/EditMyPage.vue'),
    },
  ],
})
export default router
