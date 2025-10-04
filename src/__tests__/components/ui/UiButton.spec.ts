import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiButton from '../../../components/ui/UiButton.vue'
import HomeIcon from '../../../components/icons/home.vue'

describe('UiButton', () => {
  it('renders properly with default props', () => {
    const wrapper = mount(UiButton, {
      slots: {
        default: 'Click me',
      },
    })
    expect(wrapper.text()).toBe('Click me')
    expect(wrapper.classes()).toContain('bg-primary')
  })

  it('renders with different variants', () => {
    const variants = ['primary', 'secondary', 'tertiary', 'cuarter'] as const
    variants.forEach((variant) => {
      const wrapper = mount(UiButton, {
        props: { variant },
        slots: { default: 'Button' },
      })

      if (variant === 'primary') {
        expect(wrapper.classes()).toContain('bg-primary')
      } else if (variant === 'secondary') {
        expect(wrapper.classes()).toContain('bg-cgray-300')
      } else if (variant === 'tertiary') {
        expect(wrapper.classes()).toContain('bg-cgray-300')
      } else if (variant === 'cuarter') {
        expect(wrapper.classes()).toContain('bg-cgray-500')
      }
    })
  })

  it('renders with icon', () => {
    const wrapper = mount(UiButton, {
      props: {
        icon: HomeIcon,
      },
      slots: {
        default: 'Home',
      },
    })

    expect(wrapper.findComponent(HomeIcon).exists()).toBe(true)
    expect(wrapper.text()).toBe('Home')
  })

  it('applies rounded style when rounded prop is true', () => {
    const wrapper = mount(UiButton, {
      props: {
        rounded: true,
      },
    })

    expect(wrapper.classes()).toContain('rounded-full')
    expect(wrapper.attributes('class')).toContain('w-11')
    expect(wrapper.attributes('class')).toContain('h-11')
  })

  it('disables the button when disabled prop is true', () => {
    const wrapper = mount(UiButton, {
      props: {
        disabled: true,
      },
    })

    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.classes()).toContain('disabled:bg-stone-400')
    expect(wrapper.classes()).toContain('disabled:cursor-not-allowed')
  })
})
