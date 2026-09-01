import React from 'react'
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react'
import clsx from 'clsx'

interface AlertProps {
  type: 'info' | 'warning' | 'error' | 'success'
  title: string
  message: string
  onClose?: () => void
}

const Alert: React.FC<AlertProps> = ({ type, title, message, onClose }) => {
  const styles = {
    info: {
      bg: 'bg-blue-900/20',
      border: 'border-blue-700',
      icon: <AlertCircle className="text-blue-400" size={20} />,
    },
    warning: {
      bg: 'bg-yellow-900/20',
      border: 'border-yellow-700',
      icon: <AlertTriangle className="text-yellow-400" size={20} />,
    },
    error: {
      bg: 'bg-red-900/20',
      border: 'border-red-700',
      icon: <AlertCircle className="text-red-400" size={20} />,
    },
    success: {
      bg: 'bg-green-900/20',
      border: 'border-green-700',
      icon: <CheckCircle className="text-green-400" size={20} />,
    },
  }

  const style = styles[type]

  return (
    <div className={clsx('rounded-lg border p-4', style.bg, style.border)}>
      <div className="flex items-start gap-3">
        {style.icon}
        <div className="flex-1">
          <h3 className="font-semibold text-dark-50 text-sm">{title}</h3>
          <p className="text-dark-400 text-sm mt-1">{message}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-dark-400 hover:text-dark-50 mt-1">
            ✕
          </button>
        )}
      </div>
    </div>
  )
}

export default Alert
