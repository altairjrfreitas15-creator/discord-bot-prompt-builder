import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button, Modal, Alert } from '@/components'
import { useProjectStore } from '@/store/projectStore'
import { useUIStore } from '@/store/uiStore'
import { validateProject } from '@/utils/validators'
import { Package, Zap, AlertCircle, CheckCircle } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const Projects: React.FC = () => {
  const navigate = useNavigate()
  const { projects, loadProject, duplicateProject, deleteProject } = useProjectStore()
  const { addToast } = useUIStore()
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; id: string | null }>({
    open: false,
    id: null,
  })
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({})

  const handleOpen = (id: string) => {
    const project = projects.find((p) => p.id === id)
    if (project) {
      const errors = validateProject(project)
      if (errors.length > 0) {
        setValidationErrors({ [id]: errors })
        addToast({
          type: 'warning',
          message: `Projeto tem ${errors.length} problema(s). Corrija antes de gerar o prompt.`,
          duration: 4000,
        })
        return
      }
    }
    loadProject(id)
    navigate('/generator')
  }

  const handleDuplicate = (id: string) => {
    try {
      const duplicated = duplicateProject(id)
      loadProject(duplicated.id)
      addToast({
        type: 'success',
        message: 'Projeto duplicado com sucesso!',
        duration: 2000,
      })
    } catch (error) {
      addToast({
        type: 'error',
        message: 'Erro ao duplicar projeto',
        duration: 2000,
      })
    }
  }

  const handleDeleteConfirm = () => {
    if (deleteModal.id) {
      deleteProject(deleteModal.id)
      setDeleteModal({ open: false, id: null })
      addToast({
        type: 'success',
        message: 'Projeto deletado com sucesso!',
        duration: 2000,
      })
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
          {projects.map((project) => {
            const errors = validationErrors[project.id] || []
            const isValid = errors.length === 0

            return (
              <Card
                key={project.id}
                className="p-6 relative overflow-hidden group cursor-pointer transition-all"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-dark-50">{project.name}</h3>
                    <p className="text-sm text-dark-400">{project.botName}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        project.status === 'published'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {project.status === 'published' ? 'Publicado' : 'Rascunho'}
                    </span>
                    {isValid ? (
                      <CheckCircle size={16} className="text-green-400" />
                    ) : (
                      <AlertCircle size={16} className="text-yellow-400" />
                    )}
                  </div>
                </div>

                <p className="text-sm text-dark-400 mb-4 line-clamp-2">{project.description || 'Sem descrição'}</p>

                {!isValid && (
                  <Alert type="warning" title="Problemas encontrados" message={`${errors.length} erro(s)`} />
                )}

                <div className="text-xs text-dark-500 mb-4 space-y-1 mt-4">
                  <p>Criado: {format(project.createdAt, 'PPP', { locale: ptBR })}</p>
                  <p>Editado: {format(project.updatedAt, 'PPP', { locale: ptBR })}</p>
                </div>

                {hoveredId === project.id && (
                  <div className="absolute inset-0 bg-dark-900/90 backdrop-blur-sm flex items-center justify-center gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleOpen(project.id)}
                      disabled={!isValid}
                    >
                      <Zap size={16} />
                      Gerar
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleDuplicate(project.id)}
                      title="Duplicar"
                    >
                      +
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => setDeleteModal({ open: true, id: project.id })}
                      title="Excluir"
                    >
                      ×
                    </Button>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <Package size={48} className="mx-auto text-dark-600 mb-4" />
          <p className="text-dark-400 mb-4">Nenhum projeto criado ainda</p>
          <Button onClick={() => navigate('/new-bot')}>Criar primeiro projeto</Button>
        </Card>
      )}

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModal.open}
        type="error"
        title="Deletar Projeto"
        description="Tem certeza que deseja deletar este projeto? Esta ação não pode ser desfeita."
        confirmText="Deletar"
        cancelText="Cancelar"
        isDangerous
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModal({ open: false, id: null })}
      />
    </div>
  )
}

export default Projects
