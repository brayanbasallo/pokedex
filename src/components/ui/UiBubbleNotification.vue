<script lang="ts" setup>
import { ref, watchEffect } from 'vue'

const props = defineProps<{
  message: string
  show: boolean
  duration?: number
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()

const isVisible = ref(false)

watchEffect(() => {
  isVisible.value = props.show
  if (props.show) {
    setTimeout(() => {
      emit('update:show', false)
    }, props.duration || 2000)
  }
})
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform translate-y-2 opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform translate-y-2 opacity-0"
  >
    <div
      v-if="isVisible"
      class="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-cgray-400 text-cgray-900 px-4 py-2 rounded-md shadow-lg z-50"
    >
      {{ message }}
    </div>
  </Transition>
</template>