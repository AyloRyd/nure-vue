import { ref } from 'vue'
import type { ToastItem, ToastPayload } from './useToast'

const toasts = ref<ToastItem[]>([])
let nextToastId = 1

export function useToast() {
  function pushToast(payload: ToastPayload): void {
    const id = nextToastId++
    toasts.value.push({ id, ...payload })

    window.setTimeout(() => {
      removeToast(id)
    }, payload.durationMs ?? 4000)
  }

  function removeToast(id: number): void {
    toasts.value = toasts.value.filter((toast) => toast.id !== id)
  }

  return {
    toasts,
    pushToast,
    removeToast,
  }
}

export { toasts }
