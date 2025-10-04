<script lang="ts" setup>
import { computed } from 'vue'
import { usePokedexStore } from '@/stores/pokedex'
import UiModal from '@/components/ui/UiModal.vue'
import Share from '@/components/common/share.vue'
import favorite from './favorite.vue'

const pokedexStore = usePokedexStore()

const characteristics = computed(() => [
  { label: 'Name', value: pokedexStore.detailPokemon?.name },
  { label: 'Weight', value: pokedexStore.detailPokemon?.weight },
  { label: 'Height', value: pokedexStore.detailPokemon?.height },
  {
    label: 'Types',
    value: pokedexStore.detailPokemon?.types?.map((type) => type.type.name).join(', '),
  },
])

const pokem = computed(() => {
  return pokedexStore.listPokemons.find(
    (pokemon) => pokemon.name === pokedexStore.detailPokemon?.name,
  )
})
</script>

<template>
  <UiModal
    :open="!!pokedexStore.detailPokemon"
    @update:open="
      (value) => {
        if (!value) pokedexStore.clearDetail()
      }
    "
  >
    <div class="bg-image">
      <img
        :src="pokedexStore.detailPokemon?.sprites?.other?.['official-artwork']?.front_default"
        :alt="pokedexStore.detailPokemon?.name"
        class="w-[200px] m-auto"
      />
    </div>
    <section class="py-5 px-8 flex flex-col items-center justify-between gap-4 w-full">
      <div class="w-full">
        <p
          v-for="characteristic in characteristics"
          :key="characteristic.label"
          class="p-2 border-b last:border-0 border-gray-200 text-cgray-600"
        >
          <span class="font-bold"> {{ characteristic.label }}: </span>
          {{ characteristic.value }}
        </p>
      </div>
      <div class="flex justify-between w-full">
        <Share :pokemon="pokedexStore.detailPokemon" />
        <favorite :pokem="pokem" />
      </div>
    </section>
  </UiModal>
</template>

<style scoped>
.bg-image {
  background-image: url('public/imgs/background.webp');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
}
</style>
