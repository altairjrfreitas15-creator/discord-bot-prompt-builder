import React from 'react'
import { Card, Button } from '@/components'
import { useProjectStore } from '@/store/projectStore'
import { useUIStore } from '@/store/uiStore'
import { Download, Search, ChevronDown } from 'lucide-react'

const Projects: React.FC = () => {
  const { projects, loadProject, duplicateProject, deleteProject } = useProjectStore()
  const { addToast } = useUIStore()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [filterStatus, setFilterStatus] = React.useState<'all' | 'draft' | 'published'>('all')

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.botName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleExportProject = (id: string) => {
    const project = projects.find((p) => p.id === id)
    if (project) {
      const element = document.createElement('a')
      const file = new Blob([JSON.stringify(project, null, 2)], { type: 'application/json' })
      element.href = URL.createObjectURL(file)
      element.download = `projeto-${project.name}.json`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      addToast({
        type: 'success',
        message: 'Projeto exportado com sucesso!',
        duration: 2000,
      })
    }
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-50 mb-4">Meus Projetos</h1>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
            <input
              type="text"
              placeholder="Pesquisar projetos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-base pl-10"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="input-base flex items-center gap-2"
          >
            <option value="all">Todos</option>
            <option value="draft">Rascunho</option>
            <option value="published">Publicado</option>
          </select>
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="p-6 hover:border-primary-500/50 transition-all">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-dark-50">{project.name}</h3>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    project.status === 'published'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}
                >
                  {project.status === 'published' ? 'Publicado' : 'Rascunho'}
                </span>
              </div>
              <p className="text-sm text-dark-400 mb-4">{project.botName}</p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleExportProject(project.id)}
                  className="flex-1"
                >
                  <Download size={16} />
                  Exportar
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <p className="text-dark-400">Nenhum projeto encontrado</p>
        </Card>
      )}
    </div>
  )
}

export default Projects
