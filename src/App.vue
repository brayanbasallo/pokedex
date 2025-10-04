<template>
  <div class="app h-screen">
    <router-view />
    <navigation v-if="$route.path !== '/'" />
  </div>
</template>

<script setup lang="ts">
import navigation from '@/components/common/navigation.vue'
</script>
