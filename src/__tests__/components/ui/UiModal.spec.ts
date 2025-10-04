import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import UiModal from '../../../components/ui/UiModal.vue'

describe('UiModal', () => {
  beforeEach(() => {
    // Create a spy for document event listeners
    vi.spyOn(document, 'addEventListener')
    vi.spyOn(document, 'removeEventListener')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders properly when open', () => {
    const wrapper = mount(UiModal, {
      props: {
        open: true
      },
      slots: {
        default: 'Modal Content'
      }
    })
    
    expect(wrapper.find('dialog').exists()).toBe(true)
    expect(wrapper.text()).toContain('Modal Content')
  })

  it('does not render dialog when closed', () => {
    const wrapper = mount(UiModal, {
      props: {
        open: false
      }
    })
    
    expect(wrapper.find('dialog').exists()).toBe(false)
  })

  it('emits update:open event when clicking outside', async () => {
    const wrapper = mount(UiModal, {
      props: {
        open: true
      }
    })
    
    await wrapper.find('dialog').trigger('click')
    
    expect(wrapper.emitted('update:open')).toBeTruthy()
    expect(wrapper.emitted('update:open')![0]).toEqual([false])
  })

  it('emits update:open event when clicking close button', async () => {
    const wrapper = mount(UiModal, {
      props: {
        open: true
      }
    })
    
    await wrapper.find('button').trigger('click')
    
    expect(wrapper.emitted('update:open')).toBeTruthy()
    expect(wrapper.emitted('update:open')![0]).toEqual([false])
  })

  it('adds and removes keydown event listener', () => {
    const wrapper = mount(UiModal, {
      props: {
        open: true
      }
    })
    
    expect(document.addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function))
    
    wrapper.unmount()
    
    expect(document.removeEventListener).toHaveBeenCalledWith('keydown', expect.any(Function))
  })

  it('closes on Escape key press', async () => {
    const wrapper = mount(UiModal, {
      props: {
        open: true
      }
    })
    
    // Simulate Escape key press
    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' })
    document.dispatchEvent(escapeEvent)
    
    await wrapper.vm.$nextTick()
    
    expect(wrapper.emitted('update:open')).toBeTruthy()
    expect(wrapper.emitted('update:open')![0]).toEqual([false])
  })

  it('renders trigger slot content', () => {
    const wrapper = mount(UiModal, {
      props: {
        open: false
      },
      slots: {
        trigger: 'Open Modal'
      }
    })
    
    expect(wrapper.text()).toContain('Open Modal')
  })

  it('applies correct styling', () => {
    const wrapper = mount(UiModal, {
      props: {
        open: true
      }
    })
    
    const dialog = wrapper.find('dialog')
    expect(dialog.classes()).toContain('fixed')
    expect(dialog.classes()).toContain('bg-black/50')
    expect(dialog.classes()).toContain('z-50')
    
    const article = wrapper.find('article')
    expect(article.classes()).toContain('bg-white')
    expect(article.classes()).toContain('rounded-md')
    expect(article.classes()).toContain('max-w-lg')
  })
})