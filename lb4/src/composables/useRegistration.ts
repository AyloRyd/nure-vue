import { registerForEvent } from '../api/registration'
import type { Registration, RegistrationFormData } from '../types/event'
import { isValidEmail } from '../types/event'
import {
  ensureRegistrationsInitialized,
  getRegistrationsCount,
  isSubmitting,
  persistRegistrations,
  registrations,
} from './registrationState'
import { useToast } from './toastState'

export function useRegistration() {
  ensureRegistrationsInitialized()

  const { pushToast } = useToast()

  function getRegistrationsForEvent(eventId: string): Registration[] {
    return registrations.value
      .filter((registration) => registration.eventId === eventId)
      .sort(
        (left, right) =>
          right.registeredAt.localeCompare(left.registeredAt) ||
          left.name.localeCompare(right.name, 'uk'),
      )
  }

  function isEmailRegistered(eventId: string, email: string): boolean {
    const normalizedEmail = email.trim().toLowerCase()
    return registrations.value.some(
      (registration) =>
        registration.eventId === eventId &&
        registration.email.toLowerCase() === normalizedEmail,
    )
  }

  function validateForm(form: RegistrationFormData): string | null {
    const name = form.name.trim()
    const email = form.email.trim()

    if (!name) {
      return "Ім'я є обов'язковим полем."
    }

    if (!email) {
      return "Email є обов'язковим полем."
    }

    if (!isValidEmail(email)) {
      return 'Введіть коректну email-адресу.'
    }

    return null
  }

  async function submitRegistration(
    eventId: string,
    form: RegistrationFormData,
    capacity: number,
  ): Promise<boolean> {
    const validationError = validateForm(form)
    if (validationError) {
      pushToast({ type: 'error', message: validationError })
      return false
    }

    if (isEmailRegistered(eventId, form.email)) {
      pushToast({
        type: 'error',
        message: 'Цей email уже зареєстрований на подію.',
      })
      return false
    }

    if (getRegistrationsCount(eventId) >= capacity) {
      pushToast({
        type: 'error',
        message: 'На жаль, вільних місць більше немає.',
      })
      return false
    }

    const optimisticRegistration: Registration = {
      id: `temp-${Date.now()}`,
      eventId,
      name: form.name.trim(),
      email: form.email.trim(),
      registeredAt: new Date().toISOString(),
    }

    const snapshot = [...registrations.value]
    registrations.value = [optimisticRegistration, ...registrations.value]
    persistRegistrations()
    isSubmitting.value = true

    try {
      const result = await registerForEvent({
        eventId,
        name: optimisticRegistration.name,
        email: optimisticRegistration.email,
      })

      registrations.value = registrations.value.map((registration) =>
        registration.id === optimisticRegistration.id
          ? { ...registration, id: result.registrationId }
          : registration,
      )
      persistRegistrations()

      pushToast({
        type: 'success',
        message: 'Реєстрацію успішно підтверджено.',
      })
      return true
    } catch (error) {
      registrations.value = snapshot
      persistRegistrations()

      pushToast({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Не вдалося завершити реєстрацію.',
      })
      return false
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    registrations,
    isSubmitting,
    getRegistrationsForEvent,
    isEmailRegistered,
    submitRegistration,
    validateForm,
  }
}
