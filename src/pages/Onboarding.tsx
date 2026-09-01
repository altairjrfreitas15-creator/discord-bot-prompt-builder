import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button } from '@/components'
import { Sparkles, ArrowRight, CheckCircle } from 'lucide-react'

const Onboarding: React.FC = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: '🎨',
      title: 'Interface SaaS Moderna',
      description: 'Design profissional com dark mode e animações suaves',
    },
    {
      icon: '🤖',
      title: 'Gerador de Prompt Inteligente',
      description: 'Cria especificações técnicas detalhadas automaticamente',
    },
    {
      icon: '🔧',
      title: 'Construtor Visual',
      description: 'Configure seu bot sem escrever uma linha de código',
    },
    {
      icon: '💾',
      title: 'Persista seus Dados',
      description: 'Salve e edite projetos a qualquer momento',
    },
    {
      icon: '📱',
      title: 'Responsivo',
      description: 'Funciona perfeitamente em desktop, tablet e celular',
    },
    {
      icon: '⚡',
      title: '12 Tipos de Bots',
      description: 'Lojas, Marketplaces, Suporte, Comunidades e mais',
    },
  ]

  const steps = [
    { number: 1, title: 'Criar Projeto', description: 'Clique em "Novo Bot" e preencha as informações' },
    { number: 2, title: 'Configurar', description: 'Siga o assistente de 12 etapas' },
    { number: 3, title: 'Gerar', description: 'O sistema cria o prompt automaticamente' },
    { number: 4, title: 'Usar', description: 'Forneça o prompt a uma IA para criar seu bot' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
      {/* Hero */}
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full mb-6">
          <Sparkles size={16} className="text-primary-400" />
          <span className="text-sm text-primary-300 font-medium">Bem-vindo ao Discord Bot Prompt Builder</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-dark-50 mb-6">
          Crie prompts profissionais para seus bots Discord
        </h1>

        <p className="text-xl text-dark-400 mb-12 max-w-2xl mx-auto">
          Configure visualmente e gere especificações técnicas completas. Forneça a uma IA e seu bot estará pronto em minutos!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <Button size="lg" onClick={() => navigate('/new-bot')}>
            <Sparkles size={20} />
            COMEÇAR AGORA
          </Button>
          <Button size="lg" variant="secondary" onClick={() => navigate('/docs')}>
            Ver Documentação
            <ArrowRight size={20} />
          </Button>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-dark-50 text-center mb-12">Funcionalidades Principais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <Card key={idx} className="p-6 hover:border-primary-500/50 transition-all">
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="font-bold text-dark-50 mb-2">{feature.title}</h3>
              <p className="text-dark-400 text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Como Funciona */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-dark-50 text-center mb-12">Como Funciona</h2>
        <div className="space-y-4">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center font-bold text-white">
                {step.number}
              </div>
              <div className="flex-1 pt-2">
                <h3 className="font-bold text-dark-50 text-lg mb-1">{step.title}</h3>
                <p className="text-dark-400">{step.description}</p>
              </div>
              {idx < steps.length - 1 && (
                <div className="hidden md:flex w-1 bg-gradient-to-b from-primary-600 to-transparent absolute left-[27px] top-20 h-16" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Benefícios */}
      <div className="max-w-6xl mx-auto px-6 py-20 bg-gradient-to-r from-primary-600/10 to-primary-600/5 rounded-2xl border border-primary-600/20">
        <h2 className="text-3xl font-bold text-dark-50 text-center mb-12">Por que usar o Bot Builder?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex gap-3">
            <CheckCircle size={24} className="text-green-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-dark-50 mb-1">Economize Tempo</h3>
              <p className="text-dark-400">De horas para minutos. Gere prompts profissionais em segundos.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <CheckCircle size={24} className="text-green-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-dark-50 mb-1">Sem Código Necessário</h3>
              <p className="text-dark-400">Interface visual intuitiva. Nenhum conhecimento técnico requerido.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <CheckCircle size={24} className="text-green-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-dark-50 mb-1">Prompts Profissionais</h3>
              <p className="text-dark-400">Especificações técnicas detalhadas e estruturadas.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <CheckCircle size={24} className="text-green-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-dark-50 mb-1">Salve Projetos</h3>
              <p className="text-dark-400">Acesse e edite seus projetos a qualquer momento.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-dark-50 mb-6">Pronto para começar?</h2>
        <p className="text-dark-400 mb-8 text-lg">Crie seu primeiro bot Discord em minutos com o Discord Bot Prompt Builder.</p>
        <Button size="lg" onClick={() => navigate('/new-bot')}>
          <Sparkles size={20} />
          CRIAR NOVO BOT
        </Button>
      </div>
    </div>
  )
}

export default Onboarding
