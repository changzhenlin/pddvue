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
</style>
