import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, Home, Bot, Package, ShoppingCart, CreditCard, Ticket, BarChart3, Settings, BookOpen, Folder, Zap, FileText, X } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'
import clsx from 'clsx'

const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const { sidebarOpen, setSidebarOpen } = useUIStore()

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/' },
    { icon: Bot, label: 'Novo Bot', href: '/new-bot' },
    { icon: Package, label: 'Produtos', href: '/products' },
    { icon: ShoppingCart, label: 'Vendas', href: '/sales' },
    { icon: CreditCard, label: 'Pagamentos', href: '/payments' },
    { icon: Ticket, label: 'Tickets', href: '/tickets' },
    { icon: BarChart3, label: 'Dashboard Bot', href: '/bot-dashboard' },
    { icon: Settings, label: 'Configurações', href: '/settings' },
    { icon: BookOpen, label: 'Templates', href: '/templates' },
    { icon: Folder, label: 'Meus Projetos', href: '/projects' },
    { icon: Zap, label: 'Gerador de Prompt', href: '/generator' },
    { icon: FileText, label: 'Documentação', href: '/docs' },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed left-0 top-0 h-screen bg-gradient-to-b from-dark-900 to-dark-950 border-r border-dark-800 z-40 transition-all duration-300 overflow-y-auto',
          sidebarOpen ? 'w-64' : 'w-0 lg:w-20',
        )}
      >
        {/* Logo */}
        <div className="sticky top-0 p-6 border-b border-dark-800 bg-dark-900/95 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              DB
            </div>
            {sidebarOpen && (
              <div className="hidden lg:flex flex-col flex-1 min-w-0">
                <div className="text-xs font-bold text-dark-50 truncate">Discord Bot</div>
                <div className="text-xs text-dark-400 truncate">Prompt Builder</div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.href}
                onClick={() => {
                  navigate(item.href)
                  setSidebarOpen(false)
                }}
                className={clsx(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                  'hover:bg-dark-800 hover:text-primary-400',
                  'text-dark-300',
                )}
                title={sidebarOpen ? '' : item.label}
              >
                <Icon size={20} className="flex-shrink-0" />
                {sidebarOpen && <span className="text-sm font-medium hidden lg:inline">{item.label}</span>}
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-dark-800 bg-dark-950 space-y-2">
          <div className="text-xs text-dark-500 px-4 py-2 hidden lg:block truncate">
            v1.0.0
          </div>
        </div>
      </aside>

      {/* Toggle button - Mobile only */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={clsx(
          'fixed top-4 left-4 z-50 p-2 rounded-lg lg:hidden',
          'bg-dark-800 hover:bg-dark-700 text-primary-500 hover:text-primary-400 transition-colors',
        )}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </>
  )
}

export default Sidebar
