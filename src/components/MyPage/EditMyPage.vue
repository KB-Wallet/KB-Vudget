<script setup>
import { ref } from 'vue'
const profileImage = ref(null)
// const name = ref('이승리')
// const email = ref('test123@abc.com')
// const phone = ref('010-1234-5678')
// const password = ref('')
// const confirmPassword = ref('')
// const budget = ref('1,000,000원')
function onFileChange(e) {
  const file = e.target.files[0]
  if (file) {
    profileImage.value = URL.createObjectURL(file)
  }
}
import db from '@/../db.json'
import { reactive, onMounted } from 'vue'

// form 객체로 관리 (reactive 사용!)
const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  budget: '',
})

onMounted(() => {
  // 예시로 첫 번째 사용자 데이터를 form에 바인딩
  const user = db.users[0]
  if (user) {
    form.name = user.username
    form.email = user.email
    form.password = user.password
    form.budget = user.targetBudget || '1,000,000원' // targetBudget에서 가져오기
  }
})
</script>
<template>
  <div class="page">
    <header class="header">
      <h1 class="logo">Vudget</h1>
      <div class="profile-icon">
        <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User Icon" />
      </div>
    </header>
    <main class="main">
      <div class="left-section">
        <h2>회원정보수정</h2>
        <div class="profile-wrapper">
          <div class="profile-image">
            <img
              :src="profileImage || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'"
              alt="Profile Image"
            />
          </div>
          <label class="profile-btn">
            프로필 사진 변경
            <input type="file" accept="image/*" @change="onFileChange" hidden />
          </label>
        </div>
        <div class="info-group">
          <label>이름:</label>
          <input type="text" v-model="form.name" />
          <label>이메일:</label>
          <input type="text" v-model="form.email" />
          <label>새로운 비밀번호:</label>
          <input type="password" v-model="form.confirmPassword" />
          <label>새로운 비밀번호 확인:</label>
          <input type="password" v-model="form.confirmPassword" />
          <p class="warn">비밀번호가 일치하지 않습니다.</p>
          <label>목표 예산:</label>
          <input type="text" v-model="budget" />
          <button class="submit-btn">수정 완료</button>
        </div>
      </div>
    </main>
    <footer class="footer">
      <span>© 2025 · Wallet</span>
      <span>vudget@email.com</span>
    </footer>
  </div>
</template>
<style scoped>
.page {
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}
.logo {
  font-size: 2rem;
  color: #f4b731;
  font-weight: 800;
}
.profile-icon img {
  width: 24px;
  height: 24px;
}
.main {
  flex: 1;
  display: flex;
  padding: 2rem;
}
.left-section {
  flex: 2;
  padding-right: 2rem;
}
.profile-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.profile-image img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #eee;
}
.profile-btn {
  padding: 0.3rem 0.6rem;
  font-size: 0.8rem;
  border: 1px solid #aaa;
  border-radius: 0.5rem;
  cursor: pointer;
  background-color: #fff;
}
.info-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
label {
  font-weight: bold;
}
input {
  background-color: #ddd;
  border: none;
  padding: 0.5rem;
}
.warn {
  font-size: 0.8rem;
  color: gray;
}
.submit-btn {
  background-color: #f4b731;
  border: none;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  border-radius: 1rem;
  cursor: pointer;
}
.footer {
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  font-size: 0.9rem;
  color: #555;
}
</style>
