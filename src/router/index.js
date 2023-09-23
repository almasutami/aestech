import { createRouter, createWebHistory } from 'vue-router'
import Employee from '@/pages/employee/employee-page.vue'
import Branches from '@/pages/branch/branches-page.vue'
import Settings from '@/pages/employee/employee-settings.vue'

const routes = [
  {
    path: '/',
    name: 'Employee',
    component: Employee
  },
  {
    path: '/branches',
    name: 'Branches',
    component: Branches
  },
  {
    path: '/settings',
    name: 'Profile Settings',
    component: Settings
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
