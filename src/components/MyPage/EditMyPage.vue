<script setup>
import { reactive, onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import defaultProfile from '@/icons/user.svg'
const profileImage = ref(null)
const router = useRouter()
const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  budget: '',
})
onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:5001/users/1')
    const user = response.data
    form.name = user.username
    form.email = user.email
    form.password = ''
    form.confirmPassword = ''
    form.budget = user.targetBudget || '1000000'
    profileImage.value = user.profileImg || defaultProfile
  } catch (error) {
    console.error('유저 정보 불러오기 실패:', error)
  }
})
const passwordMatchMessage = computed(() => {
  return form.password === form.confirmPassword
    ? '비밀번호가 일치합니다.'
    : '비밀번호가 일치하지 않습니다.'
})
const formattedBudget = computed(() => {
  const raw = form.budget.toString().replace(/[^0-9]/g, '')
  if (!raw) return ''
  return parseInt(raw).toLocaleString()
})
const onFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      profileImage.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}
const onBudgetInput = (e) => {
  const raw = e.target.value.replace(/[^0-9]/g, '')
  form.budget = raw
}
async function editBtn() {
  try {
    await axios.patch('http://localhost:5000/users/1', {
      username: form.name,
      email: form.email,
      password: form.password, // 비밀번호 저장도 가능 (실제로는 해싱 필요하지만 여긴 테스트니까)
      targetBudget: parseInt(form.budget),
      profileImg: profileImage.value || defaultProfile, // 프로필 이미지도 반영할 수 있음
    })
    alert('수정 완료되었습니다.')
    router.push('/mypage')
  } catch (error) {
    console.error('수정 실패:', error)
    alert('수정 실패! 다시 시도해주세요.')
  }
}
</script>
<template>
  <div class="mypage-container">
    <div class="mypage-Lcontainer">
      <div class="profile-container">
        <h2>회원정보수정</h2>
        <div class="user-img">
          <div class="user-img-inner">
            <img :src="profileImage || defaultProfile" alt="Profile Image" />
            <label class="profile-btn">
              프로필 사진 변경
              <input type="file" accept="image/*" @change="onFileChange" hidden />
            </label>
          </div>
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
          <div class="input-pair password-section">
            <span class="label">비밀번호 확인:</span>
            <div class="value-column">
              <input class="value" type="password" v-model="form.confirmPassword" />
              <p
                class="password-msg"
                :style="{
                  color: form.password === form.confirmPassword ? 'green' : 'red',
                  visibility: form.password || form.confirmPassword ? 'visible' : 'hidden',
                }"
              >
                {{ passwordMatchMessage }}
              </p>
            </div>
          </div>
          <div class="input-pair">
            <span class="label">목표예산:</span>
            <div class="value budget-flex">
              <input
                class="budget-inner-input"
                type="text"
                v-model="formattedBudget"
                @input="onBudgetInput"
              />
              <span class="won-label">원</span>
            </div>
          </div>
          <button class="submit-btn" @click="editBtn">수정 완료</button>
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
  justify-items: center;
  align-items: center;
}
.user-img-inner {
  display: flex;
  flex-direction: column;
  gap: 10px;
  transform: translate(400px, -80px);
}
.user-img-inner img {
  width: 400px;
  height: 400px;
  object-fit: cover;
  border-radius: 80%;
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
  width: 140px;
  text-align: right;
  margin-right: 20px;
  /* padding: 10px; */
  white-space: nowrap;
}
.value {
  display: inline-block;
  margin-left: 0;
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
  justify-content: center;
  gap: 10px;
}
.profile-btn {
  padding: 0.4rem 0;
  font-size: 1rem;
  border: 1px solid #aaa;
  border-radius: 0.5rem;
  cursor: pointer;
  background-color: #fff;
  text-align: center;
  width: 150px;
  margin: 0 auto;
}
.password-msg {
  font-size: 0.8rem;
  color: black;
  margin: 0;
  padding: 0;
  text-align: center;
  word-break: keep-all;
  white-space: normal;
  min-height: 1.2em;
  visibility: hidden; /* 기본은 안 보이게 */
}
.value-column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.budget-flex {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 300px; /* 다른 .value 와 동일한 너비로 */
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 5px 10px;
}
.budget-inner-input {
  border: none;
  outline: none;
  font-size: 1.4rem;
  width: 100%;
  background: transparent;
  text-align: right;
}
.won-label {
  font-size: 1.4rem;
  font-weight: normal;
  white-space: nowrap;
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
/* @media (max-width: 1280px) {
  .profile-container {
    flex-direction: column;
    align-items: center;
  }
  .profile-container > div:first-child,
  .profile-container > div.form-section {
    width: 100%;
    align-items: center;
  }
  .profile-container > div.form-section {
    padding-left: 0;
    text-align: center;
    align-items: center;
  }
  .user-img-inner {
    transform: none;
    align-items: center;
    justify-content: center;
  }
  .user-img-inner img {
    width: 250px;
    height: 250px;
  }
  .input-pair {
    flex-direction: column;
    gap: 5px;
  }
  .label {
    text-align: center;
    width: auto;
    margin: 0;
    padding: 0;
  }
  .value {
    width: 80%;
  }
  .password-msg,
  .formatted-budget {
    margin-left: 0;
    text-align: center;
  }
  .submit-btn {
    align-self: center;
  }
} */
</style>
