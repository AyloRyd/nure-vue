<script setup lang="ts">
withDefaults(
  defineProps<{
    count?: number
  }>(),
  {
    count: 12,
  },
)
</script>

<template>
  <div class="flex flex-col gap-6" role="status" aria-live="polite" aria-busy="true">
    <span class="sr-only">Завантаження галереї</span>

    <section
      class="shrink-0 rounded-2xl border border-slate-800/90 bg-slate-900/70 p-4 shadow-lg shadow-slate-950/50"
    >
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
        <div class="skeleton-shimmer h-11 min-w-0 w-full flex-1 rounded-xl" />
        <div class="skeleton-shimmer h-11 w-full shrink-0 rounded-xl sm:w-52" />
      </div>
      <div class="mt-3 border-t border-slate-800/80 pt-3">
        <div class="skeleton-shimmer h-4 w-56 rounded" />
      </div>
    </section>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <article
        v-for="index in count"
        :key="index"
        class="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-sm shadow-slate-950/50"
      >
        <div class="skeleton-shimmer aspect-[4/3]" />
        <div
          class="flex items-center justify-between gap-3 border-t border-slate-800 px-4 py-3"
        >
          <div class="skeleton-shimmer h-4 flex-1 rounded" />
          <div class="skeleton-shimmer h-8 w-28 shrink-0 rounded-md" />
        </div>
      </article>
    </div>
  </div>
</template>
