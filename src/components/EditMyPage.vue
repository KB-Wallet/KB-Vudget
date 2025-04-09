<script setup>
import db from '@/../db.json'
import { onMounted } from 'vue'

onMounted(() => {
  console.log(db)
})
</script>

<template>
  <div class="mypage-container">
    <div class="mypage-Lcontainer">
      <h2>회원정보수정</h2>
      <div class="profile-container">
        <div>
          <img src="@/icons/user.svg" alt="" />
        </div>
        <div>
          <label for=""> <input type="text" /> 이름: </label>
        </div>
      </div>
    </div>
    <div class="mypage-Rcontainer">
      <router-link to="/" class="link">회원정보수정</router-link>
      <router-link to="/" class="link">카테고리관리</router-link>
      <button class="logout-btn">로그아웃</button>
    </div>
  </div>
</template>

<style scoped>
.mypage-container {
  width: 90%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* border: 1px solid darkgoldenrod; */
  height: 60vh;
}

.mypage-Lcontainer {
  display: flex;
  width: 70%;
  border: 1px solid lightgray;
  border-radius: 20px;
}

h2 {
  padding: 30px;
}

.mypage-Rcontainer {
  border: none;
  background-color: #ffbc00;
  display: flex;
  flex-direction: column;
  width: 20%;
  border-radius: 20px;
  position: relative;
}

.profile-container {
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
  gap: 20px;
}

.profile-container > div:first-child {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}

.profile-container > div:last-child {
  padding: 20px;
  display: flex;
  flex: 3;
  flex-direction: column;
  text-align: left;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: bold;
  white-space: nowrap;
  overflow-wrap: break-word;
  margin-left: 300px;
  /* border: 1px solid red; */
}
.profile-container > div > img {
  width: 250px;
}

.link {
  text-decoration: none;
  color: white;
  font-size: 2rem;
  padding: 30px;
  text-align: center;
  border-bottom: 1px solid white;
}
.logout-btn {
  padding: 10px 0;
  position: absolute;
  bottom: 0;
  border: none;
  left: 50%;
  transform: translateX(-50%);
  background-color: transparent;
  color: white;
  font-size: 1.5rem;
}
.logout-btn:hover {
  cursor: pointer;
}
</style>
