import React from 'react'
import clsx from 'clsx'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  children: React.ReactNode
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ hover, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(
        'bg-dark-900 border border-dark-800 rounded-xl shadow-lg',
        hover && 'hover:border-dark-700 hover:shadow-xl transition-all duration-300 cursor-pointer',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
)

Card.displayName = 'Card'

export default Card
