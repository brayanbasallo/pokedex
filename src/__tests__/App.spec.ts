import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import Welcome from '../pages/welcome.vue'

// Create a mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Welcome,
    },
  ],
})

// Mock the Welcome component
vi.mock('../pages/welcome.vue', () => ({
  default: {
    name: 'Welcome',
    template: '<div>Welcome to Pokemon App</div>',
  },
}))

describe('App', () => {
  it('renders router view properly', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })

    // Navigate to home page
    await router.push('/')
    await router.isReady()

    expect(wrapper.html()).toContain('div')
    expect(wrapper.classes()).toContain('app')
    expect(wrapper.classes()).toContain('h-screen')
  })
})
