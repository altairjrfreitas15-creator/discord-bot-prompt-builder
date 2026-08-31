import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card } from '@/components'
import { BarChart3, Package, Zap, Clock, Plus } from 'lucide-react'
import { useProjectStore } from '@/store/projectStore'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const { projects, listProjects } = useProjectStore()
  const allProjects = listProjects()

  const stats = [
    { label: 'Projetos criados', value: allProjects.length, icon: Package },
    { label: 'Prompts gerados', value: allProjects.filter((p) => p.status === 'published').length, icon: Zap },
    { label: 'Templates disponíveis', value: 7, icon: BarChart3 },
    { label: 'Último projeto', value: allProjects.length > 0 ? format(allProjects[0].updatedAt, 'PPP', { locale: ptBR }) : '-', icon: Clock },
  ]

  const recentProjects = allProjects.slice(0, 6)

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 animate-slide-in-up">
        <h1 className="text-4xl font-bold text-dark-50 mb-2">Discord Bot Prompt Builder</h1>
        <p className="text-dark-400">Crie o prompt perfeito para seu bot de vendas do Discord</p>
      </div>

      {/* Main CTA Card */}
      <Card className="bg-gradient-to-r from-primary-600 to-primary-700 border-primary-500 mb-8 overflow-hidden animate-slide-in-up">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-white mb-2">Crie o prompt perfeito para seu bot de vendas do Discord.</h2>
          <p className="text-primary-100 mb-6">Configure visualmente todos os recursos do seu bot e gere automaticamente uma especificação completa para uma IA de programação.</p>
          <Button variant="secondary" size="lg" onClick={() => navigate('/new-bot')}>
            <Plus size={20} />
            CRIAR NOVO BOT
          </Button>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Card key={idx} className="p-6 animate-slide-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-dark-400 text-sm font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-dark-50 mt-2">{stat.value}</p>
                </div>
                <div className="p-3 bg-primary-500/20 rounded-lg">
                  <Icon size={24} className="text-primary-400" />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Recent Projects */}
      <div className="animate-slide-in-up">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-dark-50">Projetos recentes</h3>
          {allProjects.length > 6 && <Button variant="ghost" onClick={() => navigate('/projects')}>Ver todos</Button>}
        </div>

        {recentProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentProjects.map((project) => (
              <Card key={project.id} hover className="p-6 cursor-pointer" onClick={() => navigate(`/projects?id=${project.id}`)}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-dark-50">{project.name}</h4>
                    <p className="text-sm text-dark-400">{project.botName}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    project.status === 'published'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {project.status === 'published' ? 'Publicado' : 'Rascunho'}
                  </span>
                </div>
                <p className="text-sm text-dark-400 mb-4 line-clamp-2">{project.description || 'Sem descrição'}</p>
                <div className="flex items-center justify-between text-xs text-dark-500">
                  <span>Editado em {format(project.updatedAt, 'PPP', { locale: ptBR })}</span>
                  <span>v{project.version}</span>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <Package size={48} className="mx-auto text-dark-600 mb-4" />
            <p className="text-dark-400 mb-4">Nenhum projeto criado ainda</p>
            <Button onClick={() => navigate('/new-bot')}>Criar primeiro projeto</Button>
          </Card>
        )}
      </div>
    </div>
  )
}

export default Dashboard
