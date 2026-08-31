import React from 'react'
import clsx from 'clsx'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => (
    <div className="w-full">
      {label && <label className="block text-sm font-medium mb-2 text-dark-300">{label}</label>}
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400">{icon}</div>}
        <input
          ref={ref}
          className={clsx(
            'w-full px-4 py-2 rounded-lg bg-dark-800 border text-dark-50 placeholder-dark-400',
            'focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20',
            icon ? 'pl-10' : '',
            error ? 'border-red-500/50' : 'border-dark-700',
            className,
          )}
          {...props}
        />
      </div>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  ),
)

Input.displayName = 'Input'

export default Input
