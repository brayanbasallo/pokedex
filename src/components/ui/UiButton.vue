<script setup lang="ts">
import type { Component } from 'vue'

type buttonVariant = 'primary' | 'secondary' | 'tertiary'

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
        'bg-white hover:bg-gray-50 text-golden disabled:text-gray-200': variant === 'secondary',
        'bg-white hover:bg-gray-50 text-gray-300 disabled:text-gray-200': variant === 'tertiary',
      },
    ]"
    :disabled="disabled"
  >
    <component :is="icon" v-if="icon" :class="rounded ? 'w-7 h-7' : 'w-4 h-4'" />
    <slot></slot>
  </button>
</template>
