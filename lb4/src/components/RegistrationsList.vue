<script setup lang="ts">
import type { Registration } from '../types/event'
import { formatRegistrationDate } from '../types/event'

defineProps<{
  registrations: Registration[]
}>()
</script>

<template>
  <div class="flex min-h-0 flex-1 flex-col gap-3">
    <h2 class="shrink-0 text-sm font-medium text-slate-100">
      Зареєстровані учасники
    </h2>

    <div
      v-if="registrations.length === 0"
      class="flex min-h-0 flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-slate-800 bg-slate-950/40 px-6 py-12 text-center text-sm text-slate-400"
    >
      Поки що ніхто не зареєструвався. Будьте першим.
    </div>

    <ul v-else class="space-y-2">
      <li
        v-for="registration in registrations"
        :key="registration.id"
        class="rounded-lg border border-slate-800/80 bg-slate-950/50 px-3 py-3"
      >
        <p class="text-sm font-medium text-slate-100">{{ registration.name }}</p>
        <p class="mt-1 text-xs text-slate-400">{{ registration.email }}</p>
        <p class="mt-2 text-xs text-slate-500">
          {{ formatRegistrationDate(registration.registeredAt) }}
        </p>
      </li>
    </ul>
  </div>
</template>
