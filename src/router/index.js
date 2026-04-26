import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CampaignView from '../views/CampaignView.vue';
import ProductView from '../views/ProductView.vue';
import CartView from '../views/CartView.vue';
import CheckoutView from '../views/CheckoutView.vue';
import SuccessView from '../views/SuccessView.vue';

const cachedRouteNames = new Set(['home', 'campaign', 'cart']);
const scrollMemory = new Map();

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/campaign', name: 'campaign', component: CampaignView },
    { path: '/product/:id', name: 'product', component: ProductView },
    { path: '/cart', name: 'cart', component: CartView },
    { path: '/checkout', name: 'checkout', component: CheckoutView },
    { path: '/success', name: 'success', component: SuccessView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, _from, savedPosition) {
    return new Promise((resolve) => {
      const target = savedPosition
        ?? (cachedRouteNames.has(to.name) ? { top: scrollMemory.get(to.name) ?? 0 } : { top: 0 });
      setTimeout(() => resolve(target), 200);
    });
  },
});

router.beforeEach((_to, from) => {
  if (cachedRouteNames.has(from.name)) {
    scrollMemory.set(from.name, window.scrollY);
  }
});

export default router;
