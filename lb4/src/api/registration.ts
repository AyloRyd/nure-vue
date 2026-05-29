import type { RegistrationFormData } from '../types/event'

export interface RegistrationApiPayload extends RegistrationFormData {
  eventId: string
}

export interface RegistrationApiResult {
  registrationId: string
}

const FAILURE_RATE = 0.1
const REQUEST_DELAY_MS = 800

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export async function registerForEvent(
  payload: RegistrationApiPayload,
): Promise<RegistrationApiResult> {
  if (!payload.eventId || !payload.email) {
    throw new Error('Некоректні дані реєстрації.')
  }

  await wait(REQUEST_DELAY_MS)

  if (Math.random() < FAILURE_RATE) {
    throw new Error(
      'Сервер тимчасово недоступний. Спробуйте зареєструватися ще раз.',
    )
  }

  return {
    registrationId: `reg-${Date.now()}`,
  }
}
