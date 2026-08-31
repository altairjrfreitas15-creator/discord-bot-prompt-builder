import React from 'react'
import { Card, Button } from '@/components'
import { useNavigate } from 'react-router-dom'

const TEMPLATES = [
  { id: 1, name: 'Gaming Store', emoji: '🎮', description: 'Loja de itens e códigos para jogos' },
  { id: 2, name: 'Digital Store', emoji: '🛒', description: 'Loja de produtos e serviços digitais' },
  { id: 3, name: 'Key Store', emoji: '🔑', description: 'Loja especializada em chaves de produtos' },
  { id: 4, name: 'Subscription Store', emoji: '⭐', description: 'Sistema de assinaturas e memberships' },
  { id: 5, name: 'Ticket Bot', emoji: '🎟️', description: 'Bot de suporte com sistema de tickets' },
  { id: 6, name: 'Marketplace', emoji: '📦', description: 'Plataforma de vendas multi-vendedor' },
]

const Templates: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-dark-50 mb-2">Templates</h1>
      <p className="text-dark-400 mb-8">Escolha um template para começar rapidamente</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEMPLATES.map((template) => (
          <Card key={template.id} hover className="p-6 flex flex-col">
            <div className="text-4xl mb-4">{template.emoji}</div>
            <h3 className="text-lg font-bold text-dark-50 mb-2">{template.name}</h3>
            <p className="text-sm text-dark-400 flex-1 mb-4">{template.description}</p>
            <Button size="sm" onClick={() => navigate('/new-bot')}>Usar template</Button>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Templates
