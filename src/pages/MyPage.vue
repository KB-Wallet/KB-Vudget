<script setup>
import db from '@/../db.json'
import { onMounted } from 'vue'

onMounted(() => {
  console.log(db)
})

// function logout(()=>{

// })
</script>

<template>
  <div class="mypage-container">
    <div class="mypage-Lcontainer">
      <div class="profile-container">
        <h2>마이페이지</h2>
        <div>
          <img src="@/icons/user.svg" alt="" />
        </div>
        <div>
          <p>
            <span class="label">이름:</span><span class="value">{{ db.users[0].username }}</span>
          </p>
          <p>
            <span class="label">이메일:</span><span class="value">{{ db.users[0].email }}</span>
          </p>
          <p>
            <span class="label">목표예산:</span
            ><span class="value">{{ db.users[0].targetBudget.toLocaleString() }}원</span>
          </p>
          <p><span class="label">투자성향:</span><span class="value">쇼핑왕</span></p>
        </div>
      </div>
    </div>
    <div class="mypage-Rcontainer">
      <router-link to="/editmypage" class="link">회원정보수정</router-link>
      <router-link to="/categoriespage" class="link">카테고리관리</router-link>
      <button class="logout-btn">로그아웃</button>
    </div>
  </div>
</template>

<style scoped>
.mypage-container {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 40px 60px;
}

.mypage-Lcontainer {
  display: flex;
  width: 75%;
  border: 1px solid lightgray;
  border-radius: 20px;
  overflow: hidden;
  flex-wrap: wrap;
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

.label {
  display: inline-block;
  width: 100px; /* 너비 조정 가능 */
  text-align: right;
  margin-right: 60px;
}

.value {
  display: inline-block;
  margin-left: 100px;
}

.profile-container {
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
  gap: 40px;
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
  gap: 20px;
  font-weight: bold;
  overflow-wrap: break-word;
  white-space: normal;
  margin-left: 0;
  padding-left: 20px;
}
.profile-container > div > img {
  width: 250px;
}

.link {
  text-decoration: none;
  color: white;
  font-size: 1.5rem;
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid white;
}
.logout-btn {
  padding: 20px;
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

@media (max-width: 768px) {
  .profile-container > div:last-child {
    margin-left: 0;
  }
}
</style>
