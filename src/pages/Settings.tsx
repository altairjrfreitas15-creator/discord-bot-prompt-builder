import React from 'react'
import { Card, Select, TextArea, Button } from '@/components'
import { useUIStore } from '@/store/uiStore'
import { Palette, Moon, Zap } from 'lucide-react'

const Settings: React.FC = () => {
  const { addToast } = useUIStore()
  const [theme, setTheme] = React.useState('dark')
  const [fontSize, setFontSize] = React.useState('16')
  const [notifications, setNotifications] = React.useState(true)

  const handleSaveSettings = () => {
    // Implementar lógica de save
    addToast({
      type: 'success',
      message: 'Configurações salvas com sucesso!',
      duration: 2000,
    })
  }

  const themes = [
    { value: 'dark', label: '🌙 Dark (Padrão)' },
    { value: 'neon', label: '⚡ Neon' },
    { value: 'minimal', label: '✨ Minimal' },
    { value: 'gaming', label: '🎮 Gaming' },
    { value: 'professional', label: '💼 Professional' },
  ]

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-dark-50 mb-8">Configurações</h1>

      {/* Aparência */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-bold text-dark-50 mb-6 flex items-center gap-2">
          <Palette size={24} className="text-primary-400" />
          Aparência
        </h2>

        <div className="space-y-6">
          <Select
            label="Tema"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            options={themes}
          />

          <Select
            label="Tamanho da Fonte"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            options={[
              { value: '14', label: 'Pequeno' },
              { value: '16', label: 'Normal' },
              { value: '18', label: 'Grande' },
              { value: '20', label: 'Extra Grande' },
            ]}
          />
        </div>
      </Card>

      {/* Notificações */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-bold text-dark-50 mb-6 flex items-center gap-2">
          <Zap size={24} className="text-primary-400" />
          Notificações
        </h2>

        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span className="text-dark-300">Receber notificações de ações</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
            <span className="text-dark-300">Notificar quando projetos são compartilhados</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
            <span className="text-dark-300">Newsletter com dicas e novidades</span>
          </label>
        </div>
      </Card>

      {/* Atalhos de Teclado */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-bold text-dark-50 mb-6">Atalhos de Teclado</h2>

        <div className="space-y-3 text-sm text-dark-300">
          <div className="flex justify-between pb-3 border-b border-dark-800">
            <span>Novo Projeto</span>
            <kbd className="px-3 py-1 bg-dark-800 rounded text-dark-200">Ctrl + N</kbd>
          </div>
          <div className="flex justify-between pb-3 border-b border-dark-800">
            <span>Salvar</span>
            <kbd className="px-3 py-1 bg-dark-800 rounded text-dark-200">Ctrl + S</kbd>
          </div>
          <div className="flex justify-between pb-3 border-b border-dark-800">
            <span>Pesquisar</span>
            <kbd className="px-3 py-1 bg-dark-800 rounded text-dark-200">Ctrl + K</kbd>
          </div>
          <div className="flex justify-between">
            <span>Ajuda</span>
            <kbd className="px-3 py-1 bg-dark-800 rounded text-dark-200">?</kbd>
          </div>
        </div>
      </Card>

      {/* Botões de Ação */}
      <div className="flex gap-4">
        <Button onClick={handleSaveSettings}>
          Salvar Configurações
        </Button>
        <Button variant="secondary">
          Resetar para Padrão
        </Button>
      </div>
    </div>
  )
}

export default Settings
