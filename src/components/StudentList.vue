<template>
  <div class="student-wrapper">
    <h2 class="title">ข้อมูลนิสิต</h2>

    <div class="content-box">
      <!-- รูป -->
      <div class="left-section">
        <div class="profile-box square-style">
          <img src="@/assets/phai4.jpg" alt="Profile" class="profile-img" />
        </div>
      </div>

      <!-- ข้อมูล -->
      <div class="right-section">
        <div class="info-box">
          <template v-if="!editMode">
            <p><strong>ชื่อ:</strong> {{ student.name }}</p>
            <p><strong>รหัสนิสิต:</strong> {{ student.student_id }}</p>
            <p><strong>สาขา:</strong> {{ student.major }}</p>
            <p><strong>โรงเรียนเดิม:</strong> {{ student.school }}</p>
            <button class="edit-btn" @click="startEdit">✏️ แก้ไขข้อมูล</button>
          </template>

          <template v-else>
            <div class="form-group">
              <label>ชื่อ</label>
              <input type="text" v-model="editedStudent.name" class="form-control" />
            </div>
            <div class="form-group">
              <label>รหัสนิสิต</label>
              <input type="text" v-model="editedStudent.student_id" class="form-control" />
            </div>
            <div class="form-group">
              <label>สาขา</label>
              <input type="text" v-model="editedStudent.major" class="form-control" />
            </div>
            <div class="form-group">
              <label>โรงเรียนเดิม</label>
              <input type="text" v-model="editedStudent.school" class="form-control" />
            </div>

            <button class="save-btn" @click="saveStudent">💾 บันทึก</button>
            <button class="cancel-btn" @click="cancelEdit">❌ ยกเลิก</button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      student: {
        name: "",
        student_id: "",
        major: "",
        school: ""
      },
      editedStudent: {},
      editMode: false
    };
  },
  methods: {
    async fetchStudent() {
      try {
        const res = await fetch("http://localhost:3000/student");
        this.student = await res.json();
      } catch (err) {
        console.error("โหลดข้อมูลล้มเหลว", err);
      }
    },
    startEdit() {
      this.editedStudent = { ...this.student };
      this.editMode = true;
    },
    async saveStudent() {
      try {
        const res = await fetch("http://localhost:3000/student", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.editedStudent)
        });
        if (res.ok) {
          this.student = { ...this.editedStudent };
          this.editMode = false;
        } else {
          alert("บันทึกไม่สำเร็จ");
        }
      } catch (err) {
        console.error("บันทึกข้อมูลล้มเหลว", err);
      }
    },
    cancelEdit() {
      this.editMode = false;
      this.editedStudent = {};
    }
  },
  mounted() {
    this.fetchStudent();
  }
};
</script>

<style scoped>
/* 🔳 พื้นหลังสีดำ และฟอนต์ */
.student-wrapper {
  background-color: #000;
  min-height: 100vh;
  padding: 20px 16px;
  color: white;
  font-family: 'Prompt', sans-serif;
}

/* 🔳 หัวข้อ */
.title {
  text-align: center;
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 40px;
  color: #ffffff;
}

/* 🔳 โครงสร้าง Layout */
.content-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
}

.left-section {
  flex: 0 0 250px;
  display: flex;
  justify-content: center;
}

.right-section {
  flex: 1;
  max-width: 600px;
}

/* 🔳 กล่องรูปภาพ */
.profile-box.square-style {
  width: 260px;
  background-color: transparent;
  border-radius: 12px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
}

.profile-box.square-style img {
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
  border: none;
  box-shadow: 0 6px 18px rgba(255, 255, 255, 0.15);
  transition: box-shadow 0.3s ease-in-out, transform 0.3s;
}

.profile-box.square-style img:hover {
  box-shadow: 0 10px 25px rgba(255, 255, 255, 0.25);
  transform: scale(1.02);
}

/* 🔳 กล่องข้อมูลนิสิต */
.info-box {
  background-color: #3a3a3a;
  padding: 30px;
  border-radius: 12px;
  border: 1px solid #5e5e5e;
  box-shadow: 0 0 10px rgba(255,255,255,0.05);
  animation: fadeIn 0.6s ease-in-out;
  transition: transform 0.3s ease;
}

.info-box:hover {
  box-shadow: 0 0 18px rgba(255, 255, 255, 0.1);
  transform: translateY(-3px);
}

/* 🔳 ข้อความภายใน */
.info-box p {
  background-color: #5e5e5e;
  padding: 12px 16px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #888;
  font-size: 1.2rem;
  color: #fff;
}

/* 🔳 ฟอร์มแก้ไข */
.form-group {
  margin-bottom: 15px;
  text-align: left;
}
input.form-control {
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

/* 🔳 ปุ่มต่าง ๆ */
.edit-btn, .save-btn, .cancel-btn {
  margin-top: 20px;
  margin-right: 10px;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}
.edit-btn { background-color: #4caf50; color: white; }
.save-btn { background-color: #007bff; color: white; }
.cancel-btn { background-color: #888; color: white; }

.edit-btn:hover,
.save-btn:hover,
.cancel-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.12);
}

/* 🔳 Animation กล่องข้อมูล */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 🔳 Responsive */
@media (max-width: 768px) {
  .content-box {
    flex-direction: column;
    align-items: center;
  }
  .left-section,
  .right-section {
    width: 100%;
    text-align: center;
  }
  .info-box {
    margin-top: 20px;
    padding: 20px;
  }
}
</style>
