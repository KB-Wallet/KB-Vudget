<script setup>
import MyPage from './components/MyPage.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Header />
  <div class="myPage">
    <MyPage />
  </div>
  <Footer />
</template>

<style scoped>
.myPage {
  margin-top: 50px;
}
</style>
