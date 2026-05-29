import { createRouter, createWebHistory } from 'vue-router'
import EventDetailView from '../views/EventDetailView.vue'
import EventListView from '../views/EventListView.vue'
import EventRegisterView from '../views/EventRegisterView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'events',
      component: EventListView,
    },
    {
      path: '/events/:id/register',
      name: 'event-register',
      component: EventRegisterView,
    },
    {
      path: '/events/:id',
      name: 'event-detail',
      component: EventDetailView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

export default router
