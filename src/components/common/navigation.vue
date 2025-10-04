<script lang="ts" setup>
import { usePokedexStore } from '@/stores/pokedex'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import UiButton from '@/components/ui/UiButton.vue'
import iconList from '@/components/icons/iconList.vue'
import start from '@/components/icons/start.vue'
import Home from '@/components/icons/home.vue'

const store = usePokedexStore()
const isListAll = computed(() => store.listAll)
const router = useRouter()

const toggleView = (showAll: boolean) => {
  store.setListAll(showAll)
}
const goHome = () => {
  router.push('/')
}
</script>

<template>
  <nav
    class="sticky bottom-0 left-0 w-full bg-white custom-shadow flex justify-center gap-4 py-3 z-10"
  >
    <UiButton :icon="Home" @click="goHome()" variant="cuarter" /> 
    <UiButton
      class="min-w-40 flex justify-center"
      :icon="iconList"
      :variant="isListAll ? 'primary' : 'cuarter'"
      @click="toggleView(true)"
    >
      All
    </UiButton>
    <UiButton
      class="min-w-40 flex justify-center"
      :icon="start"
      :variant="!isListAll ? 'primary' : 'cuarter'"
      @click="toggleView(false)"
    >
      Favorites
    </UiButton>
  </nav>
</template>

<style scoped>
.custom-shadow {
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}
</style>
