import { describe, it, expect, vi, beforeEach } from 'vitest'
import { usePokedexStore } from '../../../stores/pokedex'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import Card from '../../../components/pokemons/card.vue'

// Mock the store
const mockFetchPokemonDetail = vi.fn()

vi.mock('../../../stores/pokedex', () => ({
  usePokedexStore: () => ({
    fetchPokemonDetail: mockFetchPokemonDetail
  })
}))

describe('Pokemon Card', () => {
  beforeEach(() => {
    // Create a fresh Pinia instance for each test
    setActivePinia(createPinia())
  })

  it('renders properly with pokemon data', () => {
    const pokemon = {
      name: 'Pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/25/'
    }

    const wrapper = mount(Card, {
      props: {
        pokem: pokemon
      }
    })
    
    expect(wrapper.text()).toContain('Pikachu')
  })

  it('renders without pokemon data', () => {
    const wrapper = mount(Card)
    expect(wrapper.exists()).toBe(true)
  })

  it('has correct base styling', () => {
    const wrapper = mount(Card)
    const card = wrapper.find('div')
    
    expect(card.classes()).toContain('bg-white')
    expect(card.classes()).toContain('rounded-md')
    expect(card.classes()).toContain('cursor-pointer')
    expect(card.classes()).toContain('hover:shadow')
  })

  it('triggers fetchPokemonDetail when clicked', async () => {
    const pokemon = {
      name: 'Pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/25/'
    }

    const wrapper = mount(Card, {
      props: {
        pokem: pokemon
      }
    })
    
    await wrapper.trigger('click')
    
    // Verify that the store's fetchPokemonDetail method was called
    expect(mockFetchPokemonDetail).toHaveBeenCalledWith('Pikachu')
  })

  it('renders favorite component', () => {
    const pokemon = {
      name: 'Pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/25/'
    }

    const wrapper = mount(Card, {
      props: {
        pokem: pokemon
      }
    })
    
    expect(wrapper.findComponent({ name: 'favorite' }).exists()).toBe(true)
  })
})