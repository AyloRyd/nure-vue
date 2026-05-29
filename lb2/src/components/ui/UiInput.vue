<script setup lang="ts">
defineProps<{
  modelValue: string
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <input
    :value="modelValue"
    :placeholder="placeholder"
    type="text"
    class="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-indigo-400 transition placeholder:text-slate-400 focus:ring-2"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
