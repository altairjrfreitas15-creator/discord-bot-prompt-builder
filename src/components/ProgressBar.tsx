import React from 'react'
import clsx from 'clsx'

interface ProgressBarProps {
  current: number
  total: number
  steps: string[]
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, steps }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <button
              className={clsx(
                'w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all text-sm',
                idx < current
                  ? 'bg-green-600 text-white'
                  : idx === current
                    ? 'bg-primary-600 text-white'
                    : 'bg-dark-800 text-dark-400 hover:bg-dark-700',
              )}
              title={step}
            >
              {idx < current ? '✓' : idx + 1}
            </button>
            {idx < steps.length - 1 && (
              <div
                className={clsx(
                  'flex-1 h-1 rounded transition-all',
                  idx < current ? 'bg-green-600' : 'bg-dark-800',
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="text-center">
        <p className="text-sm text-dark-400">
          {current + 1} de {total}
        </p>
      </div>
    </div>
  )
}

export default ProgressBar
