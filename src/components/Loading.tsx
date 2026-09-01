import React from 'react'
import clsx from 'clsx'

interface LoadingProps {
  fullScreen?: boolean
  message?: string
}

const Loading: React.FC<LoadingProps> = ({ fullScreen = false, message = 'Carregando...' }) => {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center gap-4',
        fullScreen && 'fixed inset-0 bg-dark-950 z-50',
        !fullScreen && 'py-12',
      )}
    >
      <div className="w-12 h-12 border-4 border-dark-800 border-t-primary-600 rounded-full animate-spin" />
      <p className="text-dark-400 text-sm">{message}</p>
    </div>
  )
}

export default Loading
