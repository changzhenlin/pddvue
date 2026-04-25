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
</style>
