import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
<<<<<<< HEAD
      name: 'Login',
=======
      // 지연로딩 적용!
      name: 'login',
>>>>>>> 7ad70204a6de4caaf85d4cd31fa33c8b31226278
      component: () => import('@/pages/Login.vue'),
    },
    {
      path: '/Register',
      name: 'register',
      component: () => import('@/pages/Register.vue'),
    },
<<<<<<< HEAD
    {
      path: '/Findinfo',
      name: 'findinfo',
      component: () => import('@/pages/Findpw.vue'),
    },
    {
      path: '/SPTI',
      name: 'spti',
      component: () => import('@/pages/Spti.vue'),
    },
    // 동적 라우트 파라미터 처리

    // {
    //   path: '/main',
    //   name: 'mainpage',
    //   component: () => import('@/pages/MainPage.vue'),
    // },
    // {
    //   path: '/history',
    //   name: 'historypage',
    //   component: () => import('@/pages/HistoryPage.vue'),
    // },
    // {
    //   path: '/CalendarMain',
    //   name: calendarmain,
    //   component: () => import('@/pages/CalendarMain.vue'),
    // },
    // {
    //   path: '/WritePage',
    //   name: writepage,
    //   component: () => import('@/pages/WritePage.vue'),
    // },
    // {
    //   path: '/MyPage',
    //   name: mypage,
    //   component: () => import('@/pages/MyPage.vue'),
    // },
    // {
    //   path: '/EditMyPage',
    //   name: editmaypage,
    //   component: () => import('@/pages/EditMyPage.vue'),
    // },
    // {
    //   path: '/EditMyPage',
    //   name: editmaypage,
    //   component: () => import('@/pages/EditMyPage.vue'),
    // },
=======

    // 동적 라우트 파라미터 처리
    // {
    //   path: '/SPTI',
    //   name: 'spti',
    //   component: () => import('@/pages/Spti.vue'),
    // },
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
    // {
    //   path: '/CalendarMain',
    //   name: 'calendarmain',
    //   component: () => import('@/pages/CalendarMain.vue'),
    // },

    {
      // path: '/WritePage',
      // name: writepage,
      // component: () => import('@/pages/WritePage.vue'),
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
      path: '/Findinfo',
      name: 'findinfo',
      component: () => import('@/pages/Findinfo.vue'),
    },
>>>>>>> 7ad70204a6de4caaf85d4cd31fa33c8b31226278
  ],
})
export default router
