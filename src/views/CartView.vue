<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import QuantityStepper from '../components/QuantityStepper.vue';
import { useShopStore } from '../stores/shop';

defineOptions({ name: 'CartView' });

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
          aria-label="选择商品"
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
  min-height: 100vh;
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
  padding: 10px 10px 86px;
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
  bottom: 64px;
  left: 50%;
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
</style>
