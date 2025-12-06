import { useState, useEffect } from 'react'

const getInitialMatch = (query) => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false
  }
  return window.matchMedia(query).matches
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => getInitialMatch(query))

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return
    }

    const mediaQueryList = window.matchMedia(query)
    const handleChange = (event) => {
      setMatches(event.matches)
    }

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', handleChange)
    } else if (mediaQueryList.addListener) {
      mediaQueryList.addListener(handleChange)
    }

    setMatches(mediaQueryList.matches)

    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', handleChange)
      } else if (mediaQueryList.removeListener) {
        mediaQueryList.removeListener(handleChange)
      }
    }
  }, [query])

  return matches
}

export default useMediaQuery
