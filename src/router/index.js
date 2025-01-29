import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/post/:id',
      name: 'post',
      component: () => import('@/views/Post.vue'),
    },
    {
      path: '/newpost',
      name: 'newpost',
      component: () => import('@/views/NewPost.vue'),
    },
  ],
})

export default router
