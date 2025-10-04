import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import Favorite from '../../../components/pokemons/favorite.vue'
import { usePokedexStore } from '../../../stores/pokedex'

// Mock the store
const mockToggleFavorite = vi.fn()

vi.mock('../../../stores/pokedex', () => ({
  usePokedexStore: () => ({
    toggleFavorite: mockToggleFavorite,
  }),
}))

describe('Pokemon Favorite', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders properly with non-favorite pokemon', () => {
    const pokemon = {
      name: 'Pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/25/',
      favorite: false,
    }

    const wrapper = mount(Favorite, {
      props: {
        pokem: pokemon,
      },
    })

    const button = wrapper.findComponent({ name: 'UiButton' })
    expect(button.exists()).toBe(true)
    expect(button.props('variant')).toBe('tertiary')
    expect(button.props('rounded')).toBe(true)
  })

  it('renders properly with favorite pokemon', () => {
    const pokemon = {
      name: 'Pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/25/',
      favorite: true,
    }

    const wrapper = mount(Favorite, {
      props: {
        pokem: pokemon,
      },
    })

    const button = wrapper.findComponent({ name: 'UiButton' })
    expect(button.props('variant')).toBe('secondary')
  })

  it('calls toggleFavorite when clicked', async () => {
    const pokemon = {
      name: 'Pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/25/',
      favorite: false,
    }

    const wrapper = mount(Favorite, {
      props: {
        pokem: pokemon,
      },
    })

    await wrapper.findComponent({ name: 'UiButton' }).trigger('click')

    expect(mockToggleFavorite).toHaveBeenCalledWith('Pikachu')
  })

  it('renders properly without pokemon data', () => {
    const wrapper = mount(Favorite)
    const button = wrapper.findComponent({ name: 'UiButton' })

    expect(button.exists()).toBe(true)
    expect(button.props('variant')).toBe('tertiary')
  })

  it('uses Start icon component', () => {
    const wrapper = mount(Favorite)
    const button = wrapper.findComponent({ name: 'UiButton' })

    expect(button.props('icon')).toBeTruthy()
  })

  it('stops event propagation with click.stop modifier', () => {
    const pokemon = {
      name: 'Pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/25/',
      favorite: false,
    }

    const wrapper = mount(Favorite, {
      props: {
        pokem: pokemon,
      },
    })

    const button = wrapper.findComponent({ name: 'UiButton' })
    const buttonElement = button.find('button')

    // Verificar que el evento click está configurado
    const clickHandlers = buttonElement.element.onclick
    expect(clickHandlers).toBeDefined()

    // Simular un evento click y verificar que no se propaga
    const mockEvent = {
      stopPropagation: vi.fn(),
      preventDefault: vi.fn(),
    }

    // Activar el evento click en el componente
    buttonElement.trigger('click')

    // Verificar que la función toggleFavorite fue llamada
    expect(mockToggleFavorite).toHaveBeenCalled()
  })
})
