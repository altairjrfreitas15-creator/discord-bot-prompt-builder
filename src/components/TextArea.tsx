import React from 'react'
import clsx from 'clsx'

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, className, ...props }, ref) => (
    <div className="w-full">
      {label && <label className="block text-sm font-medium mb-2 text-dark-300">{label}</label>}
      <textarea
        ref={ref}
        className={clsx(
          'w-full px-4 py-2 rounded-lg bg-dark-800 border text-dark-50 placeholder-dark-400',
          'focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20',
          'resize-vertical',
          error ? 'border-red-500/50' : 'border-dark-700',
          className,
        )}
        {...props}
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  ),
)

TextArea.displayName = 'TextArea'

export default TextArea
