import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiInput from '../../../components/ui/UiInput.vue'
import SearchIcon from '../../../components/icons/search.vue'

describe('UiInput', () => {
  it('renders properly with default props', () => {
    const wrapper = mount(UiInput, {
      props: {
        modelValue: '',
      },
    })

    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('renders with placeholder', () => {
    const placeholder = 'Enter text...'
    const wrapper = mount(UiInput, {
      props: {
        modelValue: '',
        placeholder,
      },
    })

    expect(wrapper.find('input').attributes('placeholder')).toBe(placeholder)
  })

  it('renders with icon', () => {
    const wrapper = mount(UiInput, {
      props: {
        modelValue: '',
        icon: SearchIcon,
      },
    })

    expect(wrapper.findComponent(SearchIcon).exists()).toBe(true)
    expect(wrapper.findComponent(SearchIcon).classes()).toContain('text-cgray-500')
  })

  it('emits update:modelValue event on input', async () => {
    const wrapper = mount(UiInput, {
      props: {
        modelValue: '',
      },
    })

    const input = wrapper.find('input')
    await input.setValue('test value')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['test value'])
  })

  it('binds the type attribute correctly', () => {
    const wrapper = mount(UiInput, {
      props: {
        modelValue: '',
        type: 'password',
      },
    })

    expect(wrapper.find('input').attributes('type')).toBe('password')
  })

  it('applies correct base styling', () => {
    const wrapper = mount(UiInput, {
      props: {
        modelValue: '',
      },
    })

    const container = wrapper.find('div')
    expect(container.classes()).toContain('bg-white')
    expect(container.classes()).toContain('rounded-md')
    expect(container.classes()).toContain('flex')

    const input = wrapper.find('input')
    expect(input.classes()).toContain('w-full')
    expect(input.classes()).toContain('outline-none')
  })
})
