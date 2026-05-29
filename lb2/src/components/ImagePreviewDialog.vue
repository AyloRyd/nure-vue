<script setup lang="ts">
import { X } from '@lucide/vue'
import { onUnmounted, watch } from 'vue'

const props = defineProps<{
  open: boolean
  src: string
  alt: string
  author?: string
}>()

const emit = defineEmits<{
  close: []
}>()

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape' && props.open) {
    emit('close')
  }
}

watch(
  () => props.open,
  (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : ''

    if (isOpen) {
      document.addEventListener('keydown', onKeydown)
      return
    }

    document.removeEventListener('keydown', onKeydown)
  },
  { immediate: true },
)

onUnmounted(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      :aria-label="alt"
      @click.self="emit('close')"
    >
      <button
        type="button"
        class="absolute top-4 right-4 z-10 inline-flex cursor-pointer items-center justify-center rounded-full border border-slate-600 bg-slate-900/90 p-2 text-slate-200 transition hover:bg-slate-800"
        aria-label="Закрити перегляд"
        @click="emit('close')"
      >
        <X class="size-5" aria-hidden="true" />
      </button>

      <figure class="flex max-h-full max-w-full flex-col items-center gap-4">
        <img
          :src="src"
          :alt="alt"
          class="max-h-[85vh] max-w-full cursor-default object-contain"
        />
        <figcaption
          v-if="author"
          class="rounded-full border border-slate-700 bg-slate-900/80 px-4 py-1.5 text-sm text-slate-300"
        >
          {{ author }}
        </figcaption>
      </figure>
    </div>
  </Teleport>
</template>
