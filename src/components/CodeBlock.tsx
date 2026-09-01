import React from 'react'
import { X, Copy, Check } from 'lucide-react'
import clsx from 'clsx'
import Button from './Button'

interface CodeBlockProps {
  code: string
  language?: string
  copyable?: boolean
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'bash', copyable = true }) => {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative bg-dark-800 rounded-lg border border-dark-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-dark-900 border-b border-dark-700">
        <span className="text-xs text-dark-400 font-mono">{language}</span>
        {copyable && (
          <button
            onClick={handleCopy}
            className="text-dark-400 hover:text-dark-50 transition-colors"
          >
            {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
          </button>
        )}
      </div>

      {/* Code */}
      <pre className="p-4 overflow-x-auto text-sm text-dark-50 font-mono whitespace-pre-wrap break-words">
        {code}
      </pre>
    </div>
  )
}

export default CodeBlock
