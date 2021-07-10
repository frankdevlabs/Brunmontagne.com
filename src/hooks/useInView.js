import { useRef, useState, useEffect } from "react"

const useInView = (options, cb, fireOnce) => {
  const containerRef = useRef(null)
  const [isInView, setIsInView] = useState(false)
  const [hasBeenViewed, setHasBeenViewed] = useState(false)

  useEffect(() => {
    let observerRefValue = null

    const callbackFunction = entries => {
      const [entry] = entries
      setIsInView(entry.isIntersecting)

      if (fireOnce && hasBeenViewed) return

      if (isInView && !hasBeenViewed) setHasBeenViewed(entry.isIntersecting)

      cb()
    }

    const observer = new IntersectionObserver(callbackFunction, options)
    if (containerRef.current) {
      observer.observe(containerRef.current)
      observerRefValue = containerRef.current
    }

    return () => {
      if (observerRefValue) observer.unobserve(observerRefValue)
    }
  }, [containerRef, isInView, hasBeenViewed, fireOnce, cb, options])

  return [containerRef, isInView]
}

export default useInView
