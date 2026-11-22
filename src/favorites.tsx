import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

type FavCtx = {
  saved: Set<string>
  toggle: (id: string) => void
  has: (id: string) => boolean
  clear: () => void
  remove: (id: string) => void
  count: number
}

const Ctx = createContext<FavCtx | null>(null)
const KEY = 'workouthub-saved-v1'

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(KEY) ?? localStorage.getItem('forma-saved')
      return new Set(raw ? (JSON.parse(raw) as string[]) : [])
    } catch {
      return new Set()
    }
  })

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify([...saved]))
  }, [saved])

  const value = useMemo<FavCtx>(
    () => ({
      saved,
      count: saved.size,
      toggle: (id) =>
        setSaved((prev) => {
          const next = new Set(prev)
          if (next.has(id)) next.delete(id)
          else next.add(id)
          return next
        }),
      remove: (id) =>
        setSaved((prev) => {
          const next = new Set(prev)
          next.delete(id)
          return next
        }),
      clear: () => setSaved(new Set()),
      has: (id) => saved.has(id),
    }),
    [saved],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useFavorites() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useFavorites outside provider')
  return ctx
}
