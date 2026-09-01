import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Sidebar, ToastContainer } from '@/components'
import Dashboard from '@/pages/Dashboard'
import NewBot from '@/pages/NewBot'
import Products from '@/pages/Products'
import Sales from '@/pages/Sales'
import Payments from '@/pages/Payments'
import Tickets from '@/pages/Tickets'
import BotDashboard from '@/pages/BotDashboard'
import Settings from '@/pages/Settings'
import Templates from '@/pages/Templates'
import Projects from '@/pages/Projects'
import Generator from '@/pages/Generator'
import Docs from '@/pages/Docs'
import Onboarding from '@/pages/Onboarding'
import NotFound from '@/pages/NotFound'

const App: React.FC = () => {
  const [hasVisited, setHasVisited] = useState(localStorage.getItem('hasVisitedBefore'))

  React.useEffect(() => {
    localStorage.setItem('hasVisitedBefore', 'true')
  }, [])

  return (
    <Router>
      <div className="flex min-h-screen bg-dark-950">
        {hasVisited && <Sidebar />}
        <main className={`flex-1 ${hasVisited ? 'ml-0 lg:ml-20' : ''} transition-all duration-300`}>
          <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
            <Routes>
              <Route path="/" element={hasVisited ? <Dashboard /> : <Onboarding />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/new-bot" element={<NewBot />} />
              <Route path="/products" element={<Products />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/bot-dashboard" element={<BotDashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/generator" element={<Generator />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>
        <ToastContainer />
      </div>
    </Router>
  )
}

export default App
