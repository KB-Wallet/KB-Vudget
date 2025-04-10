<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import '@/assets/register.css'
import webintro from '@/icons/webintroduce.png'
import webintro2 from '@/icons/webintroduce2.png'

const router = useRouter()
// 입력값 상태
const userName = ref('')
const userEmail = ref('')
const userPw = ref('')
const userAgree = ref(false)

// 회원가입 함수
const register = async () => {
  if (!userName.value || !userEmail.value || !userPw.value) {
    alert('모든 칸을 입력해주세요.')
    return
  }

  if (!userAgree.value) {
    alert('약관에 동의해야 가입할 수 있습니다.')
    return
  }

  try {
    await axios.post('http://localhost:5001/users', {
      username: userName.value,
      email: userEmail.value,
      password: userPw.value,
    })
    alert('회원가입이 완료되었습니다. 환영합니다')
    router.push('/')
  } catch (error) {
    console.error(error)
    alert('회원가입 중 오류가 발생했습니다.')
  }
}
</script>
<template>
  <div class="container">
    <div class="left-half">
      <div class="logo_container">
        <img src="@/icons/Welcome Vudget.svg" alt="logo" class="logo" />
        <img :src="webintro" alt="webintro" class="webintro" />
        <img :src="webintro2" alt="webintro2" class="webintro2" />
      </div>
      <!-- 웹사이트 소개 사진 등록 -->
    </div>

    <div class="right-half">
      <div class="sign_up">
        <h1 class="head_introduce">Welcome to Vudget</h1>
        <div class="introduce">
          <p>
            "돈이 어디로 사라졌는지 기억 안 나시죠?"
            <br />
            Vudget이 당신의 소비를 기억해드립니다.
            <br />
            지금 가입하고,
            <br />
            지갑 탈출 돈귀신과의 전쟁을 끝내보세요
            <br />
            쉽고, 빠르고, 속 시원하게!
            <br />
            <br />
            회원가입하고 똑똑한 소비의 첫걸음을 지금 시작해보세요.
            <br />
          </p>
        </div>
        <div class="signup_Form"></div>
        <p>
          <input
            class="inputUserName"
            v-model="userName"
            name="uname"
            placeholder="User Name"
          /><br />
        </p>

        <p>
          <input
            class="inputUserEmail"
            v-model="userEmail"
            name="uid"
            placeholder="Email address"
          /><br />
        </p>
        <p>
          <input
            class="inputUserPw"
            v-model="userPw"
            name="upw"
            placeholder="Password"
            type="password"
          />
        </p>
        <p class="policy">
          <input
            type="radio"
            id="agreebtn"
            value="agree"
            v-model="userAgree"
            class="custom-radio"
          />
          <label for="agreebtn" class="custom-radio-label"
            ><img src="@/icons/radiobutton.svg" alt="radiobutton" class="custom-radio-img" /> I
            agree to Vudget terms of services and privacy policy.</label
          >
        </p>
        <p>
          <button type="submit" class="btnSignup" @click.prevent="register">Sign up</button>
        </p>
      </div>
    </div>
  </div>
</template>
