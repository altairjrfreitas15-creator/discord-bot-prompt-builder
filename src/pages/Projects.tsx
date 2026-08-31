import React, { useState } from 'react'
import { Card, Button } from '@/components'
import { useNavigate } from 'react-router-dom'
import { useProjectStore } from '@/store/projectStore'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Edit2, Copy, Trash2, Eye } from 'lucide-react'

const Projects: React.FC = () => {
  const navigate = useNavigate()
  const { projects, loadProject, duplicateProject, deleteProject } = useProjectStore()
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const handleOpen = (id: string) => {
    loadProject(id)
    navigate('/generator')
  }

  const handleDuplicate = (id: string) => {
    const duplicated = duplicateProject(id)
    loadProject(duplicated.id)
  }

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este projeto?')) {
      deleteProject(id)
    }
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-dark-50 mb-2">Meus Projetos</h1>
          <p className="text-dark-400">Total: {projects.length} projeto(s)</p>
        </div>
        <Button onClick={() => navigate('/new-bot')}>+ Novo Projeto</Button>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="p-6 relative overflow-hidden group cursor-pointer"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-dark-50">{project.name}</h3>
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

              <div className="text-xs text-dark-500 mb-4 space-y-1">
                <p>Criado: {format(project.createdAt, 'PPP', { locale: ptBR })}</p>
                <p>Editado: {format(project.updatedAt, 'PPP', { locale: ptBR })}</p>
              </div>

              {hoveredId === project.id && (
                <div className="absolute inset-0 bg-dark-900/90 backdrop-blur-sm flex items-center justify-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleOpen(project.id)}
                    title="Abrir"
                  >
                    <Eye size={16} />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleDuplicate(project.id)}
                    title="Duplicar"
                  >
                    <Copy size={16} />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(project.id)}
                    title="Excluir"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <p className="text-dark-400 mb-4">Nenhum projeto criado ainda</p>
          <Button onClick={() => navigate('/new-bot')}>Criar primeiro projeto</Button>
        </Card>
      )}
    </div>
  )
}

export default Projects
