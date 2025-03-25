<template>
  <div class="portfolio-container">
    <!-- Layout หลัก -->
    <div class="main-content">
      <!-- 🔹 60% ข้อมูล (พื้นหลังดำ) -->
      <div class="info-section">
        <div class="info-content">
            <h2>👋 สวัสดีครับ ผมชื่อภานุพงษ์ ศรีสุยงค์</h2>
            <p class="desc">
              นักศึกษาวิทยาการคอมพิวเตอร์ ที่สนใจการพัฒนาเว็บไซต์ทั้งฝั่ง Front-end และ Back-end 
              ชอบสร้างโปรเจคจริง ฝึกฝนการเขียนโค้ด และเรียนรู้เทคโนโลยีใหม่ ๆ เช่น Vue.js, Node.js, และ Bootstrap
            </p>

            <ul class="details-list">
              <li>🖥️ <strong>สนใจ:</strong> Web Development, UX/UI, AI</li>
              <li>💡 <strong>ทักษะ:</strong> HTML, CSS, JavaScript, Python</li>
              <li>📍 <strong>ที่อยู่:</strong> พระนครศรีอยุธยา, ร้อยเอ็ด</li>
            </ul>
          </div>
      </div>

      <!-- 🔹 40% รูป (พื้นหลังเทา) -->
      <div class="profile-section">
        <MyImageSlider />
      </div>
    </div>
  </div>
</template>

<script>
import MyImageSlider from "@/components/MyImageSlider.vue";

export default {
  components: { MyImageSlider }
};
</script>

<style scoped>
/* 🔹 Layout หลัก */
.portfolio-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 100vh;
}

.main-content {
  display: flex;
  flex-grow: 1;
  height: 100%;
  align-items: stretch;
}

/* 🔹 60% ข้อมูล (พื้นหลังดำ) */
.info-section {
  background-color: #000000;
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

/* 🔹 40% รูป (พื้นหลังเทา) */
.profile-section {
  background-color: #5e5e5e;
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.info-content {
  max-width: 700px;
  padding: 60px 40px;
  font-family: 'Prompt', sans-serif;
  animation: fadeIn 0.8s ease-in-out;
}

.info-content h2 {
  font-size: 2rem;
  margin-bottom: 25px;
  color: #7cdba0;
  font-weight: bold;
  line-height: 1.5;
}

.desc {
  font-size: 1.1rem;
  margin-bottom: 16px;
  color: #f0f0f0;
  line-height: 1.7;
}

.details-list {
  list-style: none;
  padding-left: 0;
  margin-top: 30px;
}

.details-list li {
  font-size: 1.05rem;
  margin-bottom: 14px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: #ffffff;
}

/* ✅ Animation */
@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* ✅ Responsive บนมือถือ */
@media (max-width: 768px) {
  .info-content {
    padding: 40px 20px;
    text-align: center;
  }

  .info-content h2 {
    font-size: 1.7rem;
  }

  .desc {
    font-size: 1rem;
  }

  .details-list li {
    justify-content: center;
    text-align: left;
    font-size: 1rem;
  }
}
/* ✅ ปรับขนาดรูปให้เต็มช่อง profile-section */
.profile-section ::v-deep(.my-slider-wrapper),
.profile-section ::v-deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ✅ Responsive มือถือ */
@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }

  .info-section,
  .profile-section {
    width: 100%;
  }

  .profile-section {
    height: 300px;
    order: -1; /* ย้ายรูปขึ้นด้านบน */
  }
}

</style>
