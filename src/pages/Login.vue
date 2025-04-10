<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import axios from 'axios'
import '@/assets/login.css'
import Logo from '@/icons/welcome.svg'
import webintro from '@/icons/webintroduce.png'
import webintro2 from '@/icons/webintroduce2.png'

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
  const res = await axios.get('http://localhost:5001/users')
  users.value = res.data
})

const logIn = () => {
  const foundUser = users.value.find(
    (user) => user.email === email.value && user.password === password.value,
  )

  if (foundUser) {
    alert('로그인 성공!')
    userStore.login(foundUser)
    router.push('/main')
  } else {
    alert('이메일 또는 비밀번호가 올바르지 않습니다.')
  }
}
</script>
<template>
  <div class="container">
    <div class="left-half">
      <div class="logo_container">
        <img :src="Logo" alt="logo" class="logo" />
        <img :src="webintro" alt="webintro" class="webintro" />
        <img :src="webintro2" alt="webintro2" class="webintro2" />
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
