<script lang="ts" setup>
import { useRouter } from 'vue-router'

import UiButton from '@/components/ui/UiButton.vue'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>
<template>
  <article class="flex flex-col gap-6 items-center text-center">
    <h1 class="font-bold text-4xl">Uh-Oh!</h1>
    <p>You look lost on your journey!</p>
    <UiButton @click="goHome" variant="primary" class="w-fit"> Back to home </UiButton>
  </article>
</template>
