import { createRouter, createWebHistory } from 'vue-router'

import Welcome from '@/pages/welcome.vue'
import search from '@/pages/search.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Welcome },
    {
      path: '/search',
      component: search,
    },
  ],
  // Ensure proper behavior on refresh
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
