export function formatCurrency(value: number, currency: string): string {
  const formatters: Record<string, Intl.NumberFormat> = {
    BRL: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }),
    USD: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }),
    EUR: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }),
    GBP: new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }),
  }

  return formatters[currency]?.format(value) ?? `${currency} ${value.toFixed(2)}`
}

export function formatDate(date: Date, locale: string = 'pt-BR'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function formatProductName(name: string, maxLength: number = 100): string {
  if (name.length > maxLength) {
    return `${name.substring(0, maxLength - 3)}...`
  }
  return name
}
