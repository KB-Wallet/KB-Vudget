<script setup>
import { reactive, onMounted, ref, computed } from 'vue'
import db from '@/../db.json'
import defaultProfile from '@/icons/user.svg'

const profileImage = ref(null)
const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  budget: '',
})

onMounted(() => {
  const user = db.users[0]
  if (user) {
    form.name = user.username
    form.email = user.email
    form.password = ''
    form.confirmPassword = ''
    form.budget = user.targetBudget || '1000000'
  }
})

const passwordMatchMessage = computed(() => {
  if (!form.password && !form.confirmPassword) return ''
  return form.password === form.confirmPassword
    ? '비밀번호가 일치합니다.'
    : '비밀번호가 일치하지 않습니다.'
})

const formattedBudget = computed(() => {
  const raw = form.budget.toString().replace(/[^0-9]/g, '')
  if (!raw) return ''
  return parseInt(raw).toLocaleString()
})
</script>

<template>
  <div class="mypage-container">
    <div class="mypage-Lcontainer">
      <div class="profile-container">
        <h2>회원정보수정</h2>
        <div class="user-img">
          <img :src="profileImage || defaultProfile" alt="Profile Image" />
          <label class="profile-btn">
            프로필 사진 변경
            <input type="file" accept="image/*" @change="onFileChange" hidden />
          </label>
        </div>
        <div class="form-section">
          <div class="input-pair">
            <span class="label">이름:</span>
            <input class="value" type="text" v-model="form.name" />
          </div>
          <div class="input-pair">
            <span class="label">이메일:</span>
            <input class="value" type="text" v-model="form.email" />
          </div>
          <div class="input-pair">
            <span class="label">새 비밀번호:</span>
            <input class="value" type="password" v-model="form.password" />
          </div>
          <div class="input-pair">
            <span class="label">비밀번호 확인:</span>
            <input class="value" type="password" v-model="form.confirmPassword" />
          </div>
          <p
            v-if="passwordMatchMessage"
            class="password-msg"
            :style="{ color: form.password === form.confirmPassword ? 'green' : 'red' }"
          >
            {{ passwordMatchMessage }}
          </p>

          <div class="input-pair">
            <span class="label">목표예산:</span>
            <input class="value" type="text" v-model="form.budget" />원
          </div>
          <p class="formatted-budget">-> {{ formattedBudget }}원</p>
          <button class="submit-btn">수정 완료</button>
        </div>
      </div>
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
  width: 100%;
  border: 1px solid lightgray;
  border-radius: 20px;
  overflow: hidden;
  flex-wrap: wrap;
}

h2 {
  padding: 30px;
  width: 100%;
}

.user-img {
  display: flex;
  flex-direction: column;
  justify-items: center;
}

.profile-container {
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
  gap: 40px;
  width: 100%;
}

.profile-container > div:first-child {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.profile-container > div:last-child.form-section {
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

.label {
  display: inline-block;
  width: 100px;
  text-align: right;
  margin-right: 60px;
}

.value {
  display: inline-block;
  margin-left: 100px;
  padding: 5px 10px;
  font-size: 1.4rem;
  font-weight: normal;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #f9f9f9;
  width: 300px;
}

.input-pair {
  display: flex;
  align-items: center;
}

.profile-btn {
  padding: 0.4rem 0.8rem;
  font-size: 1rem;
  border: 1px solid #aaa;
  border-radius: 0.5rem;
  cursor: pointer;
  background-color: #fff;
}

.password-msg {
  font-size: 0.9rem;
  margin: -10px 0 10px 270px;
}

.formatted-budget {
  font-size: 0.9rem;
  color: black;
  margin-left: 270px;
  margin-top: -10px;
  margin-bottom: 10px;
}

.submit-btn {
  margin-top: 2rem;
  align-self: flex-end;
  background-color: #ffbc00;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 1rem;
  cursor: pointer;
}

@media (max-width: 768px) {
  .profile-container > div:last-child {
    margin-left: 0;
  }
}
</style>
