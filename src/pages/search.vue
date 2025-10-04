<script setup lang="ts">
import { ref } from 'vue'

const debounce = (fn: Function, delay: number) => {
  let timeoutId: number
  return (...args: any[]) => {
    clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => fn(...args), delay)
  }
}

import { usePokedexStore } from '@/stores/pokedex'
import UiInput from '@/components/ui/UiInput.vue'
import UiButton from '@/components/ui/UiButton.vue'
import Search from '@/components/icons/search.vue'
import BackToHome from '@/components/searcher/backToHome.vue'
import Card from '@/components/pokemons/card.vue'
import Details from '@/components/pokemons/details.vue'
import loading from '@/components/common/loading.vue'
import navigation from '@/components/common/navigation.vue'

const pokedexStore = usePokedexStore()
pokedexStore.fetchPokedex()
const searchTerm = ref('')

const handleSearch = debounce(async (event: Event) => {
  const term = (event.target as HTMLInputElement).value
  await pokedexStore.searchPokemons(term)
}, 300)
</script>

<template>
  <main class="max-w-xl m-auto py-9 px-7 flex flex-col items-center gap-12 min-h-screen">
    <UiInput
      v-model="searchTerm"
      :icon="Search"
      placeholder="Search"
      class="w-full"
      @input="handleSearch"
    />
    <Details />
    <div class="flex flex-col gap-4 w-full">
      <Card v-for="pokem in pokedexStore.listPokemons" :key="pokem.name" :pokem="pokem" />
    </div>
    <BackToHome v-if="pokedexStore.listPokemons.length === 0 && !pokedexStore.loading" />
    <loading v-else-if="pokedexStore.loading" />
    <UiButton
      v-if="pokedexStore.nextUrl && !searchTerm && !pokedexStore.loading && pokedexStore.listAll"
      @click="pokedexStore.fetchPokedex(true)"
      class="mt-4"
    >
      Load More
    </UiButton>
  </main>
  <navigation />
</template>
