<template>
  <div>
    <!-- 🔹 ปุ่ม ☰ ขีดสาม -->
    <button class="menu-btn" @click="toggleSidebar">
      ☰
    </button>

    <!-- 🔹 Sidebar -->
    <div class="sidebar" :class="{ show: showSidebar }">
      <!-- รูปโปรไฟล์ -->
      <div class="profile-pic-container">
        <img :src="profilePic" alt="Profile" class="profile-pic" />
      </div>

      <!-- เมนู -->
      <ul class="menu-links">
        <li><router-link to="/">หน้าหลัก</router-link></li>
        <li><router-link to="/student-list">ข้อมูลนิสิต</router-link></li>
        <li><router-link to="/course-list">รายละเอียดการเรียน</router-link></li>
        <li><router-link to="/my-contact">ช่องทางการติดต่อ</router-link></li>
      </ul>

      <!-- เครดิต -->
      <div class="sidebar-footer">
        <p>© 2025 Portfolio Project<br />Developed by Panupong Srisuyong</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSidebar: false,
      profilePic: new URL('@/assets/phai4.jpg', import.meta.url).href
    };
  },
  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    }
  }
};
</script>

<style scoped>
/* 🔸 ปุ่ม ☰ */
.menu-btn {
  position: fixed;
  top: 15px;
  left: 15px;
  background-color: #2f2f2f;
  border: 1px solid #888;
  color: white;
  font-size: 1.6rem;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}
.menu-btn:hover {
  background-color: #444;
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(255, 255, 255, 0.15);
}

/* 🔸 Sidebar */
.sidebar {
  position: fixed;
  left: -280px;
  top: 0;
  width: 280px;
  height: 100vh;
  background: linear-gradient(180deg, #5e5e5e, #3a3a3a);
  color: white;
  padding-top: 20px;
  transition: left 0.4s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 999;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.2);
  border-right: 3px solid #ffffff33;
}
.sidebar.show {
  left: 0;
}

/* 🔸 รูปโปรไฟล์ */
.profile-pic-container {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
.profile-pic {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #000;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
}

/* 🔸 เมนู */
.menu-links {
  list-style: none;
  padding: 0;
  margin-top: -380px;
  padding-left: 45px;
}
.menu-links li {
  margin: 15px 0;
}
.menu-links li a {
  text-decoration: none;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  display: block;
  padding: 12px 0;
  transition: all 0.3s ease;
}
.menu-links li a:hover {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  padding-left: 10px;
  transform: translateX(5px);
}

/* 🔸 เครดิต */
.sidebar-footer {
  text-align: center;
  font-size: 0.7rem;
  padding: 10px;
  color: #bbb;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}
.sidebar-footer:hover {
  opacity: 1;
}

@media (max-width: 768px) {
  /* ปรับเมนูให้อยู่ใต้รูป ไม่ทับกัน */
  .menu-links {
    margin-top: -120px;
    padding-left: 0;
    text-align: center;
  }

  /* เพิ่มระยะห่างระหว่างรูปกับเมนู */
  .profile-pic-container {
    margin-bottom: 5px;
  }

  /* ทำให้ภาพไม่หลุดกรอบเวลาหน้าจอเล็กมากๆ */
  .profile-pic {
    width: 100px;
    height: 100px;
  }

  /* ปรับขนาดตัวอักษรของเมนูเล็กลงนิดนึง */
  .menu-links li a {
    font-size: 1.1rem;
  }

  /* ปรับเครดิตให้แสดงพอดีในมือถือ */
  .sidebar-footer {
    font-size: 0.6rem;
    padding: 8px;
  }
}

</style>
