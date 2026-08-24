import React, { useState, Suspense, lazy } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Pillars from './components/Pillars'
import Solutions from './components/Solutions'
import Services from './components/Services'
import Compare from './components/Compare'
import Calculators from './components/Calculators'
import Testimonials from './components/Testimonials'
import Faq from './components/Faq'
import KycServices from './components/KycServices'
import Compliance from './components/Compliance'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import WhatsAppWidget from './components/WhatsAppWidget'
import QuickActions from './components/QuickActions'

const PartnerHub = lazy(() => import('./components/PartnerHub'))
const VfsOfficeBenefits = lazy(() => import('./components/VfsOfficeBenefits'))
const GstHelper = lazy(() => import('./components/GstHelper'))

const ViewLoading = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
  </div>
)

function App() {
  const [currentView, setCurrentView] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('view') || 'home'
  })

  React.useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search)
      setCurrentView(params.get('view') || 'home')
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (currentView === 'home') {
      if (params.has('view')) {
        window.history.pushState({}, '', window.location.pathname)
      }
    } else {
      if (params.get('view') !== currentView) {
        window.history.pushState({}, '', `?view=${currentView}`)
      }
    }
  }, [currentView])
  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans selection:bg-primary-500 selection:text-white flex flex-col">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-grow">
        {currentView === 'home' ? (
          <>
            <Hero />
            <Pillars />
            <Solutions />
            <Services />
            <Compare />
            <Calculators />
            <Testimonials />
            <Faq />
            <KycServices />
            <Compliance />
            <Contact />
          </>
        ) : (
          <Suspense fallback={<ViewLoading />}>
            {currentView === 'partner' ? (
              <PartnerHub onNavigateHome={() => {
                setCurrentView('home')
                window.scrollTo(0, 0)
              }} />
            ) : currentView === 'vfs-benefits' ? (
              <VfsOfficeBenefits onNavigateHome={() => {
                setCurrentView('home')
                window.scrollTo(0, 0)
              }} />
            ) : (
              <GstHelper onNavigateHome={() => {
                setCurrentView('home')
                window.scrollTo(0, 0)
              }} />
            )}
          </Suspense>
        )}
      </main>
      
      <Footer onViewChange={setCurrentView} />
      
      <ScrollToTop />
      
      {/* Sticky Right Sidebar */}
      <QuickActions />

      {/* Floating WhatsApp Widget */}
      <WhatsAppWidget />
    </div>
  )
}

export default App
