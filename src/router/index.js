import { createRouter, createWebHistory } from 'vue-router';

const HomePlaceholder = {
  template: '<section>多多移动商城</section>',
};

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomePlaceholder,
    },
  ],
});

export default router;
