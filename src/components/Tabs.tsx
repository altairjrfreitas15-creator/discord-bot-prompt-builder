import React from 'react'
import clsx from 'clsx'

interface TabsProps {
  tabs: Array<{ id: string; label: string; icon?: React.ReactNode }>
  activeTab: string
  onChange: (tabId: string) => void
  children: React.ReactNode
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange, children }) => {
  return (
    <div className="w-full">
      <div className="flex gap-2 border-b border-dark-800 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={clsx(
              'px-4 py-3 font-medium transition-all whitespace-nowrap',
              'border-b-2 -mb-px flex items-center gap-2',
              activeTab === tab.id
                ? 'border-primary-600 text-primary-500'
                : 'border-transparent text-dark-400 hover:text-dark-200 hover:border-dark-700',
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="py-4">{children}</div>
    </div>
  )
}

export default Tabs
