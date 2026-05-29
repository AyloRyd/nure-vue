<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import TaskListItem from '../components/TaskListItem.vue'
import TaskListToolbar from '../components/TaskListToolbar.vue'
import { useTaskStore } from '../stores/taskStore'
import type { CategoryFilter, PriorityFilter, SortBy } from '../types/task'
import { PRIORITY_ORDER } from '../types/task'

const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)

const searchQuery = ref('')
const categoryFilter = ref<CategoryFilter>('all')
const priorityFilter = ref<PriorityFilter>('all')
const sortBy = ref<SortBy>('deadline')

const visibleTasks = computed(() => {
  let list = tasks.value

  if (categoryFilter.value !== 'all') {
    list = list.filter((task) => task.category === categoryFilter.value)
  }

  if (priorityFilter.value !== 'all') {
    list = list.filter((task) => task.priority === priorityFilter.value)
  }

  const normalizedQuery = searchQuery.value.trim().toLowerCase()
  if (normalizedQuery) {
    list = list.filter((task) =>
      task.title.toLowerCase().includes(normalizedQuery),
    )
  }

  return [...list].sort((left, right) => {
    if (sortBy.value === 'priority') {
      const priorityDiff =
        PRIORITY_ORDER[left.priority] - PRIORITY_ORDER[right.priority]
      if (priorityDiff !== 0) {
        return priorityDiff
      }
    }

    return (
      left.deadline.localeCompare(right.deadline) ||
      left.title.localeCompare(right.title, 'uk')
    )
  })
})
</script>

<template>
  <section class="flex min-h-0 flex-1 flex-col gap-6">
    <header class="space-y-2">
      <h1 class="text-2xl font-semibold tracking-tight">Список задач</h1>
      <p class="text-sm text-slate-400">
        Керуйте задачами, фільтруйте за категорією та пріоритетом.
      </p>
    </header>

    <TaskListToolbar
      v-model:search-query="searchQuery"
      v-model:category-filter="categoryFilter"
      v-model:priority-filter="priorityFilter"
      v-model:sort-by="sortBy"
      :visible-count="visibleTasks.length"
      :total-count="tasks.length"
    />

    <div class="flex min-h-0 flex-1 flex-col">
      <div
        v-if="visibleTasks.length === 0"
        class="flex flex-1 items-center justify-center rounded-xl border border-dashed border-slate-800 bg-slate-950/40 px-6 py-12 text-center text-sm text-slate-400"
      >
        Задач не знайдено. Спробуйте змінити фільтри або створити нову задачу.
      </div>

      <div v-else class="flex flex-col gap-3">
        <TaskListItem
          v-for="task in visibleTasks"
          :key="task.id"
          :task="task"
        />
      </div>
    </div>
  </section>
</template>
