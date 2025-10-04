<script lang="ts" setup>
import { usePokedexStore } from '@/stores/pokedex'
import UiButton from '@/components/ui/UiButton.vue'
import Start from '@/components/icons/start.vue'

const pokedexStore = usePokedexStore()

defineProps<{
  pokem?: {
    name: string
    url: string
    favorite?: boolean
  }
}>()
</script>
<template>
  <UiButton
    @click.stop="pokedexStore.toggleFavorite(pokem?.name || '')"
    :variant="pokem?.favorite ? 'secondary' : 'tertiary'"
    :icon="Start"
    :filled="pokem?.favorite"
    rounded
  />
</template>
