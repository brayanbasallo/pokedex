<script setup lang="ts">
import { ref } from 'vue'

import UiInput from '@/components/ui/UiInput.vue'
import Search from '@/components/icons/search.vue'
import BackToHome from '@/components/searcher/backToHome.vue'

const searchTerm = ref('')
</script>

<template>
  <main class="max-w-md m-auto pt-20 px-6 flex flex-col items-center gap-12 min-h-screen">
    <UiInput v-model="searchTerm" :icon="Search" placeholder="Search" />

    <BackToHome />
  </main>
</template>
