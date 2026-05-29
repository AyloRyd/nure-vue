<script setup lang="ts">
import { Search, X } from '@lucide/vue'
import type { CategoryFilter, EventCategory } from '../types/event'
import { CATEGORY_LABELS } from '../types/event'

const searchQuery = defineModel<string>('searchQuery', { required: true })
const categoryFilter = defineModel<CategoryFilter>('categoryFilter', {
  required: true,
})

defineProps<{
  visibleCount: number
  totalCount: number
}>()

const categoryOptions: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'Усі' },
  ...Object.entries(CATEGORY_LABELS).map(([id, label]) => ({
    id: id as EventCategory,
    label,
  })),
]

const fieldClass =
  'w-full rounded-xl border border-slate-700/80 bg-slate-950/90 text-sm text-slate-100 outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/25'

function clearSearch(): void {
  searchQuery.value = ''
}
</script>

<template>
  <section
    class="shrink-0 rounded-2xl border border-slate-800/90 bg-slate-900/70 p-4 shadow-lg shadow-slate-950/50 backdrop-blur-sm"
  >
    <div class="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-3">
      <div class="relative min-w-0 w-full flex-1">
        <Search
          class="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-500"
          aria-hidden="true"
        />
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Пошук за назвою..."
          :class="[fieldClass, 'py-2.5 pr-10 pl-10 placeholder:text-slate-500']"
        />
        <button
          v-if="searchQuery"
          type="button"
          class="absolute top-1/2 right-2 inline-flex -translate-y-1/2 cursor-pointer rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-900 hover:text-slate-200"
          aria-label="Очистити пошук"
          @click="clearSearch"
        >
          <X class="size-4" aria-hidden="true" />
        </button>
      </div>

      <div class="w-full sm:w-44 sm:shrink-0">
        <select
          v-model="categoryFilter"
          aria-label="Категорія"
          :class="[fieldClass, 'h-full min-h-[42px] cursor-pointer px-3 py-2.5']"
        >
          <option
            v-for="option in categoryOptions"
            :key="option.id"
            :value="option.id"
          >
            {{ option.label }}
          </option>
        </select>
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
        подій
      </p>
      <p v-if="searchQuery.trim()" class="text-slate-500">
        Пошук:
        <span class="text-slate-400">«{{ searchQuery.trim() }}»</span>
      </p>
    </div>
  </section>
</template>
