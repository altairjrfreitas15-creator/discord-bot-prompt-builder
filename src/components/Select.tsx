import React from 'react'
import clsx from 'clsx'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: Array<{ value: string; label: string }>
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, ...props }, ref) => (
    <div className="w-full">
      {label && <label className="block text-sm font-medium mb-2 text-dark-300">{label}</label>}
      <select
        ref={ref}
        className={clsx(
          'w-full px-4 py-2 rounded-lg bg-dark-800 border text-dark-50 placeholder-dark-400',
          'focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20',
          error ? 'border-red-500/50' : 'border-dark-700',
          className,
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  ),
)

Select.displayName = 'Select'

export default Select
