import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getPokedex, getPokemonDetail, searchPokemon } from '@/api/pokemonApi'
import type { BasePokemon } from '@/api/pokemonApi'
import type { Pokemon } from '@/types/pokemon'

export const usePokedexStore = defineStore('pokedex', () => {
  const pokedex = ref<BasePokemon[]>([])
  const favorities = ref<string[]>([])
  const detailPokemon = ref<Pokemon | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const listAll = ref<boolean>(true)
  const nextUrl = ref<string | null>(null)

  const listPokemons = computed(() => {
    const allPokemons = pokedex.value.map((pokemon) => ({
      ...pokemon,
      favorite: favorities.value.includes(pokemon.name),
    }))
    return listAll.value ? allPokemons : allPokemons.filter((pokemon) => pokemon.favorite)
  })

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

  async function fetchPokedex(loadMore = false) {
    loading.value = true
    error.value = null
    try {
      const response = await getPokedex(nextUrl.value || '')
      nextUrl.value = response.next
      if (loadMore) {
        pokedex.value = [...pokedex.value, ...response.results]
      } else {
        pokedex.value = response.results
      }
    } catch (err: any) {
      error.value = err.message || 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  async function searchPokemons(term: string) {
    if (!term) {
      await fetchPokedex()
      return
    }
    loading.value = true
    error.value = null
    try {
      pokedex.value = await searchPokemon(term)
      nextUrl.value = null
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

  function setListAll(value: boolean) {
    listAll.value = value
  }

  return {
    pokedex,
    loading,
    error,
    favoritePokemons,
    listPokemons,
    detailPokemon,
    listAll,
    nextUrl,
    fetchPokedex,
    toggleFavorite,
    fetchPokemonDetail,
    clearDetail,
    searchPokemons,
    setListAll,
  }
})
