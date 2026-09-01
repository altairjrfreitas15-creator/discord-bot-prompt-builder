import React, { useState } from 'react'
import { Card, Button } from '@/components'
import { Copy, Download, Sparkles, RotateCcw, Edit3, Zap, Settings } from 'lucide-react'
import { useProjectStore } from '@/store/projectStore'
import { useUIStore } from '@/store/uiStore'
import { generatePrompt } from '@/utils/promptGenerator'

type PromptMode = 'default' | 'detailed' | 'concise' | 'advanced'

const Generator: React.FC = () => {
  const { currentProject, updateProject } = useProjectStore()
  const { addToast } = useUIStore()
  const [prompt, setPrompt] = useState<string>('')
  const [isEditing, setIsEditing] = useState(false)
  const [editedPrompt, setEditedPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [mode, setMode] = useState<PromptMode>('default')
  const [showModeSelector, setShowModeSelector] = useState(false)

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
      let generated = generatePrompt(currentProject)

      // Aplicar modo de geração
      if (mode === 'concise') {
        generated = generated
          .split('\n\n---\n\n')
          .filter((section) => !section.includes('INSTRU'))
          .join('\n\n---\n\n')
      } else if (mode === 'detailed') {
        generated += `\n\n---\n\n## ADENDOS IMPORTANTES\n\nRecomendações adicionais para implementação de alta qualidade...`
      }

      setPrompt(generated)
      setEditedPrompt(generated)
      addToast({
        type: 'success',
        message: `Prompt gerado em modo ${mode}!`,
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

  const handleExport = (format: 'txt' | 'md' | 'json') => {
    const textToExport = isEditing ? editedPrompt : prompt
    const element = document.createElement('a')
    let content = textToExport
    let filename = `prompt-${currentProject.botName}`
    let type = 'text/plain'

    if (format === 'json') {
      content = JSON.stringify(currentProject, null, 2)
      type = 'application/json'
      filename += '.json'
    } else {
      filename += format === 'txt' ? '.txt' : '.md'
    }

    const file = new Blob([content], { type })
    element.href = URL.createObjectURL(file)
    element.download = filename
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

          {/* Mode Selector */}
          <div className="mb-6">
            <p className="text-sm text-dark-400 mb-3">Escolha o modo de geração:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {(['default', 'detailed', 'concise', 'advanced'] as PromptMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    mode === m
                      ? 'bg-primary-600 text-white'
                      : 'bg-dark-800 text-dark-400 hover:bg-dark-700'
                  }`}
                >
                  {m === 'default' && '⚡ Normal'}
                  {m === 'detailed' && '📖 Detalhado'}
                  {m === 'concise' && '✂️ Conciso'}
                  {m === 'advanced' && '🚀 Avançado'}
                </button>
              ))}
            </div>
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
            <div className="border-b border-dark-800 p-4 flex items-center justify-between flex-wrap gap-4">
              <h3 className="font-bold text-dark-50">PROMPT GERADO - {mode.toUpperCase()}</h3>
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
                    Cancelar Edição
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="primary" onClick={handleCopyPrompt}>
              <Copy size={20} />
              Copiar
            </Button>
            <Button variant="secondary" onClick={() => handleExport('txt')}>
              <Download size={20} />
              TXT
            </Button>
            <Button variant="secondary" onClick={() => handleExport('md')}>
              <Download size={20} />
              Markdown
            </Button>
            <Button variant="secondary" onClick={() => handleExport('json')}>
              <Download size={20} />
              JSON
            </Button>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <Button variant="secondary" onClick={handleGeneratePrompt} isLoading={isGenerating}>
              <RotateCcw size={20} />
              Regenerar
            </Button>
            <Button onClick={handleSavePrompt}>
              <Zap size={20} />
              Salvar Projeto
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Generator
