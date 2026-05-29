<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import RegistrationForm from '../components/RegistrationForm.vue'
import EventNotFound from '../components/EventNotFound.vue'
import UiCard from '../components/ui/UiCard.vue'
import { isSubmitting } from '../composables/registrationState'
import { useEvents } from '../composables/useEvents'
import { useRegistration } from '../composables/useRegistration'
import { formatEventDate } from '../types/event'

const route = useRoute()
const router = useRouter()
const { getEventById, isEventFull } = useEvents()
const { submitRegistration, validateForm } = useRegistration()

const eventId = computed(() => String(route.params.id))
const event = computed(() => getEventById(eventId.value))
const full = computed(() =>
  event.value ? isEventFull(event.value.id) : false,
)

const form = reactive({
  name: '',
  email: '',
})

const errors = reactive({
  name: '',
  email: '',
})

watch(
  event,
  (currentEvent) => {
    if (!currentEvent) {
      return
    }

    form.name = ''
    form.email = ''
    errors.name = ''
    errors.email = ''
  },
  { immediate: true },
)

function applyValidationErrors(): boolean {
  errors.name = ''
  errors.email = ''

  const message = validateForm(form)
  if (!message) {
    return true
  }

  if (message.includes("Ім'я") || message.includes('ім')) {
    errors.name = message
  } else {
    errors.email = message
  }

  return false
}

async function handleSubmit(): Promise<void> {
  if (!event.value) {
    return
  }

  if (!applyValidationErrors()) {
    return
  }

  const success = await submitRegistration(
    event.value.id,
    form,
    event.value.capacity,
  )

  if (success) {
    void router.push(`/events/${event.value.id}`)
  }
}
</script>

<template>
  <EventNotFound v-if="!event" />

  <section v-else class="flex min-h-0 flex-1 flex-col gap-6">
    <header class="space-y-2">
      <h1 class="text-2xl font-semibold tracking-tight">Реєстрація</h1>
      <p class="text-sm text-slate-400">
        {{ event.title }} · {{ formatEventDate(event.date, event.time) }}
      </p>
    </header>

    <UiCard>
      <RegistrationForm
        v-model:name="form.name"
        v-model:email="form.email"
        :errors="errors"
        :is-submitting="isSubmitting"
        :is-full="full"
        @submit="handleSubmit"
      />
    </UiCard>
  </section>
</template>
