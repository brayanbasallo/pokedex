<script lang="ts" setup>
import { ref } from 'vue'

import { usePokedexStore } from '@/stores/pokedex'

import favorite from './favorite.vue'

type Pokemon = {
  name: string
  url: string
  favorite?: boolean
}

defineProps<{
  pokem?: Pokemon
}>()

const pokedexStore = usePokedexStore()
</script>

<template>
  <div
    class="bg-white p-4 rounded-md w-full flex items-center justify-between cursor-pointer hover:shadow transition-shadow text-cgray-900"
    @click="pokedexStore.fetchPokemonDetail(pokem?.name || '')"
  >
    <p>
      {{ pokem?.name }}
    </p>
    <favorite :pokem="pokem" />
  </div>
</template>
