<script setup></script>

<template>
  <body>
    <div class="revenue-cost-box">
      <span class="set-revenue"
        ><div>수입</div>
        <p class="small-write">Choose Income</p></span
      >
      <span class="set-cost"
        ><div>지출</div>
        <p class="small-write">Choose Expenditure</p></span
      >
    </div>

    <div class="input-all">
      <div>
        <span class="category spend-place input-box">카테고리 ▼</span>
        <!-- 카테고리 클릭시 이벤트 추가 예정 -->
        <input type="text" placeholder=" 금액" class="amount spend-place input-box" />
      </div>
      <div class="container-input">
        <div><input type="text" placeholder=" 지출장소" class="spend-place input-box-below" /></div>
        <div>
          <input type="text" placeholder=" 한 줄 메모" class="small-memo input-box-below" />
        </div>
        <div><input type="text" placeholder=" 날짜" class="date input-box-below" /></div>
        <div class="">사진박스</div>
        <button class="btn-confirm">continue</button>
      </div>
    </div>
  </body>
</template>

<style scoped>
body {
  /* position: absolute; */
  /* left: 300px; */
}
.revenue-cost-box {
  position: relative;
  top: -30px;
}
.set-revenue,
.set-cost {
  padding: 1rem;
  /* margin: rem; */
  width: 150px;
  height: 80px;
  left: 50px;
  position: absolute;
  bottom: 100px;
  border-radius: 10px;
  border: 1px solid #8a8d8f;
  font-size: 2rem;
}
.set-revenue {
  left: 150px;
  /* bottom: 1px; */
}
.set-revenue:active {
  border: #2b46f9 solid 1px;
  background-color: #eaedff;
  /* color: #2b46f9 solid 1px; */
}
.set-cost {
  left: 400px;
}
.set-cost:active {
  border: #ff4e4e solid 1px;

  background-color: #ffd9d9;
}
.small-write {
  color: #8a8d8f;
  font-size: 1rem;
}
.category {
  border: 1px solid #8a8d8f;
  padding: 1rem;
  left: 10px;
  width: 100px;
}
.amount,
.category {
  padding: 1.2rem;
  top: -30px;
  position: absolute;
}
.amount {
  left: 160px;
  padding: 1.3rem;
  width: 240px;
}
.input-box {
  border: 1px solid #8a8d8f;
  border-radius: 4px;
  background-color: #8a8d8f29;
}
.input-box-below {
  padding: 1rem;
  margin: 1rem;
  width: 390px;
}
.container-input {
  top: 30px;
  position: absolute;
  margin: 10px;
  left: -15px;
}
.btn-confirm {
  background-color: #ffbc00;
  border: none;
  border-radius: 2rem;
  width: 460px;
  height: 50px;
  color: white;
}
.btn-confirm:active {
  border: #8a8d8f 1px solid;
}
.input-all {
  bottom: 70px;
  position: inherit;
  left: 140px;
}
</style>
