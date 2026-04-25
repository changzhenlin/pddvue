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
      <button type="button" aria-label="返回" @click="router.back()">‹</button>
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
        <div class="checkout__total">
          <span>实付款</span>
          <strong class="price">￥{{ shop.checkoutTotal.toFixed(2) }}</strong>
        </div>
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

.checkout__empty h2,
.checkout__empty p {
  margin: 0;
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
  bottom: 0;
  left: 50%;
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
</style>
