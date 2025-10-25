"use client"

import { useState, useEffect } from "react"

let toastCount = 0

export function useToast() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    const timer = setInterval(() => {
      setToasts((prevToasts) => {
        const now = Date.now()
        return prevToasts.filter((toast) => now - toast.createdAt < 5000)
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const toast = ({ title, description, variant = "default" }) => {
    const id = toastCount++
    const newToast = {
      id,
      title,
      description,
      variant,
      createdAt: Date.now(),
    }
    setToasts((prevToasts) => [...prevToasts, newToast])
  }

  return { toast, toasts }
}
