<script setup lang="ts">
import { CheckCircle2, CircleAlert, X } from '@lucide/vue'
import { toasts, useToast } from '../composables/toastState'

const { removeToast } = useToast()
</script>

<template>
  <Teleport to="body">
    <div
      class="pointer-events-none fixed top-4 right-4 z-50 flex w-full max-w-sm flex-col gap-2 px-4 sm:px-0"
      aria-live="polite"
    >
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-sm"
          :class="
            toast.type === 'success'
              ? 'border-emerald-500/30 bg-emerald-950/90 text-emerald-100'
              : 'border-rose-500/30 bg-rose-950/90 text-rose-100'
          "
          role="status"
        >
          <CheckCircle2
            v-if="toast.type === 'success'"
            class="mt-0.5 size-4 shrink-0 text-emerald-400"
            aria-hidden="true"
          />
          <CircleAlert
            v-else
            class="mt-0.5 size-4 shrink-0 text-rose-400"
            aria-hidden="true"
          />

          <p class="min-w-0 flex-1 text-sm leading-relaxed">{{ toast.message }}</p>

          <button
            type="button"
            class="inline-flex shrink-0 cursor-pointer rounded-lg p-1 text-current/70 transition hover:bg-white/10"
            aria-label="Закрити повідомлення"
            @click="removeToast(toast.id)"
          >
            <X class="size-4" aria-hidden="true" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
