import { defineStore } from 'pinia'
import { watch } from 'vue'
import type { Task, TaskCategory, TaskInput } from '../types/task'
import { isOverdue, isUpcoming, todayIsoDate } from '../types/task'

const STORAGE_KEY = 'lb3-tasks'

function createDefaultTasks(): Task[] {
  const today = todayIsoDate()
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const tomorrowIso = tomorrow.toISOString().slice(0, 10)

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayIso = yesterday.toISOString().slice(0, 10)

  return [
    {
      id: 1,
      title: 'Підготувати презентацію',
      description: 'Зібрати слайди та перевірити демонстрацію.',
      category: 'work',
      priority: 'high',
      deadline: tomorrowIso,
      completed: false,
    },
    {
      id: 2,
      title: 'Купити продукти',
      description: 'Овочі, молочні продукти, хліб.',
      category: 'personal',
      priority: 'medium',
      deadline: today,
      completed: false,
    },
    {
      id: 3,
      title: 'Переглянути лекцію',
      description: 'Повторити матеріал з минулого тижня.',
      category: 'study',
      priority: 'low',
      deadline: yesterdayIso,
      completed: false,
    },
  ]
}

function isValidTask(value: unknown): value is Task {
  if (!value || typeof value !== 'object') {
    return false
  }

  const task = value as Record<string, unknown>
  return (
    typeof task.id === 'number' &&
    typeof task.title === 'string' &&
    typeof task.description === 'string' &&
    (task.category === 'work' ||
      task.category === 'personal' ||
      task.category === 'study') &&
    (task.priority === 'low' ||
      task.priority === 'medium' ||
      task.priority === 'high') &&
    typeof task.deadline === 'string' &&
    typeof task.completed === 'boolean'
  )
}

function loadTasksFromStorage(): Task[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return null
    }

    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed) || !parsed.every(isValidTask)) {
      return null
    }

    return parsed
  } catch {
    return null
  }
}

function saveTasksToStorage(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: loadTasksFromStorage() ?? createDefaultTasks(),
  }),

  getters: {
    activeTasks(state): Task[] {
      return state.tasks.filter((task) => !task.completed)
    },

    completedTasks(state): Task[] {
      return state.tasks.filter((task) => task.completed)
    },

    overdueTasks(state): Task[] {
      return state.tasks.filter((task) => isOverdue(task))
    },

    tasksByCategory(state): Record<TaskCategory, number> {
      return {
        work: state.tasks.filter((task) => task.category === 'work').length,
        personal: state.tasks.filter((task) => task.category === 'personal')
          .length,
        study: state.tasks.filter((task) => task.category === 'study').length,
      }
    },

    upcomingDeadlines(state): Task[] {
      return state.tasks
        .filter((task) => isUpcoming(task))
        .sort(
          (left, right) =>
            left.deadline.localeCompare(right.deadline) ||
            left.title.localeCompare(right.title, 'uk'),
        )
    },

    statsSummary(state): {
      total: number
      active: number
      completed: number
      overdue: number
      completionRate: number
    } {
      const total = state.tasks.length
      const completed = state.tasks.filter((task) => task.completed).length
      const active = total - completed
      const overdue = state.tasks.filter((task) => isOverdue(task)).length
      const completionRate =
        total === 0 ? 0 : Math.round((completed / total) * 100)

      return {
        total,
        active,
        completed,
        overdue,
        completionRate,
      }
    },

    getTaskById:
      (state) =>
      (id: number): Task | undefined => {
        return state.tasks.find((task) => task.id === id)
      },
  },

  actions: {
    addTask(payload: TaskInput): Task {
      const task: Task = {
        id: Date.now(),
        title: payload.title.trim(),
        description: payload.description.trim(),
        category: payload.category,
        priority: payload.priority,
        deadline: payload.deadline,
        completed: payload.completed ?? false,
      }

      this.tasks.unshift(task)
      return task
    },

    updateTask(id: number, payload: Partial<TaskInput>): void {
      const index = this.tasks.findIndex((task) => task.id === id)
      if (index === -1) {
        return
      }

      const current = this.tasks[index]
      this.tasks[index] = {
        ...current,
        ...payload,
        title: payload.title?.trim() ?? current.title,
        description: payload.description?.trim() ?? current.description,
      }
    },

    deleteTask(id: number): void {
      this.tasks = this.tasks.filter((task) => task.id !== id)
    },

    toggleTaskStatus(id: number): void {
      const task = this.tasks.find((item) => item.id === id)
      if (!task) {
        return
      }

      task.completed = !task.completed
    },
  },
})

export function setupTaskStorePersistence(): void {
  const store = useTaskStore()

  watch(
    () => store.tasks,
    (tasks) => {
      saveTasksToStorage(tasks)
    },
    { deep: true },
  )
}
