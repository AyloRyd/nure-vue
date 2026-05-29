<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { CalendarDays, MapPin, UserPlus, Users } from '@lucide/vue'
import EventNotFound from '../components/EventNotFound.vue'
import RegistrationsList from '../components/RegistrationsList.vue'
import UiButton from '../components/ui/UiButton.vue'
import UiCard from '../components/ui/UiCard.vue'
import { registrations } from '../composables/registrationState'
import { useEvents } from '../composables/useEvents'
import { useRegistration } from '../composables/useRegistration'
import { CATEGORY_LABELS, formatEventDate } from '../types/event'

const route = useRoute()
const { getEventById, getAvailableSpots, isEventFull } = useEvents()
const { getRegistrationsForEvent } = useRegistration()

const eventId = computed(() => String(route.params.id))
const event = computed(() => getEventById(eventId.value))
const registrationList = computed(() => {
  void registrations.value
  return getRegistrationsForEvent(eventId.value)
})
const availableSpots = computed(() => getAvailableSpots(eventId.value))
const full = computed(() => isEventFull(eventId.value))
</script>

<template>
  <EventNotFound v-if="!event" />

  <section v-else class="flex min-h-0 flex-1 flex-col gap-6">
    <header class="space-y-2">
      <div class="flex flex-wrap items-center gap-2">
        <h1 class="text-2xl font-semibold tracking-tight text-slate-100">
          {{ event.title }}
        </h1>
        <span
          class="rounded-md bg-slate-950/80 px-2 py-1 text-xs text-slate-300 ring-1 ring-slate-800/80"
        >
          {{ CATEGORY_LABELS[event.category] }}
        </span>
      </div>
      <p class="text-sm text-slate-400">Детальна інформація та реєстрація.</p>
    </header>

    <UiCard class="space-y-5">
      <p class="text-sm leading-relaxed text-slate-300">{{ event.description }}</p>

      <div class="grid gap-4 sm:grid-cols-2">
        <div class="flex items-start gap-2 text-sm text-slate-300">
          <CalendarDays class="mt-0.5 size-4 shrink-0 text-slate-400" />
          <span>{{ formatEventDate(event.date, event.time) }}</span>
        </div>
        <div class="flex items-start gap-2 text-sm text-slate-300">
          <MapPin class="mt-0.5 size-4 shrink-0 text-slate-400" />
          <span>{{ event.location }}</span>
        </div>
        <div class="flex items-start gap-2 text-sm text-slate-300">
          <Users class="mt-0.5 size-4 shrink-0 text-slate-400" />
          <span>
            Місць: {{ registrationList.length }} / {{ event.capacity }}
            <span class="text-slate-500">(вільно: {{ availableSpots }})</span>
          </span>
        </div>
      </div>

      <div class="border-t border-slate-800/80 pt-5">
        <RouterLink v-if="!full" :to="`/events/${event.id}/register`">
          <UiButton type="button" class="gap-2">
            <UserPlus class="size-4" aria-hidden="true" />
            Зареєструватися
          </UiButton>
        </RouterLink>
        <p v-else class="text-sm text-rose-300">
          Реєстрація закрита — всі місця зайняті.
        </p>
      </div>
    </UiCard>

    <UiCard class="flex min-h-0 flex-1 flex-col">
      <RegistrationsList :registrations="registrationList" />
    </UiCard>
  </section>
</template>
