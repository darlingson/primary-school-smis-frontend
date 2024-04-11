import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SchoolInfo from '../views/SchoolInfoView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/teachers',
      name: 'teachers',
      component: () => import('../views/TeachersView.vue')
    },
    {
      path: '/schools',
      name: 'schools',
      component: () => import('../views/SchoolsView.vue')
    },
    { path: '/school/:id', name: 'SchoolInfo', component: SchoolInfo }
    // { path: '/school/:id/edit', name: 'EditSchool', component: EditSchool },
    // { path: '/school/:id/add-teachers', name: 'AddTeachers', component: AddTeachers },
    // { path: '/school/:id/add-students', name: 'AddStudents', component: AddStudents }
  ]
})

export default router
