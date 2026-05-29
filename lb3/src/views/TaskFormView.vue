<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UiButton from '../components/ui/UiButton.vue'
import UiCard from '../components/ui/UiCard.vue'
import { useTaskStore } from '../stores/taskStore'
import type { TaskCategory, TaskPriority } from '../types/task'
import {
  CATEGORY_LABELS,
  PRIORITY_LABELS,
  todayIsoDate,
} from '../types/task'

const route = useRoute()
const router = useRouter()
const taskStore = useTaskStore()

const isEditMode = computed(() => route.name === 'task-edit')

const taskId = computed(() =>
  isEditMode.value ? Number(route.params.id) : null,
)

const existingTask = computed(() =>
  taskId.value === null ? undefined : taskStore.getTaskById(taskId.value),
)

const form = reactive({
  title: '',
  description: '',
  category: 'work' as TaskCategory,
  priority: 'medium' as TaskPriority,
  deadline: todayIsoDate(),
})

const errors = reactive({
  title: '',
  deadline: '',
})

const pageTitle = computed(() =>
  isEditMode.value ? 'Редагування задачі' : 'Нова задача',
)

function resetErrors(): void {
  errors.title = ''
  errors.deadline = ''
}

function populateFormFromTask(): void {
  if (!existingTask.value) {
    return
  }

  form.title = existingTask.value.title
  form.description = existingTask.value.description
  form.category = existingTask.value.category
  form.priority = existingTask.value.priority
  form.deadline = existingTask.value.deadline
}

watch(
  [isEditMode, existingTask],
  () => {
    resetErrors()

    if (isEditMode.value) {
      if (!existingTask.value) {
        void router.replace('/')
        return
      }

      populateFormFromTask()
      return
    }

    form.title = ''
    form.description = ''
    form.category = 'work'
    form.priority = 'medium'
    form.deadline = todayIsoDate()
  },
  { immediate: true },
)

function validateForm(): boolean {
  resetErrors()
  let isValid = true

  if (!form.title.trim()) {
    errors.title = "Назва є обов'язковим полем."
    isValid = false
  }

  if (!isEditMode.value && form.deadline < todayIsoDate()) {
    errors.deadline = 'Дедлайн не може бути у минулому.'
    isValid = false
  }

  return isValid
}

function submitForm(): void {
  if (!validateForm()) {
    return
  }

  const payload = {
    title: form.title,
    description: form.description,
    category: form.category,
    priority: form.priority,
    deadline: form.deadline,
  }

  if (isEditMode.value && existingTask.value) {
    taskStore.updateTask(existingTask.value.id, payload)
    void router.push(`/tasks/${existingTask.value.id}`)
    return
  }

  const createdTask = taskStore.addTask(payload)
  void router.push(`/tasks/${createdTask.id}`)
}

function cancelForm(): void {
  if (isEditMode.value && existingTask.value) {
    void router.push(`/tasks/${existingTask.value.id}`)
    return
  }

  void router.push('/')
}
</script>

<template>
  <section class="flex min-h-0 flex-1 flex-col gap-6">
    <header class="space-y-2">
      <h1 class="text-2xl font-semibold tracking-tight">{{ pageTitle }}</h1>
      <p class="text-sm text-slate-400">
        Заповніть поля задачі та збережіть зміни.
      </p>
    </header>

    <UiCard>
      <form class="space-y-5" @submit.prevent="submitForm">
        <div class="space-y-2">
          <label for="task-title" class="text-sm text-slate-300">Назва *</label>
          <input
            id="task-title"
            v-model="form.title"
            type="text"
            placeholder="Наприклад, Підготувати звіт"
            class="w-full rounded-xl border border-slate-700/80 bg-slate-950/90 px-4 py-2.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/25"
          />
          <p v-if="errors.title" class="text-xs text-rose-300">
            {{ errors.title }}
          </p>
        </div>

        <div class="space-y-2">
          <label for="task-description" class="text-sm text-slate-300">Опис</label>
          <textarea
            id="task-description"
            v-model="form.description"
            rows="4"
            placeholder="Додаткові деталі..."
            class="w-full rounded-xl border border-slate-700/80 bg-slate-950/90 px-4 py-2.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/25"
          />
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div class="space-y-2">
            <label for="task-category" class="text-sm text-slate-300">
              Категорія
            </label>
            <select
              id="task-category"
              v-model="form.category"
              class="w-full cursor-pointer rounded-xl border border-slate-700/80 bg-slate-950/90 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/25"
            >
              <option
                v-for="(label, key) in CATEGORY_LABELS"
                :key="key"
                :value="key"
              >
                {{ label }}
              </option>
            </select>
          </div>

          <div class="space-y-2">
            <label for="task-priority" class="text-sm text-slate-300">
              Пріоритет
            </label>
            <select
              id="task-priority"
              v-model="form.priority"
              class="w-full cursor-pointer rounded-xl border border-slate-700/80 bg-slate-950/90 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/25"
            >
              <option
                v-for="(label, key) in PRIORITY_LABELS"
                :key="key"
                :value="key"
              >
                {{ label }}
              </option>
            </select>
          </div>
        </div>

        <div class="space-y-2">
          <label for="task-deadline" class="text-sm text-slate-300">
            Дедлайн
          </label>
          <input
            id="task-deadline"
            v-model="form.deadline"
            type="date"
            class="w-full cursor-pointer rounded-xl border border-slate-700/80 bg-slate-950/90 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/25"
          />
          <p v-if="errors.deadline" class="text-xs text-rose-300">
            {{ errors.deadline }}
          </p>
        </div>

        <div class="flex flex-col gap-3 border-t border-slate-800/80 pt-5 sm:flex-row">
          <UiButton type="submit">Зберегти</UiButton>
          <UiButton type="button" variant="outline" @click="cancelForm">
            Скасувати
          </UiButton>
        </div>
      </form>
    </UiCard>
  </section>
</template>
