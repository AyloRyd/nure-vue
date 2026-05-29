<script setup lang="ts">
import { Plus } from '@lucide/vue'

type FilterMode = 'all' | 'active' | 'completed'

const newTodoTitle = defineModel<string>('newTodoTitle', { required: true })

defineProps<{
  filter: FilterMode
  visibleCount: number
  totalCount: number
  activeCount: number
  completedCount: number
}>()

const emit = defineEmits<{
  add: []
  'update:filter': [mode: FilterMode]
}>()

const filterModes: { id: FilterMode; label: string }[] = [
  { id: 'all', label: 'Усі' },
  { id: 'active', label: 'Активні' },
  { id: 'completed', label: 'Виконані' },
]

function setFilter(mode: FilterMode): void {
  emit('update:filter', mode)
}

function submitNewTodo(): void {
  emit('add')
}
</script>

<template>
  <section
    class="shrink-0 rounded-2xl border border-slate-800/90 bg-slate-900/70 p-4 shadow-lg shadow-slate-950/50 backdrop-blur-sm"
  >
    <form
      class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3"
      @submit.prevent="submitNewTodo"
    >
      <input
        v-model="newTodoTitle"
        type="text"
        placeholder="Нова задача..."
        class="min-w-0 w-full flex-1 rounded-xl border border-slate-700/80 bg-slate-950/90 px-4 py-2.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/25"
      />
      <button
        type="submit"
        class="inline-flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-400 sm:w-auto"
      >
        <Plus class="size-4" aria-hidden="true" />
        Додати
      </button>
    </form>

    <div
      class="mt-3 flex w-full rounded-xl border border-slate-700/80 bg-slate-950/90 p-1"
      role="tablist"
      aria-label="Фільтр задач"
    >
      <button
        v-for="mode in filterModes"
        :key="mode.id"
        type="button"
        role="tab"
        class="flex-1 cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition sm:px-4"
        :class="
          filter === mode.id
            ? 'bg-indigo-500/20 text-indigo-200 shadow-sm ring-1 ring-indigo-500/30'
            : 'text-slate-400 hover:text-slate-200'
        "
        :aria-selected="filter === mode.id"
        @click="setFilter(mode.id)"
      >
        {{ mode.label }}
      </button>
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
      <p>
        Активні:
        <span class="font-medium text-slate-300">{{ activeCount }}</span>
        · Виконані:
        <span class="font-medium text-slate-300">{{ completedCount }}</span>
      </p>
    </div>
  </section>
</template>
