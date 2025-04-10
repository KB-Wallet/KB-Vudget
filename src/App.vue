<script setup>
import AppHeader from './components/HeaderFooter/AppHeader.vue'
import AppFooter from './components/HeaderFooter/AppFooter.vue'
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
