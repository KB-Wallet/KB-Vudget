<script setup></script>
<template>
  <div class="container">
    <div class="left-half">
      <div class="logo_container">
        <img src="@/icons/Welcome Vudget.svg" alt="logo" class="logo" />
      </div>
    </div>

    <div class="right-half">
      <div class="signin">
        <p class="signin-text">
          Have an account?
          <span class="link" @click="">sign in</span>
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
            지금 바로 가계부를 시작해보세요.
          </p>
        </div>
        <div class="loginForm">
          <p><input class="ID-input" name="uid" placeholder="Email address" /><br /></p>
          <p>
            <input name="upw" class="PW-input" placeholder="Password" type="password" />
          </p>
          <p>
            <button type="submit" class="login_button">Login</button>
          </p>
        </div>
        <p class="find_info">
          Lost your ID or PW?
          <span class="link" @click="">Click it</span>
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
.PW-input {
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
.PW-input {
  margin: 20px;
}
.login_button {
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
