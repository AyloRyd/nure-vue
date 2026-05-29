<script setup lang="ts">
import { Plus, Search, X } from '@lucide/vue'
import type {
  CategoryFilter,
  PriorityFilter,
  SortBy,
  TaskCategory,
  TaskPriority,
} from '../types/task'
import { CATEGORY_LABELS, PRIORITY_LABELS } from '../types/task'

const searchQuery = defineModel<string>('searchQuery', { required: true })
const categoryFilter = defineModel<CategoryFilter>('categoryFilter', {
  required: true,
})
const priorityFilter = defineModel<PriorityFilter>('priorityFilter', {
  required: true,
})
const sortBy = defineModel<SortBy>('sortBy', { required: true })

defineProps<{
  visibleCount: number
  totalCount: number
}>()

const categoryOptions: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'Усі' },
  ...Object.entries(CATEGORY_LABELS).map(([id, label]) => ({
    id: id as TaskCategory,
    label,
  })),
]

const priorityOptions: { id: PriorityFilter; label: string }[] = [
  { id: 'all', label: 'Усі' },
  ...Object.entries(PRIORITY_LABELS).map(([id, label]) => ({
    id: id as TaskPriority,
    label,
  })),
]

const sortOptions: { id: SortBy; label: string }[] = [
  { id: 'deadline', label: 'За дедлайном' },
  { id: 'priority', label: 'За пріоритетом' },
]

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
          placeholder="Пошук за назвою..."
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

      <RouterLink
        to="/tasks/new"
        class="inline-flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-400 sm:w-auto"
      >
        <Plus class="size-4" aria-hidden="true" />
        Нова задача
      </RouterLink>
    </div>

    <div class="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-3">
      <label class="flex w-full min-w-0 flex-col gap-1 sm:flex-1">
        <span class="text-xs font-medium uppercase tracking-wide text-slate-500">
          Категорія
        </span>
        <select
          v-model="categoryFilter"
          aria-label="Фільтр категорії"
          class="w-full cursor-pointer rounded-xl border border-slate-700/80 bg-slate-950/90 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/25"
        >
          <option
            v-for="option in categoryOptions"
            :key="option.id"
            :value="option.id"
          >
            {{ option.label }}
          </option>
        </select>
      </label>

      <div class="grid w-full grid-cols-2 gap-3 sm:contents">
        <label class="flex min-w-0 flex-col gap-1 sm:flex-1">
          <span class="text-xs font-medium uppercase tracking-wide text-slate-500">
            Пріоритет
          </span>
          <select
            v-model="priorityFilter"
            aria-label="Фільтр пріоритету"
            class="w-full cursor-pointer rounded-xl border border-slate-700/80 bg-slate-950/90 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/25"
          >
            <option
              v-for="option in priorityOptions"
              :key="option.id"
              :value="option.id"
            >
              {{ option.label }}
            </option>
          </select>
        </label>

        <label class="flex min-w-0 flex-col gap-1 sm:flex-1">
          <span class="text-xs font-medium uppercase tracking-wide text-slate-500">
            Сортування
          </span>
          <select
            v-model="sortBy"
            aria-label="Сортування задач"
            class="w-full cursor-pointer rounded-xl border border-slate-700/80 bg-slate-950/90 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/25"
          >
            <option
              v-for="option in sortOptions"
              :key="option.id"
              :value="option.id"
            >
              {{ option.label }}
            </option>
          </select>
        </label>
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
        задач
      </p>
      <p v-if="searchQuery.trim()" class="text-slate-500">
        Пошук:
        <span class="text-slate-400">«{{ searchQuery.trim() }}»</span>
      </p>
    </div>
  </section>
</template>
