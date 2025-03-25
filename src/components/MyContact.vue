<template>
  <div class="contact-wrapper">
    <h2 class="title">ช่องทางการติดต่อ</h2>

    <div class="contact-card">
      <div class="icon-box"><i class="fas fa-envelope"></i></div>
      <div class="info">
        <div class="label">Email</div>
        <div class="value">phanuphongsrisuyong@gmail.com</div>
      </div>
    </div>

    <div class="contact-card">
      <div class="icon-box"><i class="fas fa-phone-alt"></i></div>
      <div class="info">
        <div class="label">โทรศัพท์</div>
        <div class="value">000-000-0000</div>
      </div>
    </div>

    <div class="contact-card">
      <div class="icon-box"><i class="fab fa-facebook"></i></div>
      <div class="info">
        <div class="label">Facebook</div>
        <div class="value">
          <a href="https://www.facebook.com/panupong.srisuyong" target="_blank">Panupong Srisuyong</a>
        </div>
      </div>
    </div>

    <div class="contact-card">
      <div class="icon-box"><i class="fab fa-github"></i></div>
      <div class="info">
        <div class="label">GitHub</div>
        <div class="value">
          <a href="https://github.com/OreoPN" target="_blank">OreoPN</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyContact",
};
</script>

<style scoped>
.contact-wrapper {
  background-color: #000;
  min-height: 100vh;
  color: white;
  font-family: 'Prompt', sans-serif;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;
}

.contact-card {
  background: #2a2a2a;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease-in-out;
}

.contact-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255, 255, 255, 0.08);
}

.icon-box {
  font-size: 1.8rem;
  margin-right: 20px;
  color: #4caf50;
  min-width: 40px;
  text-align: center;
}

.info {
  flex: 1;
}

.label {
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 5px;
}

.value {
  font-size: 0.95rem;
  color: #ccc;
  word-break: break-word;
}

a {
  color: #7cdba0;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 600px) {
  .contact-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .icon-box {
    margin-bottom: 10px;
  }

  .value {
    font-size: 1rem;
  }
}
</style>
