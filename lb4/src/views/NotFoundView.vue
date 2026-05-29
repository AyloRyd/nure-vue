<script setup lang="ts">
import { MapPinOff } from '@lucide/vue'
import UiButton from '../components/ui/UiButton.vue'
</script>

<template>
  <section class="flex min-h-0 flex-1 flex-col gap-6">
    <div
      class="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-slate-800 bg-slate-950/40 px-6 py-16 text-center"
    >
      <div
        class="mb-6 flex size-16 items-center justify-center rounded-full bg-slate-900/70 ring-1 ring-slate-800/90"
      >
        <MapPinOff class="size-8 text-slate-400" stroke-width="1.75" />
      </div>

      <h1 class="text-lg font-semibold tracking-tight text-slate-100">
        Сторінку не знайдено
      </h1>
      <p class="mt-2 max-w-md text-sm leading-relaxed text-slate-400">
        Запитана адреса не існує або була переміщена.
      </p>

      <RouterLink to="/" class="mt-8">
        <UiButton type="button">На головну</UiButton>
      </RouterLink>
    </div>
  </section>
</template>
