<script lang="ts" setup>
import { ref } from 'vue'
import UiButton from '../ui/UiButton.vue'
import UiBubbleNotification from '../ui/UiBubbleNotification.vue'
import type { Pokemon } from '@/types/pokemon'

const props = defineProps<{
  pokemon: Pokemon | null
}>()

const showNotification = ref(false)

const handleShare = async () => {
  if (!props.pokemon) return
  
  const details = [
    props.pokemon.name,
    `weight: ${props.pokemon.weight}`,
    `height: ${props.pokemon.height}`,
    `types: ${props.pokemon.types?.map(type => type.type.name).join(', ')}`
  ].join(', ')
  
  await navigator.clipboard.writeText(details)
  showNotification.value = true
}
</script>

<template>
  <div>
    <UiButton variant="primary" @click="handleShare"> Share to my friends </UiButton>
    <UiBubbleNotification
      v-model:show="showNotification"
      :message="`¡${pokemon?.name} details copied to clipboard!`"
    />
  </div>
</template>
