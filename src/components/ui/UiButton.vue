<script setup lang="ts">
import type { Component } from 'vue'

type buttonVariant = 'primary' | 'secondary' | 'tertiary' | 'cuarter'

interface Props {
  icon?: Component
  disabled?: boolean
  rounded?: boolean
  variant?: buttonVariant
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
})
</script>

<template>
  <button
    class="rounded-full cursor-pointer transition-colors disabled:bg-stone-400 disabled:cursor-not-allowed flex items-center gap-2"
    :class="[
      rounded ? 'px-2.5 w-11 h-11' : 'px-5 py-2.5',
      {
        'bg-primary hover:bg-secondary text-white': variant === 'primary',
        'bg-cgray-300 hover:bg-cgray-400 text-golden disabled:text-gray-200': variant === 'secondary',
        'bg-cgray-300 hover:bg-cgray-200 text-cgray-400 disabled:text-gray-200': variant === 'tertiary',
        'bg-cgray-500 hover:bg-cgray-400 text-white disabled:text-gray-200': variant === 'cuarter',
      },
    ]"
    :disabled="disabled"
  >
    <component :is="icon" v-if="icon" :class="rounded ? 'w-7 h-7' : 'w-4 h-4'" />
    <slot></slot>
  </button>
</template>
