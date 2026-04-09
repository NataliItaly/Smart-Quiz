export function getStoredItem<T>(key: string): T | null {
  const stored = localStorage.getItem(key)
  if (!stored) return null

  try {
    return JSON.parse(stored) as T
  } catch {
    return null
  }
}