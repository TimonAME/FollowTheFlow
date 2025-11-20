import { createRouter, createWebHistory } from 'vue-router'
import StartView from '@/views/StartView.vue'
import GameView from '@/views/GameView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: StartView,
    },
    {
      path: '/game',
      name: 'game',
      component: GameView,
    }
  ],
})

export default router
