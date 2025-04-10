<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import db from '@/../db.json'
import { ref } from 'vue'
const userId = ref(0)
</script>

<template>
  <div class="header-container">
    <!-- <img src="../../icons/vudget.svg" alt="vudgetLogo" style="width: 250px; height: 105px" /> -->
    <router-link to="/main" style="text-decoration: none; cursor: pointer">
      <h1 class="vudget-logo">Vudget</h1>
    </router-link>
    <div class="header-rcontainer">
      <router-link to=""><img src="../icons/calendar.svg" alt="toCalendar" /></router-link>
      <router-link to="/history"><img src="../icons/history.svg" alt="toHistory" /></router-link>
      <!-- <router-link to=""><img src="../../icons/profile.svg" alt="" /></router-link> -->
      <router-link to=""
        ><img :src="db.users[userId].profileImg" alt="profile image"
      /></router-link>
    </div>
  </div>
</template>

<style scoped>
.header-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.vudget-logo {
  font-family: 'Baloo 2';
  font-weight: 1000;
  font-size: 70px;
  line-height: 104px;
  letter-spacing: 0;
  color: #ffbc00;
  text-shadow:
    -1.5px 0 #ffbc00,
    1.5px 0 #ffbc00,
    0 1.5px #ffbc00,
    0 -1.5px #ffbc00;
}
.header-rcontainer {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.header-rcontainer > * {
  margin-right: 50px;
}
.header-rcontainer > *:last-child {
  margin-right: 15px !important;
}
</style>
