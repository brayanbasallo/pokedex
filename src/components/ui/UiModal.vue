<script lang="ts" setup>
import X from '@/components/icons/x.vue'

defineProps<{
  open?: boolean
}>()

const emits = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const hide = () => {
  emits('update:open', false)
}
</script>

<template>
  <dialog
    class="fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-black/50 z-50 flex items-center justify-center px-5"
    open
    v-if="open"
  >
    <article
      class="bg-white rounded-md w-full flex flex-col items-center justify-between max-w-lg overflow-hidden relative"
    >
      <button class="cursor-pointer" @click="hide">
        <X class="text-white absolute top-2 right-2" />
      </button>
      <slot />
    </article>
  </dialog>
  <slot name="trigger" />
</template>
