<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Circle,
  Pencil,
  Trash2,
} from '@lucide/vue'
import TaskNotFound from '../components/TaskNotFound.vue'
import UiButton from '../components/ui/UiButton.vue'
import UiCard from '../components/ui/UiCard.vue'
import { useTaskStore } from '../stores/taskStore'
import {
  CATEGORY_LABELS,
  PRIORITY_LABELS,
  formatDate,
  isOverdue,
} from '../types/task'

const route = useRoute()
const router = useRouter()
const taskStore = useTaskStore()

const taskId = computed(() => Number(route.params.id))

const task = computed(() => taskStore.getTaskById(taskId.value))

function toggleStatus(): void {
  if (!task.value) {
    return
  }

  taskStore.toggleTaskStatus(task.value.id)
}

function deleteTask(): void {
  if (!task.value) {
    return
  }

  taskStore.deleteTask(task.value.id)
  void router.push('/')
}
</script>

<template>
  <TaskNotFound v-if="!task" />

  <section v-else class="flex min-h-0 flex-1 flex-col gap-6">
    <header class="space-y-2">
      <div class="flex flex-wrap items-center gap-2">
        <h1 class="text-2xl font-semibold tracking-tight text-slate-100">
          {{ task.title }}
        </h1>
        <span
          v-if="task.completed"
          class="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300 ring-1 ring-emerald-500/20"
        >
          <CheckCircle2 class="size-3.5" aria-hidden="true" />
          Виконано
        </span>
        <span
          v-else-if="isOverdue(task)"
          class="inline-flex items-center gap-1 rounded-md bg-rose-500/10 px-2 py-1 text-xs text-rose-300 ring-1 ring-rose-500/20"
        >
          <AlertCircle class="size-3.5" aria-hidden="true" />
          Прострочено
        </span>
      </div>
      <p class="text-sm text-slate-400">Деталі задачі та керування статусом.</p>
    </header>

    <UiCard class="space-y-5">
      <div class="grid gap-4 sm:grid-cols-2">
        <div>
          <p class="text-xs uppercase tracking-wide text-slate-500">Категорія</p>
          <p class="mt-1 text-sm text-slate-100">
            {{ CATEGORY_LABELS[task.category] }}
          </p>
        </div>
        <div>
          <p class="text-xs uppercase tracking-wide text-slate-500">Пріоритет</p>
          <p class="mt-1 text-sm text-slate-100">
            {{ PRIORITY_LABELS[task.priority] }}
          </p>
        </div>
        <div>
          <p class="text-xs uppercase tracking-wide text-slate-500">Дедлайн</p>
          <p
            class="mt-1 inline-flex items-center gap-1.5 text-sm"
            :class="isOverdue(task) ? 'text-rose-300' : 'text-slate-100'"
          >
            <CalendarDays class="size-4" aria-hidden="true" />
            {{ formatDate(task.deadline) }}
          </p>
        </div>
        <div>
          <p class="text-xs uppercase tracking-wide text-slate-500">Статус</p>
          <p class="mt-1 text-sm text-slate-100">
            {{ task.completed ? 'Виконано' : 'Активна' }}
          </p>
        </div>
      </div>

      <div>
        <p class="text-xs uppercase tracking-wide text-slate-500">Опис</p>
        <p class="mt-2 text-sm leading-relaxed text-slate-300">
          {{ task.description || 'Опис не вказано.' }}
        </p>
      </div>

      <div class="flex flex-col gap-3 border-t border-slate-800/80 pt-5 sm:flex-row sm:flex-wrap">
        <UiButton type="button" class="gap-2" @click="toggleStatus">
          <component
            :is="task.completed ? Circle : CheckCircle2"
            class="size-4"
            aria-hidden="true"
          />
          {{ task.completed ? 'Позначити активною' : 'Позначити виконаною' }}
        </UiButton>

        <RouterLink :to="`/tasks/${task.id}/edit`">
          <UiButton type="button" variant="outline" class="w-full gap-2 sm:w-auto">
            <Pencil class="size-4" aria-hidden="true" />
            Редагувати
          </UiButton>
        </RouterLink>

        <UiButton type="button" variant="danger" class="gap-2" @click="deleteTask">
          <Trash2 class="size-4" aria-hidden="true" />
          Видалити
        </UiButton>
      </div>
    </UiCard>
  </section>
</template>
