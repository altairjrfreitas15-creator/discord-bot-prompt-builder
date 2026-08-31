import React, { useState } from 'react'
import { Card, Button, Input } from '@/components'
import { Copy, Download, Sparkles, RotateCcw, Edit3 } from 'lucide-react'
import { useProjectStore } from '@/store/projectStore'
import { useUIStore } from '@/store/uiStore'
import { generatePrompt } from '@/utils/promptGenerator'

const Generator: React.FC = () => {
  const { currentProject, updateProject } = useProjectStore()
  const { addToast } = useUIStore()
  const [prompt, setPrompt] = useState<string>('')
  const [isEditing, setIsEditing] = useState(false)
  const [editedPrompt, setEditedPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  if (!currentProject) {
    return (
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        <Card className="p-12 text-center">
          <p className="text-dark-400 mb-4">Nenhum projeto carregado</p>
          <p className="text-sm text-dark-500">Crie um novo projeto para gerar um prompt</p>
        </Card>
      </div>
    )
  }

  const handleGeneratePrompt = async () => {
    setIsGenerating(true)
    try {
      const generated = generatePrompt(currentProject)
      setPrompt(generated)
      setEditedPrompt(generated)
      addToast({
        type: 'success',
        message: 'Prompt gerado com sucesso!',
        duration: 3000,
      })
    } catch (error) {
      addToast({
        type: 'error',
        message: 'Erro ao gerar prompt',
        duration: 3000,
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopyPrompt = () => {
    const textToCopy = isEditing ? editedPrompt : prompt
    navigator.clipboard.writeText(textToCopy).then(() => {
      addToast({
        type: 'success',
        message: 'Prompt copiado para a área de transferência!',
        duration: 2000,
      })
    })
  }

  const handleSavePrompt = () => {
    updateProject({
      status: 'published',
    })
    addToast({
      type: 'success',
      message: 'Projeto salvo com sucesso!',
      duration: 2000,
    })
  }

  const handleExport = (format: 'txt' | 'md') => {
    const textToExport = isEditing ? editedPrompt : prompt
    const element = document.createElement('a')
    const file = new Blob([textToExport], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `prompt-${currentProject.botName}.${format === 'txt' ? 'txt' : 'md'}`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-50 mb-2">Gerador de Prompt</h1>
        <p className="text-dark-400">Crie uma especificação detalhada para sua IA de programação</p>
      </div>

      {!prompt ? (
        <Card className="p-12 text-center">
          <div className="mb-6">
            <Sparkles size={48} className="mx-auto text-primary-400 mb-4" />
            <h2 className="text-2xl font-bold text-dark-50 mb-2">Pronto para gerar o prompt?</h2>
            <p className="text-dark-400 mb-6">O prompt será gerado com base em todas as configurações do seu projeto.</p>
          </div>
          <Button size="lg" onClick={handleGeneratePrompt} isLoading={isGenerating}>
            <Sparkles size={20} />
            GERAR PROMPT DO BOT
          </Button>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Editor */}
          <Card className="overflow-hidden">
            <div className="border-b border-dark-800 p-4 flex items-center justify-between">
              <h3 className="font-bold text-dark-50">PROMPT GERADO</h3>
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsEditing(false)
                      setEditedPrompt(prompt)
                    }}
                  >
                    Cancelar
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit3 size={16} />
                    Editar
                  </Button>
                )}
              </div>
            </div>
            <div className="p-6">
              {isEditing ? (
                <textarea
                  value={editedPrompt}
                  onChange={(e) => setEditedPrompt(e.target.value)}
                  className="input-base resize-none font-mono text-sm h-96"
                />
              ) : (
                <div className="bg-dark-800 rounded-lg p-4 h-96 overflow-y-auto font-mono text-sm text-dark-50 whitespace-pre-wrap break-words">
                  {prompt}
                </div>
              )}
            </div>
          </Card>

          {/* Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="primary" onClick={handleCopyPrompt}>
              <Copy size={20} />
              Copiar
            </Button>
            <Button variant="secondary" onClick={() => handleExport('txt')}>
              <Download size={20} />
              Exportar TXT
            </Button>
            <Button variant="secondary" onClick={() => handleExport('md')}>
              <Download size={20} />
              Exportar Markdown
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="secondary" onClick={handleGeneratePrompt} isLoading={isGenerating}>
              <RotateCcw size={20} />
              Regenerar
            </Button>
            <Button onClick={handleSavePrompt}>
              Salvar Projeto
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Generator
