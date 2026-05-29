export function loadFromStorage<T>(
  key: string,
  isValid: (value: unknown) => value is T,
  fallback: T,
): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) {
      return fallback
    }

    const parsed: unknown = JSON.parse(raw)
    if (!isValid(parsed)) {
      return fallback
    }

    return parsed
  } catch {
    return fallback
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore quota / private mode errors
  }
}

export function useLocalStorage<T>(
  key: string,
  isValid: (value: unknown) => value is T,
  fallback: T,
) {
  function load(): T {
    return loadFromStorage(key, isValid, fallback)
  }

  function save(value: T): void {
    saveToStorage(key, value)
  }

  return { load, save }
}
