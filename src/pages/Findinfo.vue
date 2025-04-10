<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'
const route = useRoute()
const router = useRouter()

const goToRegister = () => {
  router.push('/Register') // 원하는 경로로 이동
}
onMounted(() => {
  console.log(route)
})
</script>
<template>
  <div class="container">
    <div class="left-half">
      <div class="logo_container">
        <img src="@/icons/Welcome Vudget.svg" alt="logo" class="logo" />
      </div>
    </div>

    <div class="right-half">
      <div class="signin">
        <!-- <p class="signin-text">
          Have an account?
          <span class="link" @click="goToRegister">sign in</span>
        </p> -->
        <h1 class="head_introduce">Welcome to Vudget</h1>
        <div class="introduce">
          <p>
            로그인하려고 했는데 아이디가 기억 안 나시나요?
            <br />
            비밀번호는 맞는 것 같은데 자꾸 틀렸다고요?
            <br />
            당황하지 마세요. 누구나 한 번쯤은 겪는 일이니까요.
            <br />
            (난 아님)
            <br />
            Vudget은 여러분의 기억을 살려드립니다.
            <br />
            지금 바로 아이디와 비밀번호를 되찾아보세요.
          </p>
        </div>
        <div class="loginForm">
          <p><input class="Email-input" name="uemail" placeholder="Email address" /><br /></p>
          <p>
            <input
              name="uid"
              class="ID-input"
              placeholder="Please enter the last username you remember."
              type="ID"
            />
          </p>
          <p>
            <button type="submit" class="find_button">Find my account</button>
          </p>
        </div>
        <!-- <p class="find_info">
          Lost your ID or PW?
          <span class="link" @click="">Click it</span>
        </p> -->
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
.signin {
  text-align: center;
  margin-top: 60px;
}
.signin-text {
  font-size: 16px;
}
.link {
  color: #ffbc00;
  margin-left: 8px;
  cursor: pointer; /* ← 이게 핵심! */
  text-decoration: underline; /* 선택 사항: 더 클릭 가능하게 보이도록 */
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

.ID-input,
.Email-input {
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
.Email-input {
  margin: 20px;
}
.find_button {
  width: 70%;
  height: 60px;
  background-color: #ffbc00;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 20px;
  margin: 40px 0 5px 0;
}
</style>
