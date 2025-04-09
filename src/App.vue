<script setup>
import Header from './components/HeaderFooter/Header.vue'
import Footer from './components/HeaderFooter/Footer.vue'
</script>

<template>
  <div id="app">
    <Header></Header>
    <router-view />
    <Footer></Footer>
  </div>
</template>

<style scoped>
#app {
  padding: 30px 50px;
}
</style>
