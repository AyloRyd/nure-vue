<script setup lang="ts">
import { computed, ref } from 'vue'
import TodoList from './components/TodoList.vue'
import TodoToolbar from './components/TodoToolbar.vue'

type FilterMode = 'all' | 'active' | 'completed'

interface TodoItem {
  id: number
  title: string
  completed: boolean
}

const inputValue = ref('')
const currentFilter = ref<FilterMode>('all')
const todos = ref<TodoItem[]>([
  { id: 1, title: 'Купити продукти', completed: true },
  { id: 2, title: 'Підготувати презентацію', completed: false },
])

const visibleTodos = computed(() => {
  if (currentFilter.value === 'active') {
    return todos.value.filter((todo) => !todo.completed)
  }

  if (currentFilter.value === 'completed') {
    return todos.value.filter((todo) => todo.completed)
  }

  return todos.value
})

const activeCount = computed(
  () => todos.value.filter((todo) => !todo.completed).length,
)

const completedCount = computed(
  () => todos.value.filter((todo) => todo.completed).length,
)

function addTodo(): void {
  const normalizedTitle = inputValue.value.trim()
  if (!normalizedTitle) {
    return
  }

  todos.value.unshift({
    id: Date.now(),
    title: normalizedTitle,
    completed: false,
  })
  inputValue.value = ''
}

function removeTodo(id: number): void {
  todos.value = todos.value.filter((todo) => todo.id !== id)
}

function toggleTodo(id: number): void {
  todos.value = todos.value.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo,
  )
}
</script>

<template>
  <main class="flex min-h-screen flex-col bg-slate-950 px-4 py-8 text-slate-100">
    <div class="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6">
      <header class="space-y-2">
        <h1 class="text-2xl font-semibold tracking-tight">Список справ</h1>
        <p class="text-sm text-slate-400">
          Додавайте задачі, відмічайте виконані та фільтруйте список.
        </p>
      </header>

      <TodoToolbar
        v-model:new-todo-title="inputValue"
        :filter="currentFilter"
        :visible-count="visibleTodos.length"
        :total-count="todos.length"
        :active-count="activeCount"
        :completed-count="completedCount"
        @add="addTodo"
        @update:filter="currentFilter = $event"
      />

      <TodoList
        :items="visibleTodos"
        @toggle="toggleTodo"
        @remove="removeTodo"
      />
    </div>
  </main>
</template>
