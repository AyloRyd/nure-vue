<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { CalendarClock } from '@lucide/vue'
import UiCard from '../components/ui/UiCard.vue'
import { useTaskStore } from '../stores/taskStore'
import {
  CATEGORY_LABELS,
  PRIORITY_LABELS,
  formatDate,
} from '../types/task'

const taskStore = useTaskStore()
const { statsSummary, upcomingDeadlines, tasksByCategory } =
  storeToRefs(taskStore)
</script>

<template>
  <section class="flex min-h-0 flex-1 flex-col gap-6">
    <header class="space-y-2">
      <h1 class="text-2xl font-semibold tracking-tight">Статистика</h1>
      <p class="text-sm text-slate-400">
        Огляд задач за статусами, категоріями та найближчими дедлайнами.
      </p>
    </header>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <UiCard class="space-y-1">
        <p class="text-xs uppercase tracking-wide text-slate-500">Усього</p>
        <p class="text-3xl font-semibold text-slate-100">
          {{ statsSummary.total }}
        </p>
      </UiCard>
      <UiCard class="space-y-1">
        <p class="text-xs uppercase tracking-wide text-slate-500">Активні</p>
        <p class="text-3xl font-semibold text-indigo-200">
          {{ statsSummary.active }}
        </p>
      </UiCard>
      <UiCard class="space-y-1">
        <p class="text-xs uppercase tracking-wide text-slate-500">Виконані</p>
        <p class="text-3xl font-semibold text-emerald-300">
          {{ statsSummary.completed }}
        </p>
      </UiCard>
      <UiCard class="space-y-1">
        <p class="text-xs uppercase tracking-wide text-slate-500">Прострочені</p>
        <p class="text-3xl font-semibold text-rose-300">
          {{ statsSummary.overdue }}
        </p>
      </UiCard>
    </div>

    <UiCard class="space-y-4">
      <div class="flex items-center justify-between gap-3">
        <div>
          <p class="text-sm font-medium text-slate-100">Прогрес виконання</p>
          <p class="text-xs text-slate-400">
            Виконано {{ statsSummary.completed }} з {{ statsSummary.total }} задач
          </p>
        </div>
        <p class="text-lg font-semibold text-indigo-200">
          {{ statsSummary.completionRate }}%
        </p>
      </div>

      <div class="h-3 overflow-hidden rounded-full bg-slate-950/90 ring-1 ring-slate-800/80">
        <div
          class="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300"
          :style="{ width: `${statsSummary.completionRate}%` }"
        />
      </div>
    </UiCard>

    <div class="grid gap-4 lg:grid-cols-2">
      <UiCard class="space-y-4">
        <h2 class="text-sm font-medium text-slate-100">За категоріями</h2>
        <ul class="space-y-2 text-sm">
          <li
            v-for="(count, category) in tasksByCategory"
            :key="category"
            class="flex items-center justify-between rounded-lg border border-slate-800/80 bg-slate-950/50 px-3 py-2"
          >
            <span class="text-slate-300">
              {{ CATEGORY_LABELS[category] }}
            </span>
            <span class="font-medium text-slate-100">{{ count }}</span>
          </li>
        </ul>
      </UiCard>

      <UiCard class="space-y-4">
        <h2 class="text-sm font-medium text-slate-100">
          Найближчі дедлайни (3 дні)
        </h2>

        <div
          v-if="upcomingDeadlines.length === 0"
          class="rounded-xl border border-dashed border-slate-800 bg-slate-950/40 px-4 py-8 text-center text-sm text-slate-400"
        >
          Немає задач із дедлайном протягом найближчих трьох днів.
        </div>

        <ul v-else class="space-y-2">
          <li
            v-for="task in upcomingDeadlines"
            :key="task.id"
            class="rounded-lg border border-slate-800/80 bg-slate-950/50 px-3 py-3"
          >
            <RouterLink
              :to="`/tasks/${task.id}`"
              class="block cursor-pointer space-y-1"
            >
              <p class="text-sm font-medium text-slate-100">{{ task.title }}</p>
              <div class="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span class="inline-flex items-center gap-1">
                  <CalendarClock class="size-3.5" aria-hidden="true" />
                  {{ formatDate(task.deadline) }}
                </span>
                <span>{{ CATEGORY_LABELS[task.category] }}</span>
                <span>{{ PRIORITY_LABELS[task.priority] }}</span>
              </div>
            </RouterLink>
          </li>
        </ul>
      </UiCard>
    </div>
  </section>
</template>
