<script setup lang="ts">
import { CalendarDays } from '@lucide/vue'
</script>

<template>
  <nav
    class="shrink-0 rounded-2xl border border-slate-800/90 bg-slate-900/70 p-2 shadow-lg shadow-slate-950/50 backdrop-blur-sm"
    aria-label="Головна навігація"
  >
    <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div class="px-2 py-1">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-500">Застосунок</p>
        <p class="text-sm font-semibold text-slate-100">Афіша подій</p>
      </div>

      <RouterLink
        to="/"
        class="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-800/90 bg-slate-950/90 px-4 py-2 text-sm font-medium text-slate-300 transition hover:text-slate-100 sm:w-auto"
      >
        <CalendarDays class="size-4" aria-hidden="true" />
        Усі події
      </RouterLink>
    </div>
  </nav>
</template>
