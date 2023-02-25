import { useEffect, useState } from 'react'

export function useIsMounted(): boolean {
  let [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted
}
