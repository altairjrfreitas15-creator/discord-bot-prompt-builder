import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu, Home, Bot, Package, ShoppingCart, CreditCard, Ticket, BarChart3, Settings, BookOpen, Folder, Zap, FileText, ChevronDown } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'
import clsx from 'clsx'

const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { sidebarOpen, setSidebarOpen } = useUIStore()

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/', badge: '🏠' },
    { icon: Bot, label: 'Novo Bot', href: '/new-bot', badge: '🤖' },
    { icon: Package, label: 'Produtos', href: '/products', badge: '📦' },
    { icon: ShoppingCart, label: 'Vendas', href: '/sales', badge: '🛒' },
    { icon: CreditCard, label: 'Pagamentos', href: '/payments', badge: '💳' },
    { icon: Ticket, label: 'Tickets', href: '/tickets', badge: '🎟️' },
    { icon: BarChart3, label: 'Dashboard Bot', href: '/bot-dashboard', badge: '📊' },
    { icon: Settings, label: 'Configurações', href: '/settings', badge: '⚙️' },
    { icon: BookOpen, label: 'Templates', href: '/templates', badge: '📚' },
    { icon: Folder, label: 'Meus Projetos', href: '/projects', badge: '📁' },
    { icon: Zap, label: 'Gerador de Prompt', href: '/generator', badge: '🧠' },
    { icon: FileText, label: 'Documentação', href: '/docs', badge: '📖' },
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
          'fixed left-0 top-0 h-screen bg-dark-900 border-r border-dark-800 z-40 transition-all duration-300',
          sidebarOpen ? 'w-64' : 'w-0 lg:w-20',
          'overflow-y-auto overflow-x-hidden',
        )}
      >
        <div className="p-6 border-b border-dark-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
              DB
            </div>
            {sidebarOpen && <div className="text-sm font-bold hidden lg:block">Discord Bot Prompt Builder</div>}
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href
            return (
              <button
                key={item.href}
                onClick={() => {
                  navigate(item.href)
                  setSidebarOpen(false)
                }}
                className={clsx(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                  isActive
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-dark-300 hover:bg-dark-800 hover:text-dark-50',
                )}
              >
                <Icon size={20} />
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            )
          })}
        </nav>
      </aside>

      {/* Toggle button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed left-0 top-0 lg:hidden z-50 p-4 text-primary-500 hover:text-primary-400"
      >
        <Menu size={24} />
      </button>
    </>
  )
}

export default Sidebar
