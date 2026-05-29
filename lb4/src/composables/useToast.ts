export type ToastType = 'success' | 'error'

export interface ToastPayload {
  type: ToastType
  message: string
  durationMs?: number
}

export interface ToastItem extends ToastPayload {
  id: number
}
