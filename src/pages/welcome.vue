<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

import UiButton from '@/components/ui/UiButton.vue'

const toSearch = () => {
  router.push('/search')
}
</script>

<template>
  <main class="max-w-md m-auto px-6 flex flex-col items-center gap-12 min-h-full justify-center">
    <img src="/imgs/pikachu.webp" alt="Pikachu saludando" class="w-48 mx-auto" />
    <article class="flex flex-col gap-7">
      <h1 class="font-bold text-2xl text-center">Welcome to Pokédex</h1>
      <p class="text-center">
        The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the
        Pokémon world.
      </p>
    </article>
    <UiButton @click="toSearch" variant="primary" class="w-fit"> Get started </UiButton>
  </main>
</template>
