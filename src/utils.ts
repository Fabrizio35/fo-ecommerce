import { createJSONStorage } from 'zustand/middleware'

// Utility function to calculate the discounted price
export const discountedPrice = (price: number, discount: number): number => {
  const finalPrice = price - (price * discount) / 100
  return finalPrice
}

// Format date and time to a specific locale
// This function formats the date to 'dd/mm/yy, hh:mm' in 'es-AR' locale
export const formatDateTime = (isoString: string): string => {
  const date = new Date(isoString)

  return date.toLocaleString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Utility functions to encode and decode data for "secure" storage
// Using Base64 encoding for simplicity, but consider using a more secure method in production
const encode = (value: string) => {
  const encoder = new TextEncoder()
  const bytes = encoder.encode(value)
  return btoa(String.fromCharCode(...bytes))
}

// Decode function to convert Base64 back to string
// Note: This is a simple implementation and may not be secure for sensitive data
const decode = (value: string) => {
  const binary = atob(value)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  const decoder = new TextDecoder()
  return decoder.decode(bytes)
}

// Create a secure storage using Base64 encoding for the data
// Note: This is a basic implementation and should be replaced with a more secure method in production
export const secureStorage = createJSONStorage(() => ({
  getItem: (name) => {
    const encoded = localStorage.getItem(name)
    return encoded ? JSON.parse(decode(encoded)) : null
  },
  setItem: (name, value) => {
    const stringified = JSON.stringify(value)
    localStorage.setItem(name, encode(stringified))
  },
  removeItem: (name) => {
    localStorage.removeItem(name)
  },
}))
