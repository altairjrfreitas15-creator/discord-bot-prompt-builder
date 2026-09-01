import React from 'react'
import clsx from 'clsx'
import { AlertCircle, CheckCircle, AlertTriangle, Info, X } from 'lucide-react'
import Button from './Button'

interface ModalProps {
  isOpen: boolean
  title: string
  description?: string
  type?: 'info' | 'warning' | 'error' | 'success'
  onConfirm: () => void
  onCancel: () => void
  confirmText?: string
  cancelText?: string
  isLoading?: boolean
  isDangerous?: boolean
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  description,
  type = 'info',
  onConfirm,
  onCancel,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  isLoading = false,
  isDangerous = false,
}) => {
  if (!isOpen) return null

  const icons = {
    info: <Info className="text-blue-400" size={24} />,
    warning: <AlertTriangle className="text-yellow-400" size={24} />,
    error: <AlertCircle className="text-red-400" size={24} />,
    success: <CheckCircle className="text-green-400" size={24} />,
  }

  const colors = {
    info: 'bg-blue-900/20 border-blue-700',
    warning: 'bg-yellow-900/20 border-yellow-700',
    error: 'bg-red-900/20 border-red-700',
    success: 'bg-green-900/20 border-green-700',
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-dark-900 border border-dark-800 rounded-xl shadow-2xl max-w-md w-full animate-slide-in-up">
        {/* Header */}
        <div className={clsx('p-6 border-b border-dark-800', colors[type])}>
          <div className="flex items-center gap-3 mb-2">
            {icons[type]}
            <h2 className="text-lg font-bold text-dark-50">{title}</h2>
          </div>
          {description && <p className="text-sm text-dark-400 ml-9">{description}</p>}
        </div>

        {/* Footer */}
        <div className="p-6 flex gap-3 justify-end">
          <Button variant="secondary" onClick={onCancel} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button
            variant={isDangerous ? 'danger' : 'primary'}
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Modal
