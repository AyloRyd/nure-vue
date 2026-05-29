export type EventCategory = 'tech' | 'culture' | 'sport'
export type CategoryFilter = EventCategory | 'all'

export interface EventItem {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: EventCategory
  capacity: number
}

export interface Registration {
  id: string
  eventId: string
  name: string
  email: string
  registeredAt: string
}

export interface RegistrationFormData {
  name: string
  email: string
}

export const CATEGORY_LABELS: Record<EventCategory, string> = {
  tech: 'Технології',
  culture: 'Культура',
  sport: 'Спорт',
}

export function formatEventDate(date: string, time: string): string {
  const [year, month, day] = date.split('-').map(Number)
  const parsed = new Date(year, month - 1, day)
  const formattedDate = parsed.toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  return `${formattedDate}, ${time}`
}

export function formatRegistrationDate(iso: string): string {
  return new Date(iso).toLocaleString('uk-UA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}
