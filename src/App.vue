<script setup>
<<<<<<< HEAD
import MainPage from './pages/LJJ/MainPage.vue'
</script>

<template>
  <section>
    <MainPage />
  </section>
=======
import AppFooter from './components/Footer.vue'
import AppHeader from './components/Header.vue'
</script>

<template>
  <div id="app">
    <AppHeader></AppHeader>
    <router-view />
    <AppFooter></AppFooter>
  </div>
>>>>>>> 33609ede3ae53b7bc43ccdbfc6787a3e121bfccc
</template>

<style scoped>
#app {
  padding: 30px 50px;
}
</style>
