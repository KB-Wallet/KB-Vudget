<script setup>
import ReportSlide from './ReportSlide.vue'
// import HistoryList from '../HistoryPage/HistoryList.vue'
import HistorySlide from './HistorySlide.vue'
import CalendarCard from '../CalendarCard.vue'
</script>
<template>
  <div class="slider-container">
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
      <!-- 인디케이터 버튼들 -->
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <!-- 슬라이드 이미지들 -->
      <div class="carousel-inner">
        <div class="carousel-item"><ReportSlide></ReportSlide></div>
        <div class="carousel-item active"><HistorySlide></HistorySlide></div>
        <div class="carousel-item"><CalendarCard></CalendarCard></div>
        <!-- <div class="carousel-item"><CalendarCard></CalendarCard></div> -->
        <!-- <div class="carousel-item"><CalendarCard></CalendarCard></div> -->
      </div>
      <!-- 이전 / 다음 버튼 -->
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>
<style scoped>
.slider-container {
  height: 350px;
  position: relative; /* 기준점 */
  margin: 0 auto;
  margin-bottom: 30px;
  border: 1px solid lightgray;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* 슬라이더 자체가 container에 꽉 차게 */
.carousel {
  width: 100%;
  height: 100%;
}
/* 슬라이드 내용 영역도 꽉 차게 */
.carousel-inner,
.carousel-item {
  height: 100%;
}
/* 인디케이터 - 정확히 하단 가운데 */
.carousel-indicators {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  margin: 0;
}
/* 인디케이터 스타일 */
.carousel-indicators [data-bs-target] {
  background-color: #333;
  width: 12px;
  height: 4px;
  border-radius: 4px;
  opacity: 1;
  margin: 0 4px;
}
.carousel-indicators .active {
  background-color: #000;
}
/* 좌우 버튼 */
.carousel-control-prev,
.carousel-control-next {
  z-index: 5;
  width: 1%;
}
.carousel-control-prev-icon,
.carousel-control-next-icon {
  background-size: 100% 100%;
  display: none !important;
}
</style>
