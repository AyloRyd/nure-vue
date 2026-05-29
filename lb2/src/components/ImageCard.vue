<script setup lang="ts">
import { Heart } from '@lucide/vue'
import { ref } from 'vue'
import type { PicsumImage } from '../types/picsum'
import ImagePreviewDialog from './ImagePreviewDialog.vue'

defineProps<{
  image: PicsumImage
  isFavorite: boolean
}>()

const emit = defineEmits<{
  'toggle-favorite': []
}>()

const isPreviewOpen = ref(false)

function openPreview(): void {
  isPreviewOpen.value = true
}

function closePreview(): void {
  isPreviewOpen.value = false
}
</script>

<template>
  <article
    class="overflow-hidden rounded-xl border border-slate-700 bg-slate-800 shadow-sm shadow-slate-950/30"
  >
    <button
      type="button"
      class="relative block aspect-[4/3] w-full cursor-pointer overflow-hidden bg-slate-950"
      :aria-label="`Відкрити фото автора ${image.author}`"
      @click="openPreview"
    >
      <img
        :src="image.download_url"
        :alt="`Фото автора ${image.author}`"
        class="h-full w-full object-cover transition duration-200 hover:scale-[1.02] hover:brightness-110"
        loading="lazy"
      />
    </button>

    <div
      class="flex items-center justify-between gap-3 border-t border-slate-700 px-4 py-3"
    >
      <p class="min-w-0 truncate text-sm text-slate-200" :title="image.author">
        {{ image.author }}
      </p>

      <button
        type="button"
        class="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium transition"
        :class="
          isFavorite
            ? 'border-indigo-500/60 bg-indigo-500/15 text-indigo-300'
            : 'border-slate-600 bg-transparent text-slate-200 hover:bg-slate-700/60'
        "
        :aria-label="isFavorite ? 'Прибрати з обраних' : 'Додати в обране'"
        :aria-pressed="isFavorite"
        @click="emit('toggle-favorite')"
      >
        <Heart
          class="size-4"
          :class="isFavorite ? 'fill-current text-indigo-400' : ''"
          aria-hidden="true"
        />
        <span>{{ isFavorite ? 'У обраних' : 'В обране' }}</span>
      </button>
    </div>

    <ImagePreviewDialog
      :open="isPreviewOpen"
      :src="image.download_url"
      :alt="`Фото автора ${image.author}`"
      :author="image.author"
      @close="closePreview"
    />
  </article>
</template>
