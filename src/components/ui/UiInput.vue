<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  modelValue: string
  type?: string
  placeholder?: string
  icon?: Component
}>()
defineEmits<{
  (e: 'update:modelValue', value: string | null): void
}>()
</script>

<template>
  <div class="p-3 bg-white rounded-md flex gap-2 items-center">
    <component :is="icon" v-if="icon" class="w-4 h-4 text-cgray-500" />
    <input
      class="w-full outline-none text-sm"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>
