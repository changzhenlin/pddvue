# PDD Mobile Commerce Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a pure frontend Vue 3 mobile commerce app inspired by Pinduoduo, with mock data and a complete shopping flow from discovery to order success.

**Architecture:** Create a Vite Vue 3 app with Vue Router for six pages and Pinia for cart, checkout, and order state. Keep mock data local and deterministic, and render the app in a centered phone-width shell on desktop.

**Tech Stack:** Vue 3, Vite, Vue Router, Pinia, CSS modules via regular scoped/global CSS, npm scripts.

---

## File Structure

- Create `package.json`: npm scripts and dependencies.
- Create `index.html`: Vite entry HTML.
- Create `vite.config.js`: Vue plugin config.
- Create `src/main.js`: app bootstrap, router, Pinia.
- Create `src/App.vue`: phone shell, router view, bottom tab visibility.
- Create `src/router/index.js`: all application routes.
- Create `src/data/mock.js`: products, channels, campaign data, default address.
- Create `src/stores/shop.js`: Pinia store for cart, checkout, order, totals.
- Create `src/components/AppTabbar.vue`: bottom navigation.
- Create `src/components/ProductCard.vue`: reusable product card.
- Create `src/components/QuantityStepper.vue`: reusable quantity control with stock bounds.
- Create `src/views/HomeView.vue`: homepage.
- Create `src/views/CampaignView.vue`: campaign page.
- Create `src/views/ProductView.vue`: product detail page.
- Create `src/views/CartView.vue`: cart page.
- Create `src/views/CheckoutView.vue`: checkout page.
- Create `src/views/SuccessView.vue`: order success page.
- Create `src/styles/global.css`: reset, phone shell, theme, shared utility classes.
- Modify `.gitignore`: already includes `.superpowers/`, `node_modules/`, `dist/`, `.DS_Store`; keep it unchanged unless npm creates additional local files.

## Task 1: Scaffold Vite Vue App

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `vite.config.js`
- Create: `src/main.js`
- Create: `src/styles/global.css`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "pddvue",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --host 127.0.0.1",
    "build": "vite build",
    "preview": "vite preview --host 127.0.0.1"
  },
  "dependencies": {
    "@vitejs/plugin-vue": "^5.2.3",
    "vite": "^6.2.6",
    "vue": "^3.5.13",
    "vue-router": "^4.5.0",
    "pinia": "^3.0.2"
  },
  "devDependencies": {}
}
```

- [ ] **Step 2: Create `index.html`**

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#e02b20" />
    <title>多多移动商城</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

- [ ] **Step 3: Create `vite.config.js`**

```js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
});
```

- [ ] **Step 4: Create `src/main.js`**

```js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './styles/global.css';

createApp(App).use(createPinia()).use(router).mount('#app');
```

- [ ] **Step 5: Create initial `src/styles/global.css`**

```css
:root {
  --red: #e02b20;
  --red-deep: #bd1d16;
  --gold: #ffd45c;
  --ink: #1d1d1f;
  --muted: #777;
  --line: #ececec;
  --bg: #f5f5f5;
  --card: #fff;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  background: #d8d8d8;
  color: var(--ink);
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
}

button,
input {
  font: inherit;
}

button {
  border: 0;
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;
}

#app {
  min-height: 100vh;
}

.phone-shell {
  width: min(100vw, 430px);
  min-height: 100vh;
  margin: 0 auto;
  background: var(--bg);
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.18);
}

.page {
  min-height: 100vh;
  padding-bottom: 72px;
}

.page.no-tabbar {
  padding-bottom: 0;
}

.price {
  color: var(--red);
  font-weight: 800;
}

.muted {
  color: var(--muted);
}

.primary-button {
  min-height: 44px;
  border-radius: 999px;
  background: var(--red);
  color: #fff;
  font-weight: 800;
}

.ghost-button {
  min-height: 42px;
  border-radius: 999px;
  background: #fff2ef;
  color: var(--red);
  font-weight: 800;
}

.section-title {
  margin: 0;
  font-size: 18px;
  font-weight: 900;
}
```

- [ ] **Step 6: Install dependencies**

Run: `npm install`

Expected: command exits successfully and creates `package-lock.json`.

- [ ] **Step 7: Commit scaffold**

```bash
git add package.json package-lock.json index.html vite.config.js src/main.js src/styles/global.css
git commit -m "chore: scaffold vue commerce app"
```

## Task 2: Add Mock Data And Store

**Files:**
- Create: `src/data/mock.js`
- Create: `src/stores/shop.js`

- [ ] **Step 1: Create `src/data/mock.js`**

```js
export const channels = [
  { id: 'food', label: '食品百货', icon: '🍜' },
  { id: 'fruit', label: '多多果园', icon: '🍊' },
  { id: 'subsidy', label: '百亿补贴', icon: '💰' },
  { id: 'flash', label: '限时秒杀', icon: '⏱' },
  { id: 'farm', label: '农货直发', icon: '🌾' },
  { id: 'brand', label: '品牌特卖', icon: '🏷' },
  { id: 'fresh', label: '生鲜到家', icon: '🥬' },
  { id: 'digital', label: '数码家电', icon: '📱' },
  { id: 'baby', label: '母婴玩具', icon: '🧸' },
  { id: 'more', label: '全部频道', icon: '⋯' },
];

export const products = [
  {
    id: 'apple-box',
    title: '陕西洛川红富士苹果整箱',
    subtitle: '脆甜多汁 产地直发',
    price: 19.9,
    originalPrice: 39.9,
    sales: '10万+',
    image: 'linear-gradient(135deg, #ff8a73, #d8291e)',
    tags: ['万人团', '包邮'],
    stock: 88,
    specs: ['5斤装', '9斤装'],
    campaign: true,
  },
  {
    id: 'tissue-pack',
    title: '原木抽纸家庭囤货装',
    subtitle: '柔韧不易破 一提装',
    price: 12.8,
    originalPrice: 29.9,
    sales: '8.2万',
    image: 'linear-gradient(135deg, #fff0d1, #f3b14b)',
    tags: ['限时秒杀', '第二件半价'],
    stock: 120,
    specs: ['12包', '24包'],
    campaign: true,
  },
  {
    id: 'rice-bag',
    title: '东北珍珠米新米',
    subtitle: '软糯香甜 家庭常备',
    price: 26.9,
    originalPrice: 49.9,
    sales: '6.5万',
    image: 'linear-gradient(135deg, #f6e9bc, #8eba63)',
    tags: ['农货直发', '包邮'],
    stock: 65,
    specs: ['5kg', '10kg'],
    campaign: false,
  },
  {
    id: 'charger',
    title: '快充充电器套装',
    subtitle: '兼容多机型 充电更快',
    price: 18.8,
    originalPrice: 59.9,
    sales: '4.7万',
    image: 'linear-gradient(135deg, #d8ebff, #4b8ee8)',
    tags: ['百亿补贴', '正品'],
    stock: 54,
    specs: ['Type-C', 'Lightning'],
    campaign: true,
  },
  {
    id: 'detergent',
    title: '洗衣凝珠留香家庭装',
    subtitle: '除菌留香 低泡易漂',
    price: 23.6,
    originalPrice: 69,
    sales: '3.8万',
    image: 'linear-gradient(135deg, #d7f7ff, #38b6c9)',
    tags: ['今日爆款', '多件优惠'],
    stock: 71,
    specs: ['40颗', '80颗'],
    campaign: false,
  },
  {
    id: 'snack-box',
    title: '零食大礼包组合装',
    subtitle: '办公室追剧分享装',
    price: 29.9,
    originalPrice: 79.9,
    sales: '9.1万',
    image: 'linear-gradient(135deg, #ffd7a6, #ff7048)',
    tags: ['爆款返场', '满减'],
    stock: 96,
    specs: ['经典款', '辣味款'],
    campaign: true,
  },
];

export const defaultAddress = {
  name: '张三',
  phone: '138 0000 8888',
  detail: '上海市浦东新区世纪大道 100 号 18 楼',
};

export const coupons = [
  { id: 'coupon-8', label: '满59减8', amount: 8, threshold: 59 },
  { id: 'coupon-3', label: '活动商品立减3', amount: 3, threshold: 0 },
];
```

- [ ] **Step 2: Create `src/stores/shop.js`**

```js
import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { defaultAddress, products } from '../data/mock';

const money = (value) => Number(value.toFixed(2));

export const useShopStore = defineStore('shop', () => {
  const cart = ref([]);
  const checkoutItems = ref([]);
  const latestOrder = ref(null);
  const address = ref(defaultAddress);

  const getProduct = (id) => products.find((product) => product.id === id);

  const hydrateItems = (items) =>
    items
      .map((item) => {
        const product = getProduct(item.productId);
        return product ? { ...item, product } : null;
      })
      .filter(Boolean);

  const cartItems = computed(() => hydrateItems(cart.value));
  const selectedCartItems = computed(() => cartItems.value.filter((item) => item.selected));
  const cartCount = computed(() => cart.value.reduce((sum, item) => sum + item.quantity, 0));
  const allSelected = computed(() => cart.value.length > 0 && cart.value.every((item) => item.selected));

  const activeCheckoutItems = computed(() => hydrateItems(checkoutItems.value));
  const checkoutSubtotal = computed(() =>
    money(activeCheckoutItems.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)),
  );
  const checkoutDiscount = computed(() => {
    const hasCampaign = activeCheckoutItems.value.some((item) => item.product.campaign);
    const thresholdDiscount = checkoutSubtotal.value >= 59 ? 8 : 0;
    return money((hasCampaign ? 3 : 0) + thresholdDiscount);
  });
  const checkoutShipping = computed(() => (checkoutSubtotal.value > 0 ? 0 : 0));
  const checkoutTotal = computed(() => money(Math.max(0, checkoutSubtotal.value - checkoutDiscount.value + checkoutShipping.value)));

  function addToCart(productId, spec, quantity) {
    const existing = cart.value.find((item) => item.productId === productId && item.spec === spec);
    const product = getProduct(productId);
    if (!product) return;

    if (existing) {
      existing.quantity = Math.min(product.stock, existing.quantity + quantity);
      existing.selected = true;
      return;
    }

    cart.value.push({
      productId,
      spec,
      quantity: Math.min(product.stock, quantity),
      selected: true,
    });
  }

  function setCartSelected(productId, spec, selected) {
    const item = cart.value.find((entry) => entry.productId === productId && entry.spec === spec);
    if (item) item.selected = selected;
  }

  function setAllCartSelected(selected) {
    cart.value.forEach((item) => {
      item.selected = selected;
    });
  }

  function setCartQuantity(productId, spec, quantity) {
    const product = getProduct(productId);
    const item = cart.value.find((entry) => entry.productId === productId && entry.spec === spec);
    if (item && product) item.quantity = Math.min(product.stock, Math.max(1, quantity));
  }

  function removeCartItem(productId, spec) {
    cart.value = cart.value.filter((item) => !(item.productId === productId && item.spec === spec));
  }

  function checkoutFromCart() {
    checkoutItems.value = selectedCartItems.value.map(({ productId, spec, quantity }) => ({ productId, spec, quantity }));
  }

  function checkoutNow(productId, spec, quantity) {
    checkoutItems.value = [{ productId, spec, quantity }];
  }

  function submitOrder() {
    if (activeCheckoutItems.value.length === 0) return null;

    const order = {
      orderNo: `DD${Date.now().toString().slice(-10)}`,
      items: activeCheckoutItems.value.map(({ productId, spec, quantity, product }) => ({
        productId,
        spec,
        quantity,
        title: product.title,
        price: product.price,
      })),
      address: address.value,
      subtotal: checkoutSubtotal.value,
      discount: checkoutDiscount.value,
      shipping: checkoutShipping.value,
      total: checkoutTotal.value,
      createdAt: new Date().toISOString(),
    };

    latestOrder.value = order;
    const orderedKeys = new Set(checkoutItems.value.map((item) => `${item.productId}:${item.spec}`));
    cart.value = cart.value.filter((item) => !orderedKeys.has(`${item.productId}:${item.spec}`));
    checkoutItems.value = [];
    return order;
  }

  return {
    cart,
    checkoutItems,
    latestOrder,
    address,
    cartItems,
    selectedCartItems,
    cartCount,
    allSelected,
    activeCheckoutItems,
    checkoutSubtotal,
    checkoutDiscount,
    checkoutShipping,
    checkoutTotal,
    getProduct,
    addToCart,
    setCartSelected,
    setAllCartSelected,
    setCartQuantity,
    removeCartItem,
    checkoutFromCart,
    checkoutNow,
    submitOrder,
  };
});
```

- [ ] **Step 3: Commit data and store**

```bash
git add src/data/mock.js src/stores/shop.js
git commit -m "feat: add mock commerce data and store"
```

## Task 3: Add Routing, App Shell, And Shared Components

**Files:**
- Create: `src/router/index.js`
- Create: `src/App.vue`
- Create: `src/components/AppTabbar.vue`
- Create: `src/components/ProductCard.vue`
- Create: `src/components/QuantityStepper.vue`

- [ ] **Step 1: Create `src/router/index.js`**

```js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CampaignView from '../views/CampaignView.vue';
import ProductView from '../views/ProductView.vue';
import CartView from '../views/CartView.vue';
import CheckoutView from '../views/CheckoutView.vue';
import SuccessView from '../views/SuccessView.vue';

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
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
```

- [ ] **Step 2: Create `src/App.vue`**

```vue
<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppTabbar from './components/AppTabbar.vue';

const route = useRoute();
const tabbarRoutes = ['home', 'campaign', 'cart'];
const showTabbar = computed(() => tabbarRoutes.includes(route.name));
</script>

<template>
  <main class="phone-shell">
    <RouterView v-slot="{ Component }">
      <Transition name="page-fade" mode="out-in">
        <component :is="Component" :class="['page', { 'no-tabbar': !showTabbar }]" />
      </Transition>
    </RouterView>
    <AppTabbar v-if="showTabbar" />
  </main>
</template>
```

- [ ] **Step 3: Append shell transition CSS to `src/styles/global.css`**

```css
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 160ms ease, transform 160ms ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
```

- [ ] **Step 4: Create `src/components/AppTabbar.vue`**

```vue
<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useShopStore } from '../stores/shop';

const route = useRoute();
const shop = useShopStore();

const tabs = computed(() => [
  { name: 'home', path: '/', icon: '⌂', label: '首页' },
  { name: 'campaign', path: '/campaign', icon: '券', label: '活动' },
  { name: 'cart', path: '/cart', icon: '🛒', label: '购物车', badge: shop.cartCount },
]);
</script>

<template>
  <nav class="tabbar">
    <RouterLink
      v-for="tab in tabs"
      :key="tab.name"
      :to="tab.path"
      :class="['tabbar__item', { active: route.name === tab.name }]"
    >
      <span class="tabbar__icon">{{ tab.icon }}</span>
      <span v-if="tab.badge" class="tabbar__badge">{{ tab.badge }}</span>
      <span>{{ tab.label }}</span>
    </RouterLink>
  </nav>
</template>

<style scoped>
.tabbar {
  position: fixed;
  left: 50%;
  bottom: 0;
  z-index: 20;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: min(100vw, 430px);
  height: 64px;
  transform: translateX(-50%);
  border-top: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(14px);
}

.tabbar__item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  color: #777;
  font-size: 12px;
  font-weight: 700;
}

.tabbar__item.active {
  color: var(--red);
}

.tabbar__icon {
  font-size: 20px;
  line-height: 1;
}

.tabbar__badge {
  position: absolute;
  top: 7px;
  right: calc(50% - 24px);
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 999px;
  background: var(--red);
  color: #fff;
  font-size: 10px;
  line-height: 16px;
  text-align: center;
}
```

- [ ] **Step 5: Create `src/components/ProductCard.vue`**

```vue
<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <RouterLink class="product-card" :to="`/product/${product.id}`">
    <div class="product-card__image" :style="{ background: product.image }">
      <span v-if="product.campaign" class="product-card__flag">活动价</span>
    </div>
    <div class="product-card__body">
      <h3>{{ product.title }}</h3>
      <p>{{ product.subtitle }}</p>
      <div class="product-card__tags">
        <span v-for="tag in product.tags" :key="tag">{{ tag }}</span>
      </div>
      <div class="product-card__price">
        <span class="price">￥{{ product.price.toFixed(1) }}</span>
        <small>已拼{{ product.sales }}</small>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.product-card {
  display: block;
  overflow: hidden;
  border-radius: 10px;
  background: #fff;
  color: var(--ink);
  transition: transform 150ms ease, box-shadow 150ms ease;
}

.product-card:active {
  transform: scale(0.98);
}

.product-card__image {
  position: relative;
  aspect-ratio: 1 / 0.82;
}

.product-card__flag {
  position: absolute;
  left: 8px;
  top: 8px;
  padding: 3px 7px;
  border-radius: 999px;
  background: rgba(224, 43, 32, 0.92);
  color: #fff;
  font-size: 11px;
  font-weight: 800;
}

.product-card__body {
  padding: 9px;
}

.product-card h3 {
  display: -webkit-box;
  margin: 0;
  overflow: hidden;
  font-size: 14px;
  line-height: 1.35;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-card p {
  margin: 5px 0 0;
  color: var(--muted);
  font-size: 11px;
}

.product-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 8px;
}

.product-card__tags span {
  padding: 2px 5px;
  border: 1px solid #ffd0ca;
  border-radius: 4px;
  color: var(--red);
  font-size: 10px;
}

.product-card__price {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 6px;
  margin-top: 8px;
}

.product-card__price small {
  color: var(--muted);
  font-size: 10px;
}
```

- [ ] **Step 6: Create `src/components/QuantityStepper.vue`**

```vue
<script setup>
const model = defineModel({ type: Number, required: true });

const props = defineProps({
  min: {
    type: Number,
    default: 1,
  },
  max: {
    type: Number,
    default: 99,
  },
});

function update(nextValue) {
  model.value = Math.min(props.max, Math.max(props.min, nextValue));
}
</script>

<template>
  <div class="stepper">
    <button type="button" :disabled="model <= min" @click="update(model - 1)">−</button>
    <span>{{ model }}</span>
    <button type="button" :disabled="model >= max" @click="update(model + 1)">+</button>
  </div>
</template>

<style scoped>
.stepper {
  display: inline-grid;
  grid-template-columns: 30px 36px 30px;
  align-items: center;
  overflow: hidden;
  border-radius: 999px;
  background: #f2f2f2;
}

.stepper button {
  width: 30px;
  height: 30px;
  background: transparent;
  color: var(--ink);
  font-size: 18px;
  font-weight: 800;
}

.stepper button:disabled {
  color: #bbb;
}

.stepper span {
  text-align: center;
  font-size: 14px;
  font-weight: 800;
}
```

- [ ] **Step 7: Commit routing and components**

```bash
git add src/router/index.js src/App.vue src/components/AppTabbar.vue src/components/ProductCard.vue src/components/QuantityStepper.vue src/styles/global.css
git commit -m "feat: add app shell and shared components"
```

## Task 4: Build Home And Campaign Pages

**Files:**
- Create: `src/views/HomeView.vue`
- Create: `src/views/CampaignView.vue`

- [ ] **Step 1: Create `src/views/HomeView.vue`**

```vue
<script setup>
import ProductCard from '../components/ProductCard.vue';
import { channels, products } from '../data/mock';

const flashProducts = products.filter((product) => product.campaign).slice(0, 3);
</script>

<template>
  <section class="home">
    <header class="home__hero">
      <div class="home__topline">
        <strong>多多商城</strong>
        <span>省钱月卡</span>
      </div>
      <div class="home__search">搜索低价好货</div>
      <div class="home__quick">
        <span>限时秒杀</span>
        <span>百亿补贴</span>
        <span>多人团</span>
      </div>
    </header>

    <section class="home__channels">
      <div v-for="channel in channels" :key="channel.id" class="home__channel">
        <span>{{ channel.icon }}</span>
        <strong>{{ channel.label }}</strong>
      </div>
    </section>

    <section class="home__flash">
      <div class="home__section-head">
        <h2 class="section-title">限时秒杀</h2>
        <RouterLink to="/campaign">去会场</RouterLink>
      </div>
      <div class="home__flash-list">
        <RouterLink v-for="product in flashProducts" :key="product.id" :to="`/product/${product.id}`" class="home__flash-item">
          <div :style="{ background: product.image }"></div>
          <strong>￥{{ product.price.toFixed(1) }}</strong>
          <small>￥{{ product.originalPrice.toFixed(1) }}</small>
        </RouterLink>
      </div>
    </section>

    <section class="home__feed">
      <div class="home__section-head">
        <h2 class="section-title">猜你喜欢</h2>
        <span>低价好物持续上新</span>
      </div>
      <div class="home__grid">
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
      </div>
    </section>
  </section>
</template>

<style scoped>
.home {
  background: var(--bg);
}

.home__hero {
  padding: 14px 14px 18px;
  border-radius: 0 0 22px 22px;
  background: linear-gradient(180deg, var(--red), #f24a32);
  color: #fff;
}

.home__topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}

.home__topline strong {
  font-size: 20px;
  font-weight: 900;
}

.home__search {
  margin-top: 12px;
  padding: 10px 14px;
  border-radius: 999px;
  background: #fff;
  color: #999;
  font-size: 14px;
}

.home__quick {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.home__quick span {
  padding: 5px 9px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
  font-size: 12px;
  font-weight: 800;
}

.home__channels {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px 6px;
  margin: 10px;
  padding: 14px 8px;
  border-radius: 14px;
  background: #fff;
}

.home__channel {
  display: grid;
  justify-items: center;
  gap: 5px;
  font-size: 11px;
}

.home__channel span {
  display: grid;
  width: 36px;
  height: 36px;
  place-items: center;
  border-radius: 14px;
  background: #fff1df;
  font-size: 20px;
}

.home__flash,
.home__feed {
  margin: 10px;
}

.home__section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.home__section-head a,
.home__section-head span {
  color: var(--muted);
  font-size: 12px;
}

.home__flash {
  padding: 12px;
  border-radius: 14px;
  background: #fff7e3;
}

.home__flash-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.home__flash-item {
  padding: 7px;
  border-radius: 10px;
  background: #fff;
}

.home__flash-item div {
  aspect-ratio: 1;
  border-radius: 8px;
}

.home__flash-item strong {
  display: block;
  margin-top: 6px;
  color: var(--red);
  font-size: 14px;
}

.home__flash-item small {
  color: #999;
  text-decoration: line-through;
}

.home__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 9px;
}
```

- [ ] **Step 2: Create `src/views/CampaignView.vue`**

```vue
<script setup>
import { useRouter } from 'vue-router';
import ProductCard from '../components/ProductCard.vue';
import { coupons, products } from '../data/mock';
import { useShopStore } from '../stores/shop';

const router = useRouter();
const shop = useShopStore();
const campaignProducts = products.filter((product) => product.campaign);

function buyNow(product) {
  shop.checkoutNow(product.id, product.specs[0], 1);
  router.push('/checkout');
}
</script>

<template>
  <section class="campaign">
    <header class="campaign__hero">
      <div>
        <span>限时会场</span>
        <h1>今晚低价</h1>
        <p>整点开抢 · 拼团更省 · 活动商品立减</p>
      </div>
      <strong>00:29:58</strong>
    </header>

    <section class="campaign__coupons">
      <article v-for="coupon in coupons" :key="coupon.id">
        <strong>{{ coupon.label }}</strong>
        <span>立即可用</span>
      </article>
    </section>

    <section class="campaign__deals">
      <div class="campaign__head">
        <h2 class="section-title">爆款直降</h2>
        <span>活动商品支持直接购买</span>
      </div>
      <div class="campaign__list">
        <article v-for="product in campaignProducts" :key="product.id" class="campaign__deal">
          <ProductCard :product="product" />
          <button type="button" class="primary-button" @click="buyNow(product)">立即拼单</button>
        </article>
      </div>
    </section>
  </section>
</template>

<style scoped>
.campaign {
  min-height: 100vh;
  background: #2a1713;
}

.campaign__hero {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 14px 28px;
  background: linear-gradient(135deg, #ff3b25, #ffd45c);
  color: #260d08;
}

.campaign__hero span {
  font-size: 13px;
  font-weight: 900;
}

.campaign__hero h1 {
  margin: 8px 0 5px;
  font-size: 38px;
  line-height: 1;
}

.campaign__hero p {
  margin: 0;
  font-size: 13px;
}

.campaign__hero strong {
  align-self: flex-start;
  padding: 6px 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.45);
  font-size: 12px;
}

.campaign__coupons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin: -16px 10px 12px;
}

.campaign__coupons article {
  padding: 12px;
  border-radius: 12px;
  background: #fff8dc;
}

.campaign__coupons strong {
  display: block;
  color: var(--red);
  font-size: 18px;
}

.campaign__coupons span {
  color: #8a5b1a;
  font-size: 12px;
}

.campaign__deals {
  padding: 10px;
}

.campaign__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 10px;
  color: #fff;
}

.campaign__head span {
  color: #ffd45c;
  font-size: 12px;
}

.campaign__list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 9px;
}

.campaign__deal {
  display: grid;
  gap: 7px;
}

.campaign__deal button {
  width: 100%;
  min-height: 38px;
}
```

- [ ] **Step 3: Commit home and campaign pages**

```bash
git add src/views/HomeView.vue src/views/CampaignView.vue
git commit -m "feat: build home and campaign pages"
```

## Task 5: Build Product Detail Page

**Files:**
- Create: `src/views/ProductView.vue`

- [ ] **Step 1: Create `src/views/ProductView.vue`**

```vue
<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import QuantityStepper from '../components/QuantityStepper.vue';
import { useShopStore } from '../stores/shop';

const route = useRoute();
const router = useRouter();
const shop = useShopStore();
const product = computed(() => shop.getProduct(route.params.id));
const selectedSpec = ref('');
const quantity = ref(1);
const added = ref(false);

if (product.value) {
  selectedSpec.value = product.value.specs[0];
}

function addCart() {
  if (!product.value) return;
  shop.addToCart(product.value.id, selectedSpec.value, quantity.value);
  added.value = true;
  window.setTimeout(() => {
    added.value = false;
  }, 1200);
}

function buyNow() {
  if (!product.value) return;
  shop.checkoutNow(product.value.id, selectedSpec.value, quantity.value);
  router.push('/checkout');
}
</script>

<template>
  <section v-if="product" class="detail">
    <div class="detail__image" :style="{ background: product.image }">
      <button type="button" @click="router.back()">‹</button>
    </div>

    <section class="detail__panel">
      <div class="detail__price-row">
        <div>
          <strong class="price">￥{{ product.price.toFixed(1) }}</strong>
          <small>￥{{ product.originalPrice.toFixed(1) }}</small>
        </div>
        <span>已拼{{ product.sales }}</span>
      </div>
      <h1>{{ product.title }}</h1>
      <p>{{ product.subtitle }}</p>
      <div class="detail__tags">
        <span v-for="tag in product.tags" :key="tag">{{ tag }}</span>
      </div>
    </section>

    <section class="detail__panel">
      <h2>规格</h2>
      <div class="detail__specs">
        <button
          v-for="spec in product.specs"
          :key="spec"
          type="button"
          :class="{ active: selectedSpec === spec }"
          @click="selectedSpec = spec"
        >
          {{ spec }}
        </button>
      </div>
      <div class="detail__quantity">
        <span>数量</span>
        <QuantityStepper v-model="quantity" :max="product.stock" />
      </div>
      <p class="muted">库存 {{ product.stock }} 件 · 48小时内发货 · 退货包运费</p>
    </section>

    <div class="detail__bar">
      <RouterLink to="/cart" class="detail__cart">购物车</RouterLink>
      <button type="button" class="ghost-button" @click="addCart">加入购物车</button>
      <button type="button" class="primary-button" @click="buyNow">立即购买</button>
    </div>
    <div v-if="added" class="detail__toast">已加入购物车</div>
  </section>

  <section v-else class="detail detail--empty">
    <h1>商品不存在</h1>
    <RouterLink class="primary-button" to="/">返回首页</RouterLink>
  </section>
</template>

<style scoped>
.detail {
  min-height: 100vh;
  padding-bottom: 74px;
  background: var(--bg);
}

.detail__image {
  position: relative;
  height: 320px;
}

.detail__image button {
  position: absolute;
  left: 12px;
  top: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.32);
  color: #fff;
  font-size: 30px;
  line-height: 30px;
}

.detail__panel {
  margin: 10px;
  padding: 14px;
  border-radius: 12px;
  background: #fff;
}

.detail__price-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.detail__price-row .price {
  font-size: 28px;
}

.detail__price-row small {
  margin-left: 6px;
  color: #999;
  text-decoration: line-through;
}

.detail h1 {
  margin: 10px 0 6px;
  font-size: 20px;
  line-height: 1.3;
}

.detail p {
  margin: 0;
  font-size: 13px;
}

.detail h2 {
  margin: 0 0 10px;
  font-size: 16px;
}

.detail__tags,
.detail__specs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.detail__tags span,
.detail__specs button {
  padding: 7px 10px;
  border-radius: 999px;
  background: #fff2ef;
  color: var(--red);
  font-size: 12px;
  font-weight: 800;
}

.detail__specs button.active {
  background: var(--red);
  color: #fff;
}

.detail__quantity {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 16px 0;
}

.detail__bar {
  position: fixed;
  left: 50%;
  bottom: 0;
  display: grid;
  grid-template-columns: 56px 1fr 1fr;
  gap: 8px;
  width: min(100vw, 430px);
  padding: 10px;
  transform: translateX(-50%);
  border-top: 1px solid var(--line);
  background: #fff;
}

.detail__cart {
  display: grid;
  place-items: center;
  color: var(--red);
  font-size: 12px;
  font-weight: 800;
}

.detail__toast {
  position: fixed;
  left: 50%;
  bottom: 82px;
  padding: 9px 14px;
  transform: translateX(-50%);
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.78);
  color: #fff;
  font-size: 13px;
}

.detail--empty {
  display: grid;
  place-content: center;
  gap: 16px;
  padding: 24px;
  text-align: center;
}
```

- [ ] **Step 2: Commit product detail**

```bash
git add src/views/ProductView.vue
git commit -m "feat: build product detail flow"
```

## Task 6: Build Cart, Checkout, And Success Pages

**Files:**
- Create: `src/views/CartView.vue`
- Create: `src/views/CheckoutView.vue`
- Create: `src/views/SuccessView.vue`

- [ ] **Step 1: Create `src/views/CartView.vue`**

```vue
<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import QuantityStepper from '../components/QuantityStepper.vue';
import { useShopStore } from '../stores/shop';

const router = useRouter();
const shop = useShopStore();
const selectedTotal = computed(() =>
  shop.selectedCartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2),
);

function checkout() {
  shop.checkoutFromCart();
  if (shop.activeCheckoutItems.length > 0) router.push('/checkout');
}
</script>

<template>
  <section class="cart">
    <header class="cart__header">
      <h1>购物车</h1>
      <span>{{ shop.cartCount }} 件商品</span>
    </header>

    <section v-if="shop.cartItems.length === 0" class="cart__empty">
      <h2>购物车还是空的</h2>
      <p>去首页看看正在拼的低价好货。</p>
      <RouterLink class="primary-button" to="/">去逛逛</RouterLink>
    </section>

    <section v-else class="cart__list">
      <article v-for="item in shop.cartItems" :key="`${item.productId}-${item.spec}`" class="cart__item">
        <input
          type="checkbox"
          :checked="item.selected"
          @change="shop.setCartSelected(item.productId, item.spec, $event.target.checked)"
        />
        <div class="cart__image" :style="{ background: item.product.image }"></div>
        <div class="cart__info">
          <h2>{{ item.product.title }}</h2>
          <p>{{ item.spec }}</p>
          <strong class="price">￥{{ item.product.price.toFixed(1) }}</strong>
          <div class="cart__actions">
            <QuantityStepper
              :model-value="item.quantity"
              :max="item.product.stock"
              @update:model-value="shop.setCartQuantity(item.productId, item.spec, $event)"
            />
            <button type="button" @click="shop.removeCartItem(item.productId, item.spec)">删除</button>
          </div>
        </div>
      </article>
    </section>

    <footer v-if="shop.cartItems.length" class="cart__bar">
      <label>
        <input type="checkbox" :checked="shop.allSelected" @change="shop.setAllCartSelected($event.target.checked)" />
        全选
      </label>
      <div>
        <span>合计</span>
        <strong class="price">￥{{ selectedTotal }}</strong>
      </div>
      <button type="button" class="primary-button" :disabled="shop.selectedCartItems.length === 0" @click="checkout">
        去结算
      </button>
    </footer>
  </section>
</template>

<style scoped>
.cart {
  background: var(--bg);
}

.cart__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 14px;
  background: #fff;
}

.cart__header h1 {
  margin: 0;
  font-size: 22px;
}

.cart__header span {
  color: var(--muted);
  font-size: 13px;
}

.cart__empty {
  display: grid;
  place-items: center;
  gap: 10px;
  min-height: 62vh;
  padding: 24px;
  text-align: center;
}

.cart__empty h2,
.cart__empty p {
  margin: 0;
}

.cart__empty a {
  display: grid;
  width: 160px;
  place-items: center;
}

.cart__list {
  display: grid;
  gap: 10px;
  padding: 10px;
  padding-bottom: 86px;
}

.cart__item {
  display: grid;
  grid-template-columns: 24px 86px 1fr;
  gap: 10px;
  align-items: center;
  padding: 10px;
  border-radius: 12px;
  background: #fff;
}

.cart__image {
  width: 86px;
  height: 86px;
  border-radius: 10px;
}

.cart__info h2 {
  margin: 0;
  font-size: 14px;
  line-height: 1.35;
}

.cart__info p {
  margin: 5px 0;
  color: var(--muted);
  font-size: 12px;
}

.cart__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 7px;
}

.cart__actions > button {
  background: transparent;
  color: #999;
  font-size: 12px;
}

.cart__bar {
  position: fixed;
  left: 50%;
  bottom: 64px;
  display: grid;
  grid-template-columns: 74px 1fr 112px;
  gap: 8px;
  align-items: center;
  width: min(100vw, 430px);
  padding: 10px;
  transform: translateX(-50%);
  border-top: 1px solid var(--line);
  background: #fff;
}

.cart__bar label {
  font-size: 13px;
}

.cart__bar div {
  text-align: right;
}

.cart__bar span {
  margin-right: 4px;
  font-size: 12px;
}

.cart__bar button:disabled {
  opacity: 0.45;
}
```

- [ ] **Step 2: Create `src/views/CheckoutView.vue`**

```vue
<script setup>
import { useRouter } from 'vue-router';
import { useShopStore } from '../stores/shop';

const router = useRouter();
const shop = useShopStore();

function submit() {
  const order = shop.submitOrder();
  if (order) router.push('/success');
}
</script>

<template>
  <section class="checkout">
    <header class="checkout__header">
      <button type="button" @click="router.back()">‹</button>
      <h1>确认订单</h1>
    </header>

    <section v-if="shop.activeCheckoutItems.length === 0" class="checkout__empty">
      <h2>暂无待结算商品</h2>
      <p>请从首页、活动页或购物车选择商品。</p>
      <RouterLink class="primary-button" to="/">返回首页</RouterLink>
    </section>

    <template v-else>
      <section class="checkout__address">
        <strong>{{ shop.address.name }} {{ shop.address.phone }}</strong>
        <p>{{ shop.address.detail }}</p>
      </section>

      <section class="checkout__items">
        <article v-for="item in shop.activeCheckoutItems" :key="`${item.productId}-${item.spec}`">
          <div :style="{ background: item.product.image }"></div>
          <div>
            <h2>{{ item.product.title }}</h2>
            <p>{{ item.spec }} × {{ item.quantity }}</p>
          </div>
          <strong>￥{{ (item.product.price * item.quantity).toFixed(2) }}</strong>
        </article>
      </section>

      <section class="checkout__summary">
        <div><span>商品金额</span><strong>￥{{ shop.checkoutSubtotal.toFixed(2) }}</strong></div>
        <div><span>活动优惠</span><strong>-￥{{ shop.checkoutDiscount.toFixed(2) }}</strong></div>
        <div><span>配送费</span><strong>￥{{ shop.checkoutShipping.toFixed(2) }}</strong></div>
        <div class="checkout__total"><span>实付款</span><strong class="price">￥{{ shop.checkoutTotal.toFixed(2) }}</strong></div>
      </section>

      <footer class="checkout__bar">
        <div>
          <span>合计</span>
          <strong class="price">￥{{ shop.checkoutTotal.toFixed(2) }}</strong>
        </div>
        <button type="button" class="primary-button" @click="submit">提交订单</button>
      </footer>
    </template>
  </section>
</template>

<style scoped>
.checkout {
  min-height: 100vh;
  padding-bottom: 78px;
  background: var(--bg);
}

.checkout__header {
  position: sticky;
  top: 0;
  z-index: 5;
  display: grid;
  grid-template-columns: 42px 1fr 42px;
  align-items: center;
  padding: 10px;
  background: #fff;
}

.checkout__header button {
  background: transparent;
  font-size: 30px;
}

.checkout__header h1 {
  margin: 0;
  text-align: center;
  font-size: 18px;
}

.checkout__empty {
  display: grid;
  place-items: center;
  gap: 10px;
  min-height: 64vh;
  padding: 24px;
  text-align: center;
}

.checkout__empty a {
  display: grid;
  width: 160px;
  place-items: center;
}

.checkout__address,
.checkout__items,
.checkout__summary {
  margin: 10px;
  padding: 14px;
  border-radius: 12px;
  background: #fff;
}

.checkout__address p {
  margin: 6px 0 0;
  color: var(--muted);
  font-size: 13px;
}

.checkout__items {
  display: grid;
  gap: 12px;
}

.checkout__items article {
  display: grid;
  grid-template-columns: 72px 1fr auto;
  gap: 10px;
  align-items: center;
}

.checkout__items article > div:first-child {
  width: 72px;
  height: 72px;
  border-radius: 10px;
}

.checkout__items h2 {
  margin: 0;
  font-size: 14px;
}

.checkout__items p {
  margin: 6px 0 0;
  color: var(--muted);
  font-size: 12px;
}

.checkout__items strong {
  color: var(--red);
  font-size: 14px;
}

.checkout__summary {
  display: grid;
  gap: 10px;
}

.checkout__summary div {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.checkout__total {
  padding-top: 10px;
  border-top: 1px solid var(--line);
}

.checkout__bar {
  position: fixed;
  left: 50%;
  bottom: 0;
  display: grid;
  grid-template-columns: 1fr 140px;
  gap: 10px;
  align-items: center;
  width: min(100vw, 430px);
  padding: 10px;
  transform: translateX(-50%);
  border-top: 1px solid var(--line);
  background: #fff;
}

.checkout__bar span {
  margin-right: 4px;
  font-size: 12px;
}
```

- [ ] **Step 3: Create `src/views/SuccessView.vue`**

```vue
<script setup>
import { computed } from 'vue';
import { useShopStore } from '../stores/shop';

const shop = useShopStore();
const order = computed(() => shop.latestOrder);
</script>

<template>
  <section class="success">
    <div class="success__mark">✓</div>
    <template v-if="order">
      <h1>拼单成功</h1>
      <p>订单号 {{ order.orderNo }}</p>
      <strong class="price">￥{{ order.total.toFixed(2) }}</strong>
    </template>
    <template v-else>
      <h1>暂无订单</h1>
      <p>完成下单后会在这里看到订单结果。</p>
    </template>
    <div class="success__actions">
      <RouterLink class="primary-button" to="/">返回首页</RouterLink>
      <RouterLink class="ghost-button" to="/cart">查看购物车</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.success {
  display: grid;
  place-items: center;
  align-content: center;
  gap: 12px;
  min-height: 100vh;
  padding: 24px;
  background: linear-gradient(180deg, #fff3ef, #f5f5f5);
  text-align: center;
}

.success__mark {
  display: grid;
  width: 76px;
  height: 76px;
  place-items: center;
  border-radius: 50%;
  background: var(--red);
  color: #fff;
  font-size: 42px;
  font-weight: 900;
}

.success h1,
.success p {
  margin: 0;
}

.success .price {
  font-size: 28px;
}

.success__actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: 100%;
  margin-top: 16px;
}

.success__actions a {
  display: grid;
  place-items: center;
}
```

- [ ] **Step 4: Commit checkout flow pages**

```bash
git add src/views/CartView.vue src/views/CheckoutView.vue src/views/SuccessView.vue
git commit -m "feat: complete cart checkout flow"
```

## Task 7: Build Verification And Browser Check

**Files:**
- Modify if needed after verification: any source file with a concrete defect found by the commands below.

- [ ] **Step 1: Run production build**

Run: `npm run build`

Expected: Vite build completes successfully and prints a generated `dist/` output summary.

- [ ] **Step 2: Fix build errors if any**

If `npm run build` fails, fix the exact file and line reported by Vite, then re-run `npm run build` until it passes.

- [ ] **Step 3: Start dev server**

Run: `npm run dev -- --port 5173`

Expected: Vite serves the app on `http://127.0.0.1:5173/`.

- [ ] **Step 4: Manual browser flow check**

Open `http://127.0.0.1:5173/` and verify:

- Home page loads with red search header, channel grid, flash sale, and two-column product feed.
- Tap a product, select a spec, tap `加入购物车`, then open cart and see the item.
- Change quantity in cart and verify total changes.
- Tap `去结算`, then `提交订单`, and verify success page shows an order number and total.
- Open `/campaign`, tap `立即拼单`, submit checkout, and verify success page.
- Open `/cart` after the order and verify purchased items were removed from cart.

- [ ] **Step 5: Commit verification fixes**

If verification required source changes:

```bash
git add src package.json package-lock.json
git commit -m "fix: resolve commerce flow verification issues"
```

If verification required no source changes, do not create an empty commit.
