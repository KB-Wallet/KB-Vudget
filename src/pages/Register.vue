<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
// 입력값 상태
const username = ref('')
const email = ref('')
const password = ref('')
const agree = ref(false)

// 회원가입 함수
const register = async () => {
  if (!username.value || !email.value || !password.value) {
    alert('모든 필드를 입력해주세요.')
    return
  }

  if (!agree.value) {
    alert('약관에 동의해야 가입할 수 있습니다.')
    return
  }

  try {
    await axios.post('http://localhost:5000/users', {
      username: username.value,
      email: email.value,
      password: password.value,
    })
    alert('회원가입이 완료되었습니다!')
    router.push('/') // 로그인 페이지로 이동
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
      </div>
    </div>

    <div class="right-half">
      <div class="sign_up">
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
            지금 바로 가계부를 시작해보세요.
          </p>
        </div>
        <div class="signup_Form"></div>
        <p>
          <input
            class="Username-input"
            v-model="username"
            name="uname"
            placeholder="User Name"
          /><br />
        </p>

        <p>
          <input class="ID-input" v-model="email" name="uid" placeholder="Email address" /><br />
        </p>
        <p>
          <input
            class="PW-input"
            v-model="password"
            name="upw"
            placeholder="Password"
            type="password"
          />
        </p>
        <p class="policy">
          <input type="radio" id="agreebtn" value="agree" v-model="agree" class="custom-radio" />
          <label for="agreebtn" class="custom-radio-label"
            ><img src="@/icons/radiobutton.svg" alt="radiobutton" class="custom-radio-img" /> I
            agree to Vudget terms of services and privacy policy.</label
          >
        </p>
        <p>
          <button type="submit" class="signup_button" @click.prevent="register">Sign up</button>
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
  /* overflow: hidden; */
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
.sign_up {
  text-align: center;
  margin-top: 60px;
}

.link {
  color: #ffbc00;
  margin-left: 8px;
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
.signup_Form {
  margin: 20px auto;
  /* padding: 30px; */
}
.Username-input,
.ID-input,
.PW-input {
  width: 65%;
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

.signup_button {
  width: 65%;
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
.policy {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}
.custom-radio {
  display: none;
}
input[type='radio'] {
  display: none;
}
.custom-radio-label {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  font-size: 15px;
  margin-top: 10px;
  cursor: pointer;
}
.custom-radio-img {
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: 0.2s ease;
}

input[type='radio']:checked + label > img {
  transform: scale(1.1);
}

.custom-radio-label {
  position: relative;
}

input[type='radio']:checked + .custom-radio-label::after {
  content: '✔';
  position: absolute;
  left: 10px;
  top: 0;
  font-size: 30px;
  color: #8a8d8f;
  font-weight: bold;
  transform: translate(-50%, -50%);
}
</style>
