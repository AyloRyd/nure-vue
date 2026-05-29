<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { BarChart3, ListTodo } from '@lucide/vue'

const route = useRoute()

const isTasksActive = computed(() => {
  return route.name !== 'stats' && route.name !== 'not-found'
})

const isStatsActive = computed(() => route.name === 'stats')

const navLinkClass =
  'flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition sm:flex-none'
const activeClass =
  'bg-indigo-500/20 text-indigo-200 shadow-sm ring-1 ring-indigo-500/30'
const inactiveClass = 'text-slate-400 hover:text-slate-200'
</script>

<template>
  <nav
    class="shrink-0 rounded-2xl border border-slate-800/90 bg-slate-900/70 p-2 shadow-lg shadow-slate-950/50 backdrop-blur-sm"
    aria-label="Головна навігація"
  >
    <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div class="px-2 py-1">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-500">Застосунок</p>
        <p class="text-sm font-semibold text-slate-100">Менеджер задач</p>
      </div>

      <div
        class="flex w-full rounded-xl border border-slate-700/80 bg-slate-950/90 p-1 sm:w-auto"
        role="tablist"
        aria-label="Розділи"
      >
        <RouterLink
          to="/"
          :class="[navLinkClass, isTasksActive ? activeClass : inactiveClass]"
        >
          <ListTodo class="size-4" aria-hidden="true" />
          Задачі
        </RouterLink>
        <RouterLink
          to="/stats"
          :class="[navLinkClass, isStatsActive ? activeClass : inactiveClass]"
        >
          <BarChart3 class="size-4" aria-hidden="true" />
          Статистика
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
