import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getPokedex, getPokemonDetail } from '@/api/pokemonApi'
import type { BasePokemon } from '@/api/pokemonApi'
import type { Pokemon } from '@/types/pokemon'

export const usePokedexStore = defineStore('pokedex', () => {
  const pokedex = ref<BasePokemon[]>([])
  const favorities = ref<string[]>([])
  const detailPokemon = ref<Pokemon | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const listPokemons = computed(() =>
    pokedex.value.map((pokemon) => ({
      ...pokemon,
      favorite: favorities.value.includes(pokemon.name),
    })),
  )

  const favoritePokemons = computed(() =>
    pokedex.value.filter((pokemon) => favorities.value.includes(pokemon.name)),
  )

  function toggleFavorite(name: string) {
    const index = favorities.value.indexOf(name)
    if (index === -1) {
      favorities.value.push(name)
    } else {
      favorities.value.splice(index, 1)
    }
  }

  function clearDetail() {
    detailPokemon.value = null
  }

  async function fetchPokedex() {
    loading.value = true
    error.value = null
    try {
      pokedex.value = await getPokedex()
    } catch (err: any) {
      error.value = err.message || 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  async function fetchPokemonDetail(name: string) {
    loading.value = true
    error.value = null
    try {
      detailPokemon.value = await getPokemonDetail(name)
    } catch (err: any) {
      error.value = err.message || 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  return {
    pokedex,
    loading,
    error,
    favoritePokemons,
    listPokemons,
    detailPokemon,
    fetchPokedex,
    toggleFavorite,
    fetchPokemonDetail,
    clearDetail,
  }
})
