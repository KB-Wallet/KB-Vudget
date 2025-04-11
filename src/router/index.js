import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/pages/Login.vue'),
    },
    {
      path: '/Register',
      name: 'register',
      component: () => import('@/pages/Register.vue'),
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
      name: 'calendarmain',
      component: () => import('@/pages/CalendarMain.vue'),
    },

    {
      path: '/WritePage',
      name: writepage,
      component: () => import('@/pages/WritePage.vue'),
    },
    {
      path: '/MyPage',
      name: 'mypage',
      component: () => import('@/pages/MyPage.vue'),
    },
    {
      path: '/EditMyPage',
      name: 'editmypage',
      component: () => import('@/components/MyPage/EditMyPage.vue'),
    },
    {
      path: '/history',
      component: () => import('@/pages/HistoryPage.vue'),
    },
    {
      path: '/Findpw',
      name: 'findpw',
      component: () => import('@/pages/Findpw.vue'),
    },
  ],
})
export default router
