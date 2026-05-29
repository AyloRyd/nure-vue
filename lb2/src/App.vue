<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { fetchImages } from './api/picsum'
import GalleryError from './components/GalleryError.vue'
import GalleryGrid from './components/GalleryGrid.vue'
import GallerySkeleton from './components/GallerySkeleton.vue'
import GalleryToolbar from './components/GalleryToolbar.vue'
import type { PicsumImage, ViewMode } from './types/picsum'

const images = ref<PicsumImage[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)
const favoriteIds = ref<string[]>([])
const searchQuery = ref('')
const viewMode = ref<ViewMode>('all')

const visibleImages = computed(() => {
  let list = images.value

  if (viewMode.value === 'favorites') {
    list = list.filter((image) => favoriteIds.value.includes(image.id))
  }

  const normalizedQuery = searchQuery.value.trim().toLowerCase()
  if (normalizedQuery) {
    list = list.filter((image) =>
      image.author.toLowerCase().includes(normalizedQuery),
    )
  }

  return list
})

const favoritesCount = computed(() => favoriteIds.value.length)

async function loadImages(): Promise<void> {
  isLoading.value = true
  error.value = null

  try {
    images.value = await fetchImages(1, 20)
  } catch (loadError) {
    error.value =
      loadError instanceof Error
        ? loadError.message
        : 'Не вдалося завантажити зображення'
  } finally {
    isLoading.value = false
  }
}

function toggleFavorite(id: string): void {
  if (favoriteIds.value.includes(id)) {
    favoriteIds.value = favoriteIds.value.filter(
      (favoriteId) => favoriteId !== id,
    )
    return
  }

  favoriteIds.value = [...favoriteIds.value, id]
}

onMounted(() => {
  void loadImages()
})
</script>

<template>
  <main class="flex min-h-screen flex-col bg-slate-950 px-4 py-8 text-slate-100">
    <div class="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6">
      <header class="space-y-2">
        <h1 class="text-2xl font-semibold tracking-tight">
          Галерея зображень
        </h1>
        <p class="text-sm text-slate-400">
          Дані завантажуються з Picsum Photos API
        </p>
      </header>

      <GallerySkeleton v-if="isLoading" class="min-h-0 flex-1" />

      <GalleryError
        v-else-if="error"
        :message="error"
        @retry="loadImages"
      />

      <div v-else class="flex min-h-0 flex-1 flex-col gap-6">
        <GalleryToolbar
          v-model:search-query="searchQuery"
          :view-mode="viewMode"
          :favorites-count="favoritesCount"
          :visible-count="visibleImages.length"
          :total-count="images.length"
          @update:view-mode="viewMode = $event"
        />

        <GalleryGrid
          :images="visibleImages"
          :favorite-ids="favoriteIds"
          @toggle-favorite="toggleFavorite"
        />
      </div>
    </div>
  </main>
</template>
