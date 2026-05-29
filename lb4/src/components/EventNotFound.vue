<script setup lang="ts">
import { CircleAlert } from '@lucide/vue'
import UiButton from './ui/UiButton.vue'
</script>

<template>
  <div class="flex min-h-0 flex-1 flex-col">
    <div
      class="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-rose-500/25 bg-gradient-to-b from-rose-950/30 via-slate-900/50 to-slate-950/80 px-6 py-16 text-center shadow-inner shadow-rose-950/20"
    >
      <div
        class="mb-6 flex size-16 items-center justify-center rounded-full bg-rose-500/10 ring-1 ring-rose-500/30"
      >
        <CircleAlert class="size-8 text-rose-400" stroke-width="1.75" />
      </div>

      <h2 class="text-lg font-semibold tracking-tight text-slate-100">
        Подію не знайдено
      </h2>
      <p class="mt-2 max-w-md text-sm leading-relaxed text-slate-400">
        Можливо, посилання некоректне або подія була видалена.
      </p>

      <RouterLink to="/" class="mt-8">
        <UiButton type="button">Повернутися до афіші</UiButton>
      </RouterLink>
    </div>
  </div>
</template>
