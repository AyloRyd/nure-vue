<script setup lang="ts">
import type { PicsumImage } from '../types/picsum'
import ImageCard from './ImageCard.vue'

defineProps<{
  images: PicsumImage[]
  favoriteIds: string[]
}>()

const emit = defineEmits<{
  'toggle-favorite': [id: string]
}>()

function isFavorite(id: string, favoriteIds: string[]): boolean {
  return favoriteIds.includes(id)
}
</script>

<template>
  <div class="flex min-h-0 flex-1 flex-col">
    <div
      v-if="images.length === 0"
      class="flex flex-1 items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-900/40 px-6 py-12 text-center text-sm text-slate-400"
    >
      Зображень не знайдено. Спробуйте змінити пошук або режим відображення.
    </div>

    <div
      v-else
      class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <ImageCard
        v-for="image in images"
        :key="image.id"
        :image="image"
        :is-favorite="isFavorite(image.id, favoriteIds)"
        @toggle-favorite="emit('toggle-favorite', image.id)"
      />
    </div>
  </div>
</template>
