import React from 'react'
import clsx from 'clsx'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
    {icon && <div className="mb-4 text-dark-600">{icon}</div>}
    <h3 className="text-lg font-bold text-dark-50 mb-2">{title}</h3>
    {description && <p className="text-sm text-dark-400 mb-6">{description}</p>}
    {action && <div>{action}</div>}
  </div>
)

export default EmptyState
