import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getPokedex, getPokemonDetail, searchPokemon } from '@/api/pokemonApi'
import type { BasePokemon } from '@/api/pokemonApi'
import type { Pokemon } from '@/types/pokemon'

export const usePokedexStore = defineStore('pokedex', () => {
  const pokedex = ref<BasePokemon[]>([])
  const detailPokemon = ref<Pokemon | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const listAll = ref<boolean>(true)
  const nextUrl = ref<string | null>(null)
  const searchTerm = ref<string>('')
  const isSearching = ref<boolean>(false)
  
  // Cache para almacenar los detalles de Pokémon ya cargados
  const pokemonDetailsCache = ref<Map<string, Pokemon>>(new Map())

  const listPokemons = computed(() => {
    let filteredPokemons = pokedex.value
    
    // Aplicar filtro de búsqueda si estamos buscando
    if (isSearching.value && searchTerm.value) {
      filteredPokemons = filteredPokemons.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchTerm.value.toLowerCase())
      )
    }
    
    // Aplicar filtro de favoritos si es necesario
    if (!listAll.value) {
      filteredPokemons = filteredPokemons.filter((pokemon) => pokemon.favorite)
    }
    
    return filteredPokemons
  })

  const favoritePokemons = computed(() =>
    pokedex.value.filter((pokemon) => pokemon.favorite)
  )

  function toggleFavorite(name: string) {
    const pokemon = pokedex.value.find(p => p.name === name)
    if (pokemon) {
      pokemon.favorite = !pokemon.favorite
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
        // Solo agregar Pokémon que no existen ya en la lista para evitar duplicados
        const existingNames = new Set(pokedex.value.map(p => p.name))
        const newPokemons = response.results
          .filter(p => !existingNames.has(p.name))
          .map(pokemon => ({ ...pokemon, favorite: pokemon.favorite || false }))
        pokedex.value = [...pokedex.value, ...newPokemons]
      } else {
        // Si no es loadMore, reemplazar completamente la lista
        pokedex.value = response.results.map(pokemon => ({ ...pokemon, favorite: pokemon.favorite || false }))
      }
    } catch (err: any) {
      error.value = err.message || 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  async function searchPokemons(term: string) {
    searchTerm.value = term
    error.value = null
    
    // Si no hay término de búsqueda, limpiar el estado de búsqueda
    if (!term) {
      isSearching.value = false
      loading.value = false
      return
    }
    
    // Establecer estado de búsqueda activa
    isSearching.value = true
    
    loading.value = true
    
    try {
      // Primero filtrar localmente en los Pokémon que ya tenemos
      const localMatches = pokedex.value.filter(pokemon => 
        pokemon.name.toLowerCase().includes(term.toLowerCase())
      )
      
      // Si encontramos coincidencias locales, no hacer llamada a la API
      if (localMatches.length > 0) {
        loading.value = false
        return
      }
      
      // Si no hay coincidencias locales, buscar en la API
      const apiResults = await searchPokemon(term)
      
      if (apiResults.length > 0) {
        // Solo agregar Pokémon que no están ya en la lista
        const existingNames = new Set(pokedex.value.map(p => p.name))
        const newPokemons = apiResults
          .filter(p => !existingNames.has(p.name))
          .map(pokemon => ({ ...pokemon, favorite: pokemon.favorite || false }))
        
        if (newPokemons.length > 0) {
          pokedex.value = [...pokedex.value, ...newPokemons]
        }
      }
      
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
      // Verificar si el Pokémon ya está en el cache
      const cachedPokemon = pokemonDetailsCache.value.get(name.toLowerCase())
      if (cachedPokemon) {
        detailPokemon.value = cachedPokemon
        loading.value = false
        return
      }
      
      // Si no está en cache, hacer la llamada a la API
      const pokemonData = await getPokemonDetail(name)
      // Guardar en cache para futuras consultas
      pokemonDetailsCache.value.set(name.toLowerCase(), pokemonData)
      detailPokemon.value = pokemonData
    } catch (err: any) {
      error.value = err.message || 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  function setListAll(value: boolean) {
    listAll.value = value
  }

  // Función para limpiar el cache si es necesario
  function clearCache() {
    pokemonDetailsCache.value.clear()
  }

  // Función para obtener el tamaño del cache (útil para debugging)
  function getCacheSize() {
    return pokemonDetailsCache.value.size
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
    searchTerm,
    isSearching,
    pokemonDetailsCache,
    fetchPokedex,
    toggleFavorite,
    fetchPokemonDetail,
    clearDetail,
    searchPokemons,
    setListAll,
    clearCache,
    getCacheSize,
  }
})
