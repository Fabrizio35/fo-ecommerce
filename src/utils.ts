import { createJSONStorage } from 'zustand/middleware'

export const discountedPrice = (price: number, discount: number): number => {
  const finalPrice = price - (price * discount) / 100
  return finalPrice
}

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

const encode = (value: string) => {
  const encoder = new TextEncoder()
  const bytes = encoder.encode(value)
  return btoa(String.fromCharCode(...bytes))
}

const decode = (value: string) => {
  const binary = atob(value)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  const decoder = new TextDecoder()
  return decoder.decode(bytes)
}

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
