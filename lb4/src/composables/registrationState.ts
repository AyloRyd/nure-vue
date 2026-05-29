import { ref } from 'vue'
import type { Registration } from '../types/event'
import { useLocalStorage } from './useLocalStorage'

const STORAGE_KEY = 'lb4-registrations'

export const registrations = ref<Registration[]>([])
export const isSubmitting = ref(false)

let isInitialized = false

function isRegistrationArray(value: unknown): value is Registration[] {
  if (!Array.isArray(value)) {
    return false
  }

  return value.every((item) => {
    if (!item || typeof item !== 'object') {
      return false
    }

    const registration = item as Record<string, unknown>
    return (
      typeof registration.id === 'string' &&
      typeof registration.eventId === 'string' &&
      typeof registration.name === 'string' &&
      typeof registration.email === 'string' &&
      typeof registration.registeredAt === 'string'
    )
  })
}

const storage = useLocalStorage(STORAGE_KEY, isRegistrationArray, [])

export function ensureRegistrationsInitialized(): void {
  if (isInitialized) {
    return
  }

  registrations.value = storage.load()
  isInitialized = true
}

export function persistRegistrations(): void {
  storage.save(registrations.value)
}

export function getRegistrationsCount(eventId: string): number {
  ensureRegistrationsInitialized()
  return registrations.value.filter(
    (registration) => registration.eventId === eventId,
  ).length
}
