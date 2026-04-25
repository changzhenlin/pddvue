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
</style>
