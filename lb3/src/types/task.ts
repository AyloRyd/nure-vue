export type TaskPriority = 'low' | 'medium' | 'high'
export type TaskCategory = 'work' | 'personal' | 'study'

export interface Task {
  id: number
  title: string
  description: string
  category: TaskCategory
  priority: TaskPriority
  deadline: string
  completed: boolean
}

export type TaskInput = Omit<Task, 'id' | 'completed'> & {
  completed?: boolean
}

export type CategoryFilter = TaskCategory | 'all'
export type PriorityFilter = TaskPriority | 'all'
export type SortBy = 'deadline' | 'priority'

export const CATEGORY_LABELS: Record<TaskCategory, string> = {
  work: 'Робота',
  personal: 'Особисте',
  study: 'Навчання',
}

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: 'Низький',
  medium: 'Середній',
  high: 'Високий',
}

export const PRIORITY_ORDER: Record<TaskPriority, number> = {
  high: 0,
  medium: 1,
  low: 2,
}

export function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function todayIsoDate(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function parseIsoDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function isOverdue(task: Task): boolean {
  if (task.completed) {
    return false
  }

  const today = parseIsoDate(todayIsoDate())
  const deadline = parseIsoDate(task.deadline)
  return deadline < today
}

export function isUpcoming(task: Task, withinDays = 3): boolean {
  if (task.completed) {
    return false
  }

  const today = parseIsoDate(todayIsoDate())
  const deadline = parseIsoDate(task.deadline)
  const limit = new Date(today)
  limit.setDate(limit.getDate() + withinDays)

  return deadline >= today && deadline <= limit
}
