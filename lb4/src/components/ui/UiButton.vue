<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'default' | 'outline' | 'danger'
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
  }>(),
  {
    variant: 'default',
    type: 'button',
    disabled: false,
  },
)
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="inline-flex cursor-pointer items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50"
    :class="{
      'bg-indigo-500 text-white hover:bg-indigo-400': variant === 'default',
      'border border-slate-700/80 bg-slate-950/90 text-slate-100 hover:bg-slate-900/70': variant === 'outline',
      'border border-rose-500 bg-slate-900 text-rose-300 hover:bg-rose-950/40': variant === 'danger',
    }"
  >
    <slot />
  </button>
</template>
