import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { fitnessLibrary, type FitnessItem } from './data/content'

const KEY = 'forma-uploads'

type LibraryCtx = {
  items: FitnessItem[]
  addItem: (item: FitnessItem) => void
  removeItem: (id: string) => void
}

const Ctx = createContext<LibraryCtx | null>(null)

function loadUploads(): FitnessItem[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as FitnessItem[]) : []
  } catch {
    return []
  }
}

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [uploads, setUploads] = useState<FitnessItem[]>(loadUploads)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(uploads))
  }, [uploads])

  const value = useMemo<LibraryCtx>(
    () => ({
      items: [...uploads, ...fitnessLibrary],
      addItem: (item) => setUploads((prev) => [item, ...prev]),
      removeItem: (id) => setUploads((prev) => prev.filter((x) => x.id !== id)),
    }),
    [uploads],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useLibrary() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useLibrary outside provider')
  return ctx
}

/** Compress image for localStorage */
export function fileToCoverDataUrl(file: File, maxSide = 1280): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('read failed'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('image failed'))
      img.onload = () => {
        const scale = Math.min(1, maxSide / Math.max(img.width, img.height))
        const w = Math.round(img.width * scale)
        const h = Math.round(img.height * scale)
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('canvas failed'))
          return
        }
        ctx.drawImage(img, 0, 0, w, h)
        resolve(canvas.toDataURL('image/jpeg', 0.82))
      }
      img.src = String(reader.result)
    }
    reader.readAsDataURL(file)
  })
}
