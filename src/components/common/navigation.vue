<script lang="ts" setup>
import UiButton from '../ui/UiButton.vue';
import iconList from '../icons/iconList.vue';
import start from '../icons/start.vue';
import { usePokedexStore } from '@/stores/pokedex';
import { computed } from 'vue';

const store = usePokedexStore();
const isListAll = computed(() => store.listAll);

function toggleView(showAll: boolean) {
    store.setListAll(showAll);
}
</script>

<template>
    <nav class="fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-center gap-4 py-3 z-10">
        <UiButton 
            class=" min-w-40 flex justify-center"
            :icon="iconList" 
            :variant="isListAll ? 'primary' : 'cuarter'" 
            @click="toggleView(true)"
        > 
            All 
        </UiButton>
        <UiButton 
            class=" min-w-40 flex justify-center"
            :icon="start" 
            :variant="!isListAll ? 'primary' : 'cuarter'" 
            @click="toggleView(false)"
        > 
            Favorites 
        </UiButton>
    </nav>
</template>