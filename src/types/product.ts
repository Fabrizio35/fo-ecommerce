// Product type definition for the application
// This type is used to represent a product in the application
export type Product = {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand: string
  sku: string
  weight: number
  dimensions: {
    width: number
    height: number
    depth: number
  }
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  reviews: {
    rating: number
    comment: string
    date: string
    reviewerName: string
    reviewerEmail: string
  }[]
  returnPolicy: string
  minimumOrderQuantity: number
  meta: {
    createdAt: string
    updatedAt: string
    barcode: string
    qrCode: string
  }
  thumbnail: string
  images: string[]
}

// Cart product type for the store
// This type is used to represent products in the shopping cart
export type CartProduct = {
  id: Product['id']
  thumbnail: Product['thumbnail']
  title: Product['title']
  brand: Product['brand']
  price: Product['price']
  stock: Product['stock']
  quantity: number
}
