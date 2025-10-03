<script setup lang="ts">
import { ref } from 'vue'

import { usePokedexStore } from '@/stores/pokedex'
import UiInput from '@/components/ui/UiInput.vue'
import Search from '@/components/icons/search.vue'
import BackToHome from '@/components/searcher/backToHome.vue'
import Card from '@/components/pokemons/card.vue'
import Details from '@/components/pokemons/details.vue'
import loading from '@/components/common/loading.vue'
import navigation from '@/components/common/navigation.vue'

const pokedexStore = usePokedexStore()
pokedexStore.fetchPokedex()
const searchTerm = ref('')

async function handleSearch(event: Event) {
  const term = (event.target as HTMLInputElement).value
  await pokedexStore.searchPokemons(term)
}
</script>

<template>
  <main class="max-w-xl m-auto pt-20 px-6 flex flex-col items-center gap-12 min-h-screen">
    <UiInput v-model="searchTerm" :icon="Search" placeholder="Search" class="w-full" @input="handleSearch" />
    <Details />
    <div class="flex flex-col gap-4 w-full">
      <Card v-for="pokem in pokedexStore.listPokemons" :key="pokem.name" :pokem="pokem" />
    </div>
    <BackToHome v-if="pokedexStore.listPokemons.length === 0 && !pokedexStore.loading" />
    <loading v-else-if="pokedexStore.loading" />
    <navigation />
  </main>
</template>
