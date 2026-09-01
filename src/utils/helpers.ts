export function generateCouponCode(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase()
}

export function generateOrderId(): string {
  return `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validateProductPrice(price: number): boolean {
  return price > 0 && Number.isFinite(price)
}

export function validateStock(stock: number): boolean {
  return stock >= 0 && Number.isInteger(stock)
}

export function sanitizeString(str: string): string {
  return str
    .trim()
    .replace(/[<>]/g, '')
    .substring(0, 255)
}
