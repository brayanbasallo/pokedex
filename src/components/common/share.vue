<script lang="ts" setup>
import UiButton from '../ui/UiButton.vue'

defineProps<{
  share?: string
}>()
</script>
<template>
  <UiButton variant="primary"> Share to my friends </UiButton>
</template>
