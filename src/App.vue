<script setup>
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const route = useRoute()

// 숨길 경로들을 배열로 관리
const hideLayoutNames = ['login', 'register', 'findpw', 'spti']
</script>

<template>
  <div :id="'app'" :class="{ noPadding: hideLayoutNames.includes(route.name) }">
    <Header v-if="!hideLayoutNames.includes(route.name)" />

    <router-view />

    <Footer v-if="!hideLayoutNames.includes(route.name)" />
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
