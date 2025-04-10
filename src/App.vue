<script setup>
import AppFooter from './components/Footer.vue'
import AppHeader from './components/Header.vue'
</script>

<template>
  <div id="app">
    <AppHeader></AppHeader>
    <router-view />
    <AppFooter></AppFooter>
  </div>
</template>

<style scoped>
#app {
  padding: 30px 50px;
}
</style>
