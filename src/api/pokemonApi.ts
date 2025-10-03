import type { Pokemon } from '@/types/pokemon'

const BASE_URL = 'https://pokeapi.co/api/v2'

export type BasePokemon = {
  name: string
  url: string
  favorite?: boolean
}

type PokedexResponse = {
  results: BasePokemon[]
}

export async function getPokedex(): Promise<BasePokemon[]> {
  const response = await fetch(`${BASE_URL}/pokemon?limit=151`)
  if (!response.ok) {
    throw new Error('Failed to fetch pokedex')
  }
  const data: PokedexResponse = await response.json()
  return data.results
}

export async function getPokemonDetail(name: string): Promise<Pokemon> {
  const response = await fetch(`${BASE_URL}/pokemon/${name}`)
  if (!response.ok) {
    throw new Error('Failed to fetch pokemon detail')
  }
  const data: Pokemon = await response.json()
  return data
}