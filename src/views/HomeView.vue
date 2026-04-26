<script setup>
import ProductCard from '../components/ProductCard.vue';
import { channels, products } from '../data/mock';

defineOptions({ name: 'HomeView' });

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
        <RouterLink
          v-for="product in flashProducts"
          :key="product.id"
          :to="`/product/${product.id}`"
          class="home__flash-item"
        >
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
</style>
