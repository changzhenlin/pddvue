<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppTabbar from './components/AppTabbar.vue';

const route = useRoute();
const tabbarRoutes = ['home', 'campaign', 'cart'];
const showTabbar = computed(() => tabbarRoutes.includes(route.name));
const cachedViews = ['HomeView', 'CampaignView', 'CartView'];
</script>

<template>
  <main class="phone-shell">
    <RouterView v-slot="{ Component }">
      <Transition name="page-fade" mode="out-in">
        <KeepAlive :include="cachedViews">
          <component :is="Component" :class="['page', { 'no-tabbar': !showTabbar }]" />
        </KeepAlive>
      </Transition>
    </RouterView>
    <AppTabbar v-if="showTabbar" />
  </main>
</template>
