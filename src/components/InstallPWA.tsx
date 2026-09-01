import React, { useEffect } from 'react'

const InstallPWA: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = React.useState<any>(null)
  const [showInstall, setShowInstall] = React.useState(false)

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstall(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    console.log(`User response: ${outcome}`)
    setDeferredPrompt(null)
    setShowInstall(false)
  }

  if (!showInstall) return null

  return (
    <div className="fixed bottom-4 right-4 bg-dark-800 border border-dark-700 rounded-lg p-4 shadow-lg z-40 max-w-xs">
      <p className="text-dark-50 font-medium mb-3">📱 Instalar App</p>
      <p className="text-sm text-dark-400 mb-4">Instale o Discord Bot Builder na sua tela inicial para acesso rápido.</p>
      <div className="flex gap-2">
        <button
          onClick={handleInstall}
          className="flex-1 px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded text-sm font-medium transition-all"
        >
          Instalar
        </button>
        <button
          onClick={() => setShowInstall(false)}
          className="flex-1 px-3 py-2 bg-dark-700 hover:bg-dark-600 text-dark-200 rounded text-sm font-medium transition-all"
        >
          Depois
        </button>
      </div>
    </div>
  )
}

export default InstallPWA
