import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/views/MainPage.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';

const routes = [
  {
    path: '/',
    name: 'Main',
    component: MainPage,
  },
  {
    name: 'notFound',
    path: '/:notFound(.*)',
    component: NotFoundPage,
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
