<script setup lang="ts">
defineOptions({ name: 'EventListView' })

import { computed, ref } from 'vue'
import EventCard from '../components/EventCard.vue'
import EventListToolbar from '../components/EventListToolbar.vue'
import { registrations } from '../composables/registrationState'
import { useEvents } from '../composables/useEvents'
import type { CategoryFilter } from '../types/event'

const { events } = useEvents()

const searchQuery = ref('')
const categoryFilter = ref<CategoryFilter>('all')

const visibleEvents = computed(() => {
  void registrations.value

  let list = events.value

  if (categoryFilter.value !== 'all') {
    list = list.filter((event) => event.category === categoryFilter.value)
  }

  const normalizedQuery = searchQuery.value.trim().toLowerCase()
  if (normalizedQuery) {
    list = list.filter((event) =>
      event.title.toLowerCase().includes(normalizedQuery),
    )
  }

  return list
})

function getRegistrationsCount(eventId: string): number {
  return registrations.value.filter(
    (registration) => registration.eventId === eventId,
  ).length
}
</script>

<template>
  <section class="flex min-h-0 flex-1 flex-col gap-6">
    <header class="space-y-2">
      <h1 class="text-2xl font-semibold tracking-tight">Афіша подій</h1>
      <p class="text-sm text-slate-400">
        Оберіть подію та зареєструйтеся онлайн.
      </p>
    </header>

    <EventListToolbar
      v-model:search-query="searchQuery"
      v-model:category-filter="categoryFilter"
      :visible-count="visibleEvents.length"
      :total-count="events.length"
    />

    <div class="flex min-h-0 flex-1 flex-col">
      <div
        v-if="visibleEvents.length === 0"
        class="flex flex-1 items-center justify-center rounded-xl border border-dashed border-slate-800 bg-slate-950/40 px-6 py-12 text-center text-sm text-slate-400"
      >
        Подій не знайдено. Спробуйте змінити фільтри або пошук.
      </div>

      <div v-else class="grid gap-4 sm:grid-cols-2">
        <EventCard
          v-for="event in visibleEvents"
          :key="event.id"
          :event="event"
          :registrations-count="getRegistrationsCount(event.id)"
        />
      </div>
    </div>
  </section>
</template>
