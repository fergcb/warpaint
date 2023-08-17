import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PaintsView from '../views/PaintsView.vue'
import PaintView from '../views/PaintView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/paints',
      name: 'paints',
      component: PaintsView
    },
    {
      path: '/paint/:id',
      name: 'paint',
      component: PaintView,
    }
  ]
})

export default router
