<script setup lang="ts">
import TodoItem from './TodoItem.vue'

interface TodoItemModel {
  id: number
  title: string
  completed: boolean
}

defineProps<{
  items: TodoItemModel[]
}>()

const emit = defineEmits<{
  toggle: [id: number]
  remove: [id: number]
}>()
</script>

<template>
  <div class="flex min-h-0 flex-1 flex-col">
    <ul v-if="items.length" class="space-y-3">
      <TodoItem
        v-for="item in items"
        :key="item.id"
        :item="item"
        @toggle="emit('toggle', item.id)"
        @remove="emit('remove', item.id)"
      />
    </ul>

    <div
      v-else
      class="flex flex-1 items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-900/40 px-6 py-16 text-center text-sm text-slate-400"
    >
      За поточним фільтром задач не знайдено.
    </div>
  </div>
</template>
