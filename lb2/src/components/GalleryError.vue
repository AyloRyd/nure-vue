<script setup lang="ts">
import { CircleAlert, RefreshCw } from '@lucide/vue'
import UiButton from './ui/UiButton.vue'

defineProps<{
  message: string
}>()

const emit = defineEmits<{
  retry: []
}>()
</script>

<template>
  <div
    class="flex min-h-0 flex-1 flex-col"
    role="alert"
    aria-live="assertive"
  >
    <div
      class="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-rose-500/25 bg-gradient-to-b from-rose-950/30 via-slate-900/50 to-slate-950/80 px-6 py-16 text-center shadow-inner shadow-rose-950/20"
    >
      <div
        class="mb-6 flex size-16 items-center justify-center rounded-full bg-rose-500/10 ring-1 ring-rose-500/30"
      >
        <CircleAlert class="size-8 text-rose-400" stroke-width="1.75" />
      </div>

      <h2 class="text-lg font-semibold tracking-tight text-slate-100">
        Не вдалося завантажити галерею
      </h2>
      <p class="mt-2 max-w-md text-sm leading-relaxed text-slate-400">
        Перевірте підключення до мережі або спробуйте ще раз через кілька секунд.
      </p>

      <p
        class="mt-6 max-w-lg rounded-lg border border-slate-800/80 bg-slate-950/70 px-4 py-3 font-mono text-xs leading-relaxed text-rose-300/90"
      >
        {{ message }}
      </p>

      <UiButton
        type="button"
        class="mt-8 gap-2"
        @click="emit('retry')"
      >
        <RefreshCw class="size-4" aria-hidden="true" />
        Спробувати знову
      </UiButton>
    </div>
  </div>
</template>
