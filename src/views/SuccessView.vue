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
</style>
