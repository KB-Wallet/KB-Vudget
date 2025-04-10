<script setup>
import { onMounted } from 'vue'
import { ref } from 'vue'
const userEmail = ref('')
const userName = ref('')

onMounted(() => {})

const findPw = async () => {
  try {
    const response = await fetch('http://localhost:5000/users')
    const users = await response.json()

    const matchedUser = users.find(
      (user) => user.email === userEmail.value || user.username === userName.value,
    )

    if (matchedUser) {
      alert('보안에 주의해주세요')
      alert(`당신의 비밀번호는 "${matchedUser.password}" 입니다.`)
    } else {
      alert('해당 이메일 또는 사용자 이름이 잘못되었습니다.')
    }
  } catch (error) {
    console.error('오류 발생:', error)
    alert('서버 오류가 발생했습니다.')
  }
}
</script>
<template>
  <div class="container">
    <div class="left-half">
      <div class="find_container">
        <img src="@/icons/Welcome Vudget.svg" alt="logo" class="logo" />
      </div>
      <!-- 페이지 소개 사진 삽입 -->
    </div>
    <div class="right-half">
      <div class="findpw">
        <h1 class="head_introduce">Find your PW</h1>
        <div class="introduce">
          <p>
            로그인하려고 했는데 아이디가 기억 안 나시나요?
            <br />
            비밀번호는 맞는 것 같은데 자꾸 틀렸다고요?
            <br />
            당황하지 마세요. 누구나 한 번쯤은 겪는 일이니까요.
            <br />
            Vudget은 여러분의 기억을 살려드립니다.
            <br />
            지금 바로 아이디와 비밀번호를 되찾아보세요.
          </p>
        </div>
        <div class="infoForm">
          <p>
            <input
              class="userEmail"
              name="uemail"
              placeholder="Email address"
              v-model="userEmail"
            /><br />
          </p>
          <p>
            <input
              name="uid"
              class="userId"
              placeholder="Please enter the last username you remember."
              type="ID"
              v-model="userId"
            />
          </p>
          <p>
            <button type="submit" class="btnFind" @click="findPw">Find my password</button>
          </p>
        </div>
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
.find_container {
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
.findpw {
  text-align: center;
  margin-top: 60px;
}
.findpw-text {
  font-size: 16px;
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
.infoForm {
  margin: 20px auto;
  padding: 30px;
}

.userId,
.userEmail {
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
.userEmail {
  margin: 20px;
}
.btnFind {
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
