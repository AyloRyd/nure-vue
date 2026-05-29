<script setup lang="ts">
import UiButton from './ui/UiButton.vue'

const name = defineModel<string>('name', { required: true })
const email = defineModel<string>('email', { required: true })

defineProps<{
  errors: { name: string; email: string }
  isSubmitting: boolean
  isFull: boolean
}>()

const emit = defineEmits<{
  submit: []
}>()
</script>

<template>
  <form class="space-y-5" @submit.prevent="emit('submit')">
    <div class="space-y-2">
      <label for="reg-name" class="text-sm text-slate-300">Ім'я *</label>
      <input
        id="reg-name"
        v-model="name"
        type="text"
        placeholder="Ваше ім'я"
        class="w-full rounded-xl border border-slate-700/80 bg-slate-950/90 px-4 py-2.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/25"
      />
      <p v-if="errors.name" class="text-xs text-rose-300">{{ errors.name }}</p>
    </div>

    <div class="space-y-2">
      <label for="reg-email" class="text-sm text-slate-300">Email *</label>
      <input
        id="reg-email"
        v-model="email"
        type="email"
        placeholder="name@example.com"
        class="w-full rounded-xl border border-slate-700/80 bg-slate-950/90 px-4 py-2.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/25"
      />
      <p v-if="errors.email" class="text-xs text-rose-300">{{ errors.email }}</p>
    </div>

    <p v-if="isFull" class="text-sm text-rose-300">
      На жаль, вільних місць більше немає.
    </p>

    <div class="flex flex-col gap-3 border-t border-slate-800/80 pt-5 sm:flex-row">
      <UiButton type="submit" :disabled="isSubmitting || isFull">
        {{ isSubmitting ? 'Надсилання...' : 'Зареєструватися' }}
      </UiButton>
    </div>
  </form>
</template>
