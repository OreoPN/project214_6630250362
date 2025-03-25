import { createRouter, createWebHistory } from "vue-router";
import MyPortfolio from "@/components/MyPortfolio.vue";
import StudentList from "@/components/StudentList.vue";
import CourseList from "@/components/CourseList.vue";
import MyContact from "@/components/MyContact.vue";

const routes = [
  { path: "/", name: "home", component: MyPortfolio }, // ✅ หน้าแรก
  { path: "/student-list", name: "students", component: StudentList },
  { path: "/course-list", name: "courses", component: CourseList },
  { path: "/my-contact", name: "contact", component: MyContact },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
