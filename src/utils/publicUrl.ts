/** Prefix public/ asset paths with Vite BASE_URL (needed for GitHub Pages). */
export function publicUrl(path: string): string {
  const base = import.meta.env.BASE_URL || '/'
  return `${base}${path.replace(/^\//, '')}`
}
