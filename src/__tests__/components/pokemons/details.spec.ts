import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import Details from '../../../components/pokemons/details.vue'
import { usePokedexStore } from '../../../stores/pokedex'

// Mock the store
const mockClearDetail = vi.fn()

vi.mock('../../../stores/pokedex', () => ({
  usePokedexStore: () => ({
    detailPokemon: {
      name: 'Pikachu',
      weight: 60,
      height: 4,
      types: [{ type: { name: 'electric' } }],
      sprites: {
        other: {
          'official-artwork': {
            front_default: 'pikachu.png'
          }
        }
      }
    },
    listPokemons: [
      { name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }
    ],
    clearDetail: mockClearDetail
  })
}))

describe('Pokemon Details', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders properly with pokemon details', () => {
    const wrapper = mount(Details)
    
    // Check if all characteristics are rendered
    expect(wrapper.text()).toContain('Name:')
    expect(wrapper.text()).toContain('Pikachu')
    expect(wrapper.text()).toContain('Weight:')
    expect(wrapper.text()).toContain('60')
    expect(wrapper.text()).toContain('Height:')
    expect(wrapper.text()).toContain('4')
    expect(wrapper.text()).toContain('Types:')
    expect(wrapper.text()).toContain('electric')
  })

  it('displays pokemon image', () => {
    const wrapper = mount(Details)
    const img = wrapper.find('img')
    
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('pikachu.png')
    expect(img.attributes('alt')).toBe('Pikachu')
  })

  it('calls clearDetail when modal is closed', async () => {
    const wrapper = mount(Details)
    const modal = wrapper.findComponent({ name: 'UiModal' })
    
    await modal.vm.$emit('update:open', false)
    
    expect(mockClearDetail).toHaveBeenCalled()
  })

  it('renders share component', () => {
    const wrapper = mount(Details)
    expect(wrapper.findComponent({ name: 'Share' }).exists()).toBe(true)
  })

  it('renders favorite component', () => {
    const wrapper = mount(Details)
    expect(wrapper.findComponent({ name: 'favorite' }).exists()).toBe(true)
  })

  it('displays modal when detailPokemon exists', () => {
    const wrapper = mount(Details)
    const modal = wrapper.findComponent({ name: 'UiModal' })
    expect(modal.props('open')).toBe(true)
  })

  it('has correct styling classes', () => {
    const wrapper = mount(Details)
    
    // Check background image container
    expect(wrapper.find('.bg-image').exists()).toBe(true)
    
    // Check characteristics container styling
    const charContainer = wrapper.find('section')
    expect(charContainer.classes()).toContain('py-5')
    expect(charContainer.classes()).toContain('px-8')
    expect(charContainer.classes()).toContain('flex')
    
    // Check characteristic item styling
    const charItem = wrapper.find('p')
    expect(charItem.classes()).toContain('p-2')
    expect(charItem.classes()).toContain('border-b')
    expect(charItem.classes()).toContain('text-cgray-600')
  })
})