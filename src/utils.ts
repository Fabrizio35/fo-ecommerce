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
