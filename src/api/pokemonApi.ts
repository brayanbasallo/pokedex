import type { Pokemon } from '@/types/pokemon'

const BASE_URL = 'https://pokeapi.co/api/v2'

export type BasePokemon = {
  name: string
  url: string
  favorite?: boolean
}

type PokedexResponse = {
  count: number
  next: string | null
  previous: string | null
  results: BasePokemon[]
}

export async function getPokedex(url: string = ''): Promise<PokedexResponse> {
  let getUrl = `${BASE_URL}/pokemon?limit=20&offset=0`
  if (url) {
    getUrl = url
  }
  const response = await fetch(getUrl)
  if (!response.ok) {
    throw new Error('Failed to fetch pokedex')
  }
  const data: PokedexResponse = await response.json()
  return data
}

export async function getPokemonDetail(name: string): Promise<Pokemon> {
  const response = await fetch(`${BASE_URL}/pokemon/${name}`)
  if (!response.ok) {
    throw new Error('Failed to fetch pokemon detail')
  }
  const data: Pokemon = await response.json()
  return data
}

export async function searchPokemon(term: string): Promise<BasePokemon[]> {
  if (!term) return []
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${term.toLowerCase()}`)
    if (!response.ok) {
      return []
    }
    const data: Pokemon = await response.json()
    return [
      {
        name: data.name,
        url: `${BASE_URL}/pokemon/${data.name}`,
      },
    ]
  } catch {
    return []
  }
}
