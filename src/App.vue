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
