import { computed, ref } from 'vue'
import { eventsCatalog } from '../data/events'
import type { EventItem } from '../types/event'
import { getRegistrationsCount } from './registrationState'

const events = ref<EventItem[]>(eventsCatalog)

export function useEvents() {
  const getEventById = (id: string): EventItem | undefined => {
    return events.value.find((event) => event.id === id)
  }

  const getAvailableSpots = (eventId: string): number => {
    const event = getEventById(eventId)
    if (!event) {
      return 0
    }

    return Math.max(event.capacity - getRegistrationsCount(eventId), 0)
  }

  const isEventFull = (eventId: string): boolean => {
    return getAvailableSpots(eventId) === 0
  }

  return {
    events: computed(() => events.value),
    getEventById,
    getAvailableSpots,
    isEventFull,
  }
}
