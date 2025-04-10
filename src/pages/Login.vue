<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import axios from 'axios'

const userStore = useUserStore()
const router = useRouter()
const email = ref('')
const password = ref('')
const users = ref([])

const goToRegister = () => {
  router.push('/Register')
}

const goToFindinfo = () => {
  router.push('/Findinfo')
}

onMounted(async () => {
  const res = await axios.get('http://localhost:5000/users')
  users.value = res.data
})

const logIn = () => {
  const foundUser = users.value.find(
    (user) => user.email === email.value && user.password === password.value,
  )

  if (foundUser) {
    alert('로그인 성공!')
    userStore.login(foundUser)
    router.push('/mainpage')
  } else {
    alert('이메일 또는 비밀번호가 올바르지 않습니다.')
  }
}
</script>
<template>
  <div class="container">
    <div class="left-half">
      <div class="logo_container">
        <img src="@/icons/Welcome Vudget.svg" alt="logo" class="logo" />
        <!-- 웹사이트 소개 사진 넣기 -->
      </div>
    </div>
    <div class="right-half">
      <div class="signup">
        <p class="signup-text">
          Have an account?
          <span class="link" @click="goToRegister">sign up</span>
        </p>
        <h1 class="head_introduce">Welcome to Vudget</h1>
        <div class="introduce">
          <p>
            언제 썼는지, 어디에 썼는지 기억 안 나시나요?
            <br />
            이제는 돈의 흐름을 한눈에 확인하세요.
            <br />
            지출을 정리하고, 소비를 통제하며,
            <br />
            더 나은 내일을 위한 첫걸음.
            <br />
            지금 바로 Vudget 가계부를 시작해보세요.
          </p>
        </div>
        <div class="loginForm">
          <p>
            <input
              class="userEmail"
              name="uemail"
              placeholder="Email address"
              v-model="email"
            /><br />
          </p>
          <p>
            <input
              class="userPw"
              name="upw"
              placeholder="Password"
              type="password"
              v-model="password"
            />
          </p>
          <p>
            <button type="submit" class="btnLogin" @click.prevent="logIn">Log in</button>
          </p>
        </div>
        <p class="find_info">
          Lost your ID or PW?
          <span class="link" @click="goToFindinfo">Click it</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.left-half {
  flex: 1;
  background-color: #8a8d8f;
  position: relative;
}

.right-half {
  flex: 1;
  background-color: #ffffff;
}
.logo_container {
  position: absolute;
  height: 100%;
  bottom: 35%;
  display: flex;
  justify-content: flex-end;
  padding-left: 30%;
}
.logo {
  width: 300px;
  height: auto;
}
.signup {
  text-align: center;
  margin-top: 60px;
}
.signup-text {
  font-size: 16px;
}
.link {
  color: #ffbc00;
  margin-left: 8px;
  cursor: pointer;
  text-decoration: underline;
}
.head_introduce {
  padding-top: 15px;
  font-size: 50px;
}
.introduce {
  text-align: left;
  padding-left: 150px;
  padding-top: 10px;
  font-size: 20px;
}
.loginForm {
  margin: 20px auto;
  padding: 30px;
}

.userEmail,
.userPw {
  width: 70%;
  height: 60px;
  padding-top: 10px;
  margin-bottom: 15px;
  background-color: #f0f0f0;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  font-size: 17px;
  box-sizing: border-box;
  transition: border-color 0.2s;
  text-align: left;
  padding-left: 40px;
}
.userPw {
  margin: 20px;
}
.btnLogin {
  width: 70%;
  height: 60px;
  background-color: #ffbc00;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 20px;
  margin: 40px 0 5px 0;
}
.find_info {
  font-size: 16px;
}
</style>
