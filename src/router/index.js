import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('@/pages/Login.vue'),
    },
    {
      path: '/Register',
      name: 'register',
      component: () => import('@/pages/Register.vue'),
    },
    // 동적 라우트 파라미터 처리
    {
      path: '/Findinfo',
      name: 'findinfo',
      component: () => import('@/pages/Findinfo.vue'),
    },
    {
      path: '/SPTI',
      name: 'spti',
      component: () => import('@/pages/Spti.vue'),
    },
    {
      path: '/main',
      name: 'mainpage',
      component: () => import('@/pages/MainPage.vue'),
    },
    {
      path: '/history',
      name: 'historypage',
      component: () => import('@/pages/HistoryPage.vue'),
    },
    {
      path: '/CalendarMain',
      name: calendarmain,
      component: () => import('@/pages/CalendarMain.vue'),
    },
    {
      path: '/WritePage',
      name: writepage,
      component: () => import('@/pages/WritePage.vue'),
    },
    {
      path: '/MyPage',
      name: mypage,
      component: () => import('@/pages/MyPage.vue'),
    },
    {
      path: '/EditMyPage',
      name: editmaypage,
      component: () => import('@/pages/EditMyPage.vue'),
    },
    {
      path: '/EditMyPage',
      name: editmaypage,
      component: () => import('@/pages/EditMyPage.vue'),
    },
  ],
})
export default router
