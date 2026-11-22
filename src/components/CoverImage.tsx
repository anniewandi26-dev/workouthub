import { useEffect, useState } from 'react'

type Props = {
  src: string
  alt: string
  className?: string
}

const FALLBACK = '/covers/01.jpg'

export function CoverImage({ src, alt, className }: Props) {
  const [current, setCurrent] = useState(src)

  useEffect(() => {
    setCurrent(src)
  }, [src])

  const isCss = current.startsWith('linear-gradient') || current.startsWith('radial-gradient')

  if (isCss) {
    return <div className={className} style={{ background: current }} role="img" aria-label={alt} />
  }

  return (
    <img
      className={className}
      src={current}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => {
        if (current !== FALLBACK) setCurrent(FALLBACK)
      }}
    />
  )
}
