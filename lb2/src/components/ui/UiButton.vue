<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'default' | 'outline' | 'danger'
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    variant: 'default',
    type: 'button',
  },
)
</script>

<template>
  <button
    :type="type"
    class="inline-flex cursor-pointer items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition"
    :class="{
      'bg-indigo-500 text-white hover:bg-indigo-400': variant === 'default',
      'border border-slate-600 bg-slate-800 text-slate-100 hover:bg-slate-700': variant === 'outline',
      'border border-rose-500 bg-slate-900 text-rose-300 hover:bg-rose-950/40': variant === 'danger',
    }"
  >
    <slot />
  </button>
</template>
