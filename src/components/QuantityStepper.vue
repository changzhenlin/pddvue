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
</style>
