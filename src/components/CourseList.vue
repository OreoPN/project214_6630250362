<template>
  <div class="course-wrapper">
    <h2 class="title">รายละเอียดการเรียน</h2>

    <!-- 🔹 สรุปผลรวม -->
    <div class="summary-box">
      <div>รวมหน่วยกิต: <strong>{{ totalCredits }}</strong></div>
      <div>GPA: <strong>{{ gpa }}</strong></div>
    </div>

    <div v-for="course in courses" :key="course.id" class="course-card">
      <div class="course-header">
        <div class="left">
          <div class="code">{{ course.code }}</div>
          <div>
            <div class="en">{{ course.name }}</div>
            <div class="th">{{ course.name_th }}</div>
          </div>
        </div>
        <div class="right">
          <div class="credit">{{ course.credit }} หน่วยกิต</div>
          <div class="grade">{{ course.grade }}</div>
        </div>
        <div class="actions">
          <span class="edit-text" @click="toggleEdit(course.id)">แก้ไข</span>
          |
          <span class="delete-text" @click="confirmDelete(course.id)">ลบ</span>
        </div>
      </div>

      <div v-if="editingId === course.id" class="edit-form">
        <input v-model="editedCourse.code" class="form-control" placeholder="รหัสวิชา" />
        <input v-model="editedCourse.name" class="form-control" placeholder="ชื่อวิชา (EN)" />
        <input v-model="editedCourse.name_th" class="form-control" placeholder="ชื่อวิชา (TH)" />
        <input v-model.number="editedCourse.credit" class="form-control" placeholder="หน่วยกิต" type="number" />
        <input v-model="editedCourse.grade" class="form-control" placeholder="เกรด" />
        <button class="save-btn" @click="saveCourse(course.id)">💾 บันทึก</button>
        <button class="cancel-btn" @click="cancelEdit">ยกเลิก</button>
      </div>
    </div>

    <!-- ✅ ปุ่มเพิ่มวิชา -->
    <button class="add-btn" @click="showAddPopup = true">➕ เพิ่มวิชา</button>

    <!-- ✅ Popup เพิ่มวิชา -->
    <div class="popup-backdrop" v-if="showAddPopup">
      <div class="popup">
        <h3>เพิ่มวิชาใหม่</h3>
        <input v-model="newCourse.code" class="form-control" placeholder="รหัสวิชา" />
        <input v-model="newCourse.name" class="form-control" placeholder="ชื่อวิชา (EN)" />
        <input v-model="newCourse.name_th" class="form-control" placeholder="ชื่อวิชา (TH)" />
        <input v-model.number="newCourse.credit" class="form-control" placeholder="หน่วยกิต" type="number" />
        <input v-model="newCourse.grade" class="form-control" placeholder="เกรด" />
        <div class="popup-buttons">
          <button class="save-btn" @click="addCourse">✅ เพิ่ม</button>
          <button class="cancel-btn" @click="showAddPopup = false">❌ ยกเลิก</button>
        </div>
      </div>
    </div>

    <!-- ✅ ป๊อปอัพยืนยันการลบ -->
    <div class="popup-backdrop" v-if="deleteId !== null">
      <div class="popup">
        <h3>ยืนยันการลบวิชา</h3>
        <p>คุณแน่ใจหรือไม่ว่าต้องการลบวิชานี้?</p>
        <div class="popup-buttons">
          <button class="cancel-btn" @click="deleteId = null">ยกเลิก</button>
          <button class="save-btn" @click="deleteCourse(deleteId)">ลบ</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      courses: [],
      editingId: null,
      editedCourse: {},
      deleteId: null,
      showAddPopup: false,
      newCourse: {
        code: "",
        name: "",
        name_th: "",
        credit: 0,
        grade: ""
      }
    };
  },
  computed: {
    totalCredits() {
      return this.courses.reduce((sum, c) => sum + (Number(c.credit) || 0), 0);
    },
    gpa() {
      const gradeMap = {
        'A': 4, 'B+': 3.5, 'B': 3,
        'C+': 2.5, 'C': 2,
        'D+': 1.5, 'D': 1,
        'F': 0
      };
      let totalGrade = 0;
      let totalCredit = 0;
      this.courses.forEach(c => {
        const gradePoint = gradeMap[c.grade];
        if (gradePoint !== undefined) {
          totalGrade += gradePoint * c.credit;
          totalCredit += c.credit;
        }
      });
      return totalCredit > 0 ? (totalGrade / totalCredit).toFixed(2) : "-";
    }
  },
  methods: {
    async fetchCourses() {
      const res = await fetch("http://localhost:3000/courses");
      this.courses = await res.json();
    },
    toggleEdit(id) {
      const course = this.courses.find(c => c.id === id);
      this.editingId = this.editingId === id ? null : id;
      this.editedCourse = { ...course };
    },
    cancelEdit() {
      this.editingId = null;
    },
    async saveCourse(id) {
      const res = await fetch(`http://localhost:3000/courses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.editedCourse)
      });
      if (res.ok) {
        const index = this.courses.findIndex(c => c.id === id);
        this.courses[index] = { ...this.editedCourse };
        this.editingId = null;
      }
    },
    confirmDelete(id) {
      this.deleteId = id;
    },
    async deleteCourse(id) {
      await fetch(`http://localhost:3000/courses/${id}`, { method: "DELETE" });
      this.courses = this.courses.filter(c => c.id !== id);
      this.deleteId = null;
    },
    async addCourse() {
      const res = await fetch("http://localhost:3000/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.newCourse)
      });
      const data = await res.json();
      this.courses.push(data);
      this.newCourse = { code: "", name: "", name_th: "", credit: 0, grade: "" };
      this.showAddPopup = false;
    }
  },
  mounted() {
    this.fetchCourses();
  }
};
</script>

<style scoped>
.course-wrapper {
  background: #000;
  color: white;
  font-family: 'Prompt', sans-serif;
  padding: 30px;
  min-height: 100vh;
  position: relative;
}

.title {
  text-align: center;
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.summary-box {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 30px;
  font-size: 1.1rem;
  background-color: #1c1c1c;
  padding: 15px 30px;
  border-radius: 10px;
  border: 1px solid #444;
}

.course-card {
  background: #2a2a2a;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(255, 255, 255, 0.05);
}

.course-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 10px;
}

.left {
  flex: 1;
}

.code {
  font-weight: bold;
  margin-bottom: 4px;
}

.en {
  font-weight: 600;
}

.th {
  font-size: 0.9rem;
  color: #bbb;
  margin-top: 2px;
}

.right {
  text-align: right;
}

.credit {
  font-size: 0.9rem;
  color: #ccc;
}

.grade {
  font-size: 1.2rem;
  color: #7cdba0;
  font-weight: bold;
}

.actions {
  font-size: 0.9rem;
  color: #aaa;
  white-space: nowrap;
  margin-top: 5px;
}

.actions span {
  cursor: pointer;
  transition: all 0.2s ease;
}

.actions span:hover {
  color: #fff;
  text-decoration: underline;
}

.edit-form {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #444;
}

input.form-control {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.save-btn, .cancel-btn {
  padding: 8px 14px;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  margin-right: 10px;
  cursor: pointer;
}

.save-btn {
  background: #007bff;
  color: white;
}

.cancel-btn {
  background: #888;
  color: white;
}

.save-btn:hover,
.cancel-btn:hover {
  transform: translateY(-1px);
  opacity: 0.9;
}

.add-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: #4caf50;
  color: white;
  padding: 12px 20px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
}

.popup-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.popup {
  background: #222;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 0 15px rgba(255,255,255,0.1);
}

.popup h3 {
  margin-bottom: 20px;
  text-align: center;
}

.popup-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
}
</style>
