import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components'
import { AlertCircle, Home } from 'lucide-react'

const NotFound: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 to-dark-900 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <AlertCircle size={64} className="text-red-400" />
        </div>
        <h1 className="text-5xl font-bold text-dark-50 mb-2">404</h1>
        <h2 className="text-2xl font-bold text-dark-200 mb-4">Página não encontrada</h2>
        <p className="text-dark-400 mb-8 max-w-md mx-auto">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Button size="lg" onClick={() => navigate('/')}>
          <Home size={20} />
          Voltar ao Dashboard
        </Button>
      </div>
    </div>
  )
}

export default NotFound
