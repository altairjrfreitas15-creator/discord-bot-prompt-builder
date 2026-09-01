import { BotProject } from '@/types'

export function validateProject(project: BotProject): string[] {
  const errors: string[] = []

  if (!project.name) errors.push('Nome do projeto é obrigatório')
  if (!project.botName) errors.push('Nome do bot é obrigatório')
  if (project.config.products.length === 0) errors.push('Nenhum produto configurado')
  if (!project.config.payments.enabled && project.config.payments.methods.length === 0) {
    errors.push('Nenhum método de pagamento configurado')
  }
  if (!project.config.logs.channels.sales) errors.push('Canal de logs de vendas não definido')
  if (!project.config.logs.channels.payments) errors.push('Canal de logs de pagamentos não definido')
  if (!project.config.logs.channels.errors) errors.push('Canal de logs de erros não definido')

  return errors
}

export function suggestImprovements(project: BotProject): string[] {
  const suggestions: string[] = []

  if (project.config.products.length < 5) suggestions.push('Considere adicionar mais produtos ao catálogo')
  if (!project.config.appearance.avatar) suggestions.push('Defina um avatar para o bot')
  if (!project.config.coupons.length) suggestions.push('Nenhum cupom foi criado. Isso pode aumentar conversões')
  if (!project.config.tickets.enabled) suggestions.push('Habilite o sistema de tickets para melhor suporte')
  if (project.config.database.type === 'sqlite') suggestions.push('Para produção, considere usar PostgreSQL')

  return suggestions
}
