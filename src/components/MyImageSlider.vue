<template>
  <div class="image-slider">
    <carousel :items-to-show="1" :autoplay="3000" wrap-around>
      <slide v-for="(image, index) in images" :key="index">
        <img :src="image" alt="Profile" class="slider-image" />
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import phai1 from "@/assets/phai1.jpg";
import phai2 from "@/assets/phai2.jpg";
import phai3 from "@/assets/phai3.jpg";

export default {
  components: { Carousel, Slide },
  data() {
    return {
      images: [phai1, phai2, phai3],
    };
  },
};
</script>

<style scoped>
.image-slider {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
}

/* ✅ แก้ปัญหาพื้นหลังสีเขียวจาก carousel */
.carousel,
.carousel__viewport,
.carousel__track,
.carousel__slide {
  background-color: transparent !important;
}

/* ✅ ปรับรูปให้เต็ม container แบบไม่เพี้ยน */
.slider-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}
</style>
