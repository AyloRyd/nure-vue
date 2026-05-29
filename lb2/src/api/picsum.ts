import type { PicsumImage } from '../types/picsum'

const API_BASE = 'https://picsum.photos/v2/list'

export async function fetchImages(
  page = 1,
  limit = 20,
): Promise<PicsumImage[]> {
  const url = new URL(API_BASE)
  url.searchParams.set('page', String(page))
  url.searchParams.set('limit', String(limit))

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(
      `Помилка сервера: ${response.status} ${response.statusText}`,
    )
  }

  const data: unknown = await response.json()

  if (!Array.isArray(data)) {
    throw new Error('Некоректний формат відповіді API')
  }

  return data as PicsumImage[]
}
