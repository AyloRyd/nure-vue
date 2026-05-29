<script setup lang="ts">
import { Heart, Search, X } from '@lucide/vue'
import type { ViewMode } from '../types/picsum'

const searchQuery = defineModel<string>('searchQuery', { required: true })

defineProps<{
  viewMode: ViewMode
  favoritesCount: number
  visibleCount: number
  totalCount: number
}>()

const emit = defineEmits<{
  'update:viewMode': [mode: ViewMode]
}>()

function setViewMode(mode: ViewMode): void {
  emit('update:viewMode', mode)
}

function clearSearch(): void {
  searchQuery.value = ''
}
</script>

<template>
  <section
    class="shrink-0 rounded-2xl border border-slate-800/90 bg-slate-900/70 p-4 shadow-lg shadow-slate-950/50 backdrop-blur-sm"
  >
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
      <div class="relative min-w-0 w-full flex-1">
        <Search
          class="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-500"
          aria-hidden="true"
        />
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Пошук за ім'ям автора..."
          class="w-full rounded-xl border border-slate-700/80 bg-slate-950/90 py-2.5 pr-10 pl-10 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/25"
        />
        <button
          v-if="searchQuery"
          type="button"
          class="absolute top-1/2 right-2 inline-flex -translate-y-1/2 cursor-pointer rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-slate-200"
          aria-label="Очистити пошук"
          @click="clearSearch"
        >
          <X class="size-4" aria-hidden="true" />
        </button>
      </div>

      <div
        class="flex w-full shrink-0 rounded-xl border border-slate-700/80 bg-slate-950/90 p-1 sm:w-auto sm:inline-flex"
        role="tablist"
        aria-label="Режим відображення"
      >
        <button
          type="button"
          role="tab"
          class="flex-1 cursor-pointer justify-center rounded-lg px-4 py-2 text-sm font-medium transition sm:flex-none"
          :class="
            viewMode === 'all'
              ? 'bg-indigo-500/20 text-indigo-200 shadow-sm ring-1 ring-indigo-500/30'
              : 'text-slate-400 hover:text-slate-200'
          "
          :aria-selected="viewMode === 'all'"
          @click="setViewMode('all')"
        >
          Усі
        </button>
        <button
          type="button"
          role="tab"
          class="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition sm:flex-none"
          :class="
            viewMode === 'favorites'
              ? 'bg-indigo-500/20 text-indigo-200 shadow-sm ring-1 ring-indigo-500/30'
              : 'text-slate-400 hover:text-slate-200'
          "
          :aria-selected="viewMode === 'favorites'"
          @click="setViewMode('favorites')"
        >
          <Heart
            class="size-3.5"
            :class="viewMode === 'favorites' ? 'fill-current' : ''"
            aria-hidden="true"
          />
          Обрані
          <span
            class="rounded-md bg-slate-800/80 px-1.5 py-0.5 text-xs tabular-nums text-slate-300"
          >
            {{ favoritesCount }}
          </span>
        </button>
      </div>
    </div>

    <div
      class="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/80 pt-3 text-xs text-slate-500"
    >
      <p>
        Показано
        <span class="font-medium text-slate-300">{{ visibleCount }}</span>
        з
        <span class="font-medium text-slate-300">{{ totalCount }}</span>
        зображень
      </p>
      <p v-if="searchQuery.trim()" class="text-slate-500">
        Фільтр:
        <span class="text-slate-400">«{{ searchQuery.trim() }}»</span>
      </p>
    </div>
  </section>
</template>
