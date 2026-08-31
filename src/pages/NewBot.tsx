import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Input } from '@/components'
import { ChevronRight, ChevronLeft, Check } from 'lucide-react'
import { useProjectStore } from '@/store/projectStore'
import { useUIStore } from '@/store/uiStore'

const STEPS = [
  'Informações',
  'Loja',
  'Produtos',
  'Pedidos',
  'Pagamentos',
  'Estoque',
  'Tickets',
  'Administração',
  'Visual',
  'Segurança',
  'Revisão',
  'Gerar Prompt',
]

const NewBot: React.FC = () => {
  const navigate = useNavigate()
  const { createProject, currentProject, updateProject } = useProjectStore()
  const { currentStep, setCurrentStep, addToast } = useUIStore()
  const [formData, setFormData] = useState({
    name: '',
    botName: '',
    storeName: '',
    description: '',
    language: 'pt-BR',
    currency: 'BRL',
    serverType: 'store',
  })

  const handleNext = () => {
    if (currentStep === 0) {
      if (!formData.name || !formData.botName) {
        addToast({
          type: 'warning',
          message: 'Preencha todos os campos obrigatórios',
          duration: 3000,
        })
        return
      }
      const project = createProject(formData.name)
      updateProject({
        ...project,
        ...formData,
      })
    }
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      navigate('/generator')
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    } else {
      navigate('/')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          {STEPS.map((step, idx) => (
            <div key={idx} className="flex items-center">
              <button
                onClick={() => setCurrentStep(idx)}
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all ${
                  idx <= currentStep
                    ? 'bg-primary-600 text-white'
                    : 'bg-dark-800 text-dark-400 hover:bg-dark-700'
                }`}
              >
                {idx < currentStep ? <Check size={16} /> : idx + 1}
              </button>
              {idx < STEPS.length - 1 && (
                <div className={`h-1 w-8 mx-1 rounded ${
                  idx < currentStep ? 'bg-primary-600' : 'bg-dark-800'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-dark-50">{STEPS[currentStep]}</h2>
          <span className="text-sm text-dark-400">{currentStep + 1} de {STEPS.length}</span>
        </div>
      </div>

      {/* Step Content */}
      <Card className="p-8 mb-8">
        {currentStep === 0 && (
          <div className="space-y-6">
            <div>
              <Input
                label="Nome do projeto"
                placeholder="Ex: Nova Store Bot"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Nome do bot"
                placeholder="Ex: NovaStore"
                name="botName"
                value={formData.botName}
                onChange={handleInputChange}
              />
              <Input
                label="Nome da loja"
                placeholder="Ex: Loja Premium"
                name="storeName"
                value={formData.storeName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <textarea
                placeholder="Descrição do projeto..."
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="input-base resize-none h-24"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-dark-300">Idioma</label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="input-base"
                >
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en-US">Inglês</option>
                  <option value="es-ES">Espanhol</option>
                  <option value="fr-FR">Francês</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-dark-300">Moeda</label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  className="input-base"
                >
                  <option value="BRL">BRL - Real</option>
                  <option value="USD">USD - Dólar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - Libra</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-dark-300">Tipo de servidor</label>
                <select
                  name="serverType"
                  value={formData.serverType}
                  onChange={handleInputChange}
                  className="input-base"
                >
                  <option value="store">Loja</option>
                  <option value="marketplace">Marketplace</option>
                  <option value="community">Comunidade</option>
                  <option value="support">Suporte</option>
                  <option value="game-store">Loja de jogos</option>
                  <option value="digital-products">Produtos digitais</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="text-center py-12">
            <p className="text-dark-400 mb-4">🛒 Configuração de Loja</p>
            <p className="text-sm text-dark-500">Este passo permite configurar as opções gerais da loja.</p>
            <p className="text-sm text-dark-500 mt-2">Será implementado em breve...</p>
          </div>
        )}

        {currentStep > 1 && currentStep < STEPS.length - 1 && (
          <div className="text-center py-12">
            <p className="text-dark-400 mb-4">🚀 Passo {currentStep + 1}: {STEPS[currentStep]}</p>
            <p className="text-sm text-dark-500">Este passo será configurável em breve...</p>
          </div>
        )}

        {currentStep === STEPS.length - 1 && (
          <div className="text-center py-12">
            <p className="text-dark-400 mb-4">✨ Pronto para gerar!</p>
            <p className="text-sm text-dark-500">Clique em "Gerar Prompt" para criar a especificação do seu bot.</p>
          </div>
        )}
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="secondary" onClick={handlePrev}>
          <ChevronLeft size={20} />
          Voltar
        </Button>
        <Button onClick={handleNext}>
          {currentStep === STEPS.length - 1 ? 'Gerar Prompt' : 'Próximo'}
          <ChevronRight size={20} />
        </Button>
      </div>
    </div>
  )
}

export default NewBot
