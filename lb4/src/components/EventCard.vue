<script setup lang="ts">
import { CalendarDays, MapPin, Users } from '@lucide/vue'
import type { EventItem } from '../types/event'
import { CATEGORY_LABELS, formatEventDate } from '../types/event'

defineProps<{
  event: EventItem
  registrationsCount: number
}>()
</script>

<template>
  <RouterLink
    :to="`/events/${event.id}`"
    class="block cursor-pointer rounded-xl border border-slate-800/90 bg-slate-900/70 p-4 shadow-lg shadow-slate-950/50 backdrop-blur-sm transition hover:border-slate-700/80 hover:bg-slate-900/90"
  >
    <div class="space-y-3">
      <div class="flex flex-wrap items-start justify-between gap-2">
        <h3 class="text-base font-medium tracking-tight text-slate-100">
          {{ event.title }}
        </h3>
        <span
          class="rounded-md bg-slate-950/80 px-2 py-1 text-xs text-slate-300 ring-1 ring-slate-800/80"
        >
          {{ CATEGORY_LABELS[event.category] }}
        </span>
      </div>

      <p class="line-clamp-2 text-sm leading-relaxed text-slate-400">
        {{ event.description }}
      </p>

      <div class="flex flex-wrap gap-3 text-xs text-slate-400">
        <span class="inline-flex items-center gap-1.5">
          <CalendarDays class="size-3.5" aria-hidden="true" />
          {{ formatEventDate(event.date, event.time) }}
        </span>
        <span class="inline-flex items-center gap-1.5">
          <MapPin class="size-3.5" aria-hidden="true" />
          {{ event.location }}
        </span>
        <span class="inline-flex items-center gap-1.5">
          <Users class="size-3.5" aria-hidden="true" />
          {{ registrationsCount }} / {{ event.capacity }}
        </span>
      </div>
    </div>
  </RouterLink>
</template>
