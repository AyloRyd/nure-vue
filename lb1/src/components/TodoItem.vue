<script setup lang="ts">
import { Trash2 } from '@lucide/vue'

defineProps<{
  item: {
    id: number
    title: string
    completed: boolean
  }
}>()

const emit = defineEmits<{
  toggle: []
  remove: []
}>()
</script>

<template>
  <li>
    <article
      class="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 shadow-sm shadow-slate-950/30 transition"
      :class="item.completed ? 'border-slate-800 bg-slate-800/60' : ''"
    >
      <label class="flex min-w-0 flex-1 cursor-pointer items-center gap-3">
        <input
          :checked="item.completed"
          type="checkbox"
          class="size-4 shrink-0 cursor-pointer rounded border-slate-600 bg-slate-950 text-indigo-500 focus:ring-indigo-500/40 focus:ring-offset-0"
          @change="emit('toggle')"
        />
        <span
          class="truncate text-sm"
          :class="
            item.completed ? 'text-slate-500 line-through' : 'text-slate-100'
          "
        >
          {{ item.title }}
        </span>
      </label>

      <button
        type="button"
        class="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg border border-slate-600/80 p-2 text-slate-400 transition hover:border-rose-500/40 hover:bg-rose-950/30 hover:text-rose-300"
        aria-label="Видалити задачу"
        @click="emit('remove')"
      >
        <Trash2 class="size-4" aria-hidden="true" />
      </button>
    </article>
  </li>
</template>
