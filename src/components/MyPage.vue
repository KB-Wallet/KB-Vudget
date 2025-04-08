<script setup>
import db from '@/../db.json'
import { onMounted } from 'vue'

onMounted(() => {
  console.log(db)
})
</script>

<template>
  <section class="sec">
    <div class="container">
      <h2>마이페이지</h2>
      <div class="row">
        <!-- 새로 flex를 잡을 박스 -->
        <div class="box">
          <div>
            <img src="@/icons/user.svg" alt="" />
          </div>
          <div>
            <p>이름:{{ db.users[0].username }}</p>
            <p>이메일: {{ db.users[0].email }}</p>
            <p>목표예산: {{ db.users[0].targetBudget.toLocaleString() }}원</p>
          </div>
        </div>

        <div class="container2">
          <router-link to="/" class="link">회원정보수정</router-link>
          <router-link to="/" class="link">카테고리관리</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sec {
  width: 100%;
  display: flex;
  justify-content: center;
}

.container {
  width: 90%;
  /* border: 1px solid black; */
  box-sizing: border-box;
}

.row {
  display: flex;
  width: 100%;
  gap: 16px; /* 박스 사이 여백 */
  height: 60vh;
}

.box {
  display: flex;
  flex: 4;
  /* border: 1px solid red; */
  box-sizing: border-box;
}

.box > div:first-child {
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box > div:last-child {
  flex: 2;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}
.box > div > img {
  width: 250px;
}
.container2 {
  flex: 1;
  border: none;
  background-color: #ffbc00;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  border-radius: 20px;
}

.link {
  text-decoration: none;
  color: white;
  font-size: 1.2rem;
  padding: 1.2rem;
}
</style>
