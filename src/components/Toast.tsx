import React, { useEffect } from 'react'
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react'
import { useUIStore, Toast as ToastType } from '@/store/uiStore'
import clsx from 'clsx'

const Toast: React.FC<{ toast: ToastType }> = ({ toast }) => {
  const { removeToast } = useUIStore()

  useEffect(() => {
    if (toast.duration) {
      const timer = setTimeout(() => removeToast(toast.id), toast.duration)
      return () => clearTimeout(timer)
    }
  }, [toast.id, toast.duration, removeToast])

  const icons = {
    success: <CheckCircle size={20} className="text-green-400" />,
    error: <AlertCircle size={20} className="text-red-400" />,
    info: <Info size={20} className="text-blue-400" />,
    warning: <AlertTriangle size={20} className="text-yellow-400" />,
  }

  const backgrounds = {
    success: 'bg-green-900/50 border-green-700',
    error: 'bg-red-900/50 border-red-700',
    info: 'bg-blue-900/50 border-blue-700',
    warning: 'bg-yellow-900/50 border-yellow-700',
  }

  return (
    <div
      className={clsx(
        'flex items-center gap-3 p-4 rounded-lg border backdrop-blur-sm animate-fade-in',
        backgrounds[toast.type],
      )}
    >
      {icons[toast.type]}
      <span className="flex-1 text-sm font-medium">{toast.message}</span>
      <button
        onClick={() => removeToast(toast.id)}
        className="hover:opacity-70 transition-opacity"
      >
        <X size={16} />
      </button>
    </div>
  )
}

const ToastContainer: React.FC = () => {
  const { toasts } = useUIStore()

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast toast={toast} />
        </div>
      ))}
    </div>
  )
}

export default ToastContainer
