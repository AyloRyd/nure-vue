<script setup lang="ts">
import { AlertCircle, CalendarDays, CheckCircle2 } from '@lucide/vue'
import type { Task } from '../types/task'
import {
  CATEGORY_LABELS,
  PRIORITY_LABELS,
  formatDate,
  isOverdue,
} from '../types/task'

defineProps<{
  task: Task
}>()
</script>

<template>
  <RouterLink
    :to="`/tasks/${task.id}`"
    class="block cursor-pointer rounded-xl border border-slate-800/90 bg-slate-900/70 p-4 shadow-lg shadow-slate-950/50 backdrop-blur-sm transition hover:border-slate-700/80 hover:bg-slate-900/90"
    :class="
      isOverdue(task)
        ? 'border-rose-500/40 ring-1 ring-rose-500/20'
        : ''
    "
  >
    <div class="flex items-start justify-between gap-3">
      <div class="min-w-0 flex-1 space-y-2">
        <div class="flex flex-wrap items-center gap-2">
          <h3
            class="text-base font-medium tracking-tight"
            :class="
              task.completed
                ? 'text-slate-500 line-through'
                : isOverdue(task)
                  ? 'text-rose-200'
                  : 'text-slate-100'
            "
          >
            {{ task.title }}
          </h3>
          <span
            v-if="task.completed"
            class="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-300 ring-1 ring-emerald-500/20"
          >
            <CheckCircle2 class="size-3" aria-hidden="true" />
            Виконано
          </span>
          <span
            v-else-if="isOverdue(task)"
            class="inline-flex items-center gap-1 rounded-md bg-rose-500/10 px-2 py-0.5 text-xs text-rose-300 ring-1 ring-rose-500/20"
          >
            <AlertCircle class="size-3" aria-hidden="true" />
            Прострочено
          </span>
        </div>

        <div class="flex flex-wrap gap-2 text-xs">
          <span
            class="rounded-md bg-slate-950/80 px-2 py-1 text-slate-300 ring-1 ring-slate-800/80"
          >
            {{ CATEGORY_LABELS[task.category] }}
          </span>
          <span
            class="rounded-md px-2 py-1 ring-1"
            :class="{
              'bg-rose-500/10 text-rose-300 ring-rose-500/20': task.priority === 'high',
              'bg-amber-500/10 text-amber-300 ring-amber-500/20': task.priority === 'medium',
              'bg-sky-500/10 text-sky-300 ring-sky-500/20': task.priority === 'low',
            }"
          >
            {{ PRIORITY_LABELS[task.priority] }}
          </span>
        </div>
      </div>

      <div
        class="flex shrink-0 items-center gap-1.5 text-xs"
        :class="isOverdue(task) ? 'text-rose-300' : 'text-slate-400'"
      >
        <CalendarDays class="size-3.5" aria-hidden="true" />
        <span>{{ formatDate(task.deadline) }}</span>
      </div>
    </div>
  </RouterLink>
</template>
