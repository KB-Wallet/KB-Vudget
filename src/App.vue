<script setup>
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const route = useRoute()

// 숨길 경로들을 배열로 관리
const hideLayoutRoutes = ['/', '/Register', '/Findpw', '/SPTI']
</script>

<template>
  <div :id="'app'" :class="{ noPadding: hideLayoutRoutes.includes(route.path) }">
    <Header v-if="!hideLayoutRoutes.includes(route.path)" />

    <router-view />

    <Footer v-if="!hideLayoutRoutes.includes(route.path)" />
  </div>
</template>

<style scoped>
#app {
  padding: 30px 50px;
}

/* padding 제거용 클래스 */
.noPadding {
  padding: 0 !important;
}
</style>
