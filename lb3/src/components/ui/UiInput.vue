<script setup lang="ts">
defineProps<{
  modelValue: string
  placeholder?: string
  type?: string
  id?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <input
    :id="id"
    :value="modelValue"
    :placeholder="placeholder"
    :type="type ?? 'text'"
    class="w-full rounded-xl border border-slate-700/80 bg-slate-950/90 px-4 py-2.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/25"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
