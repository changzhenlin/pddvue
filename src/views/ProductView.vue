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
      <button type="button" aria-label="返回" @click="router.back()">‹</button>
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
  top: 12px;
  left: 12px;
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

.detail__price-row span {
  color: var(--muted);
  font-size: 12px;
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
  bottom: 0;
  left: 50%;
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
  bottom: 82px;
  left: 50%;
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
</style>
