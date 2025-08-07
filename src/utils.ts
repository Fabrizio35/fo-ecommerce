export const discountedPrice = (price: number, discount: number): number => {
  const finalPrice = price - (price * discount) / 100
  return finalPrice
}
