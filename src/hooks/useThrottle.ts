import { useCallback, useRef } from 'react'

export default function useThrottle(delay: number = 1000) {
  const lastCallTime = useRef<number>(0)

  return useCallback(
    (fn: () => void) => {
      const now = Date.now()
      if (now - lastCallTime.current >= delay) {
        fn()
        lastCallTime.current = now
      }
    },
    [delay]
  )
}
