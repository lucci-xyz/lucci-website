'use client'

import { useEffect } from 'react'

/**
 * ScrollAnimations component that handles intersection observer for scroll-triggered animations
 * Automatically adds 'in-view' class to elements with 'animate-on-scroll' class when they enter viewport
 * 
 * This component doesn't render anything visible - it only sets up the animation observers
 */
export default function ScrollAnimations() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
        }
      })
    }, observerOptions)

    // Observe all elements with animate-on-scroll class
    const animateElements = document.querySelectorAll('.animate-on-scroll')
    animateElements.forEach((el) => observer.observe(el))

    return () => {
      animateElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return null // This component doesn't render anything
}
