import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Header({ currentView, onViewChange }) {
  const [isOpen, setIsOpen] = React.useState(false)

  const homeLinks = [
    { name: 'Home', href: '#' },
    { name: 'Pillars', href: '#pillars' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Services', href: '#services' },
    { name: 'Compare', href: '#compare' },
    { name: 'Calculators', href: '#sip' },
  ]
  const homeMoreLinks = [
    { name: 'Testimonials', href: '#testimonialsSec' },
    { name: 'FAQs', href: '#faq' },
    { name: 'KYC Services', href: '#kyc' },
    { name: 'Compliance', href: '#compliance' },
    { name: 'Contact', href: '#contact' },
  ]

  const partnerLinks = [
    { name: 'Loans', href: '#loans' },
    { name: 'Mutual Funds', href: '#mutual-funds' },
    { name: 'Insurance', href: '#insurance' },
    { name: 'Global', href: '#global-investments' },
    { name: 'NPS', href: '#nps' },
    { name: 'Templates', href: '#templates' },
  ]
  const partnerMoreLinks = [
    { name: 'Commodity', href: '#commodity' },
    { name: 'AMC Directory', href: '#amcSection' },
    { name: 'Compliance', href: '#compliance' },
  ]

  const navLinks = currentView === 'partner' ? partnerLinks : homeLinks
  const moreLinks = currentView === 'partner' ? partnerMoreLinks : homeMoreLinks

  const { scrollY } = useScroll()
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.2)']
  )

  const handleNavClick = (e, href) => {
    setIsOpen(false)
    if (href === '#') {
      e.preventDefault()
      if (currentView !== 'home') {
        onViewChange('home')
      }
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    if (href.startsWith('#')) {
      e.preventDefault()
      if (currentView !== 'home' && currentView !== 'partner') {
        onViewChange('home')
        setTimeout(() => {
          const el = document.querySelector(href)
          if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 100
            window.scrollTo({ top: y, behavior: 'smooth' })
          }
        }, 150)
      } else {
        const el = document.querySelector(href)
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 100
          window.scrollTo({ top: y, behavior: 'smooth' })
        }
      }
    }
  }



  return (
    <motion.header
      style={{ backgroundColor }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b border-gray-100/50"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex py-0 md:py-1 items-center justify-between">
          
          <a href="#" onClick={(e) => { e.preventDefault(); onViewChange('home'); window.scrollTo(0,0); }} className="flex items-center space-x-3 md:space-x-4">
            <div className="shine-wrapper rounded-xl flex-shrink-0">
              <img 
                src={`${import.meta.env.BASE_URL}vemurifinance_logo.png`}
                alt="Vemuri Financial Services Logo" 
                className="h-16 md:h-24 w-auto object-contain block" 
                onError={(e) => e.target.style.display = 'none'} 
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-base sm:text-lg md:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-700 to-primary-500 tracking-tight leading-tight">
                Vemuri Financial Services
              </span>
              <div className="flex flex-col text-[9px] sm:text-[10px] md:text-xs font-semibold text-gray-500 leading-snug mt-0.5">
                {/* <span><span className="text-primary-500 mr-1">🔹</span>Simple. Smart. Secure Finance.</span> */}
                <span><span className="text-primary-500 mr-1">🔹</span>One Partner for All Your Financial Needs</span>
              </div>
              {/* <div className="mt-1.5 inline-block bg-primary-50 text-primary-700 text-[8px] md:text-[10px] font-bold px-2 py-0.5 rounded border border-primary-100 w-max">
                AMFI Registered Mutual Fund Distributor - ARN-302882
              </div> */}
            </div>
          </a>

          <div className="flex items-center md:space-x-3 lg:space-x-4">
            <nav className="hidden lg:flex items-center space-x-5 lg:space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm font-medium text-gray-600 hover:text-primary-500 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              {moreLinks.length > 0 && (
                <div className="relative group">
                  <button className="text-sm font-medium text-gray-600 hover:text-primary-500 transition-colors flex items-center gap-1">
                    More
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top scale-95 group-hover:scale-100 flex flex-col p-1">
                    {moreLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="px-4 py-2.5 text-left text-sm font-semibold text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </nav>

            <div className="flex items-center space-x-3 lg:space-x-4">
              {/* Main Website button removed from header as requested */}

              <div className="hidden lg:flex items-center">
                {/* Login Dropdown: Client Login + VFS Office */}
                <div className="relative group">
                  <button className="px-4 py-2.5 text-xs font-bold text-gray-600 bg-gray-50 border border-gray-100 hover:bg-white hover:text-primary-600 rounded-full shadow-sm hover:shadow-md transition-all flex items-center gap-1">
                    {currentView === 'vfs-benefits' ? 'Distributor Backoffice' : 'Login'}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100 flex flex-col p-1">
                    <a
                      href="https://vfs.vemurigroup.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 text-left text-sm font-semibold text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
                    >
                      Client Login
                    </a>
                    <div className="h-px bg-gray-100 my-1 mx-2" />
                    <span className="px-4 pt-1 pb-1 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                      VFS Office
                    </span>
                    <a
                      href="https://vfsoffice.vemurigroup.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 text-left text-sm font-semibold text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
                    >
                      Portal Login
                    </a>
                  </div>
                </div>
              </div>
              
              <a 
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className={`hidden lg:inline-flex items-center justify-center px-4 lg:px-6 py-2.5 text-sm font-semibold text-white bg-primary-500 hover:bg-primary-600 rounded-full transition-colors shadow-lg shadow-primary-500/30 ${currentView === 'partner' ? 'hidden' : ''}`}
              >
                Get Advice
              </a>
              
              <button 
                className="lg:hidden p-2 text-gray-600 hover:text-primary-500"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-white border-b border-gray-100 px-4 py-6 shadow-xl absolute top-full left-0 right-0"
        >
            <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-base font-medium text-gray-900 hover:text-primary-500"
              >
                {link.name}
              </a>
            ))}
            {moreLinks.length > 0 && (
              <>
                <div className="h-px bg-gray-100 my-1" />
                {moreLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-base font-medium text-gray-900 hover:text-primary-500"
                  >
                    {link.name}
                  </a>
                ))}
              </>
            )}
            <div className="h-px bg-gray-100 my-2" />
            
            {currentView !== 'home' && (
              <button 
                onClick={() => { onViewChange('home'); window.scrollTo(0, 0); setIsOpen(false); }}
                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-full mt-4"
              >
                Back to Main Website
              </button>
            )}
            <div className="flex flex-col space-y-2 mt-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <span className="text-xs font-bold tracking-widest text-gray-500 uppercase px-2 mb-1">
                Login
              </span>
              <a
                href="https://vfs.vemurigroup.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-left px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-xl"
                onClick={() => setIsOpen(false)}
              >
                Client Login
              </a>
              <div className="h-px bg-gray-200 my-1 mx-2" />
              <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase px-2">
                {currentView === 'vfs-benefits' ? 'Distributor Backoffice' : 'VFS Office'}
              </span>
              <a
                href="https://vfsoffice.vemurigroup.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-left px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-xl"
                onClick={() => setIsOpen(false)}
              >
                Portal Login
              </a>
            </div>
            {currentView === 'home' && (
              <a 
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-primary-500 hover:bg-primary-600 rounded-full mt-3"
                onClick={(e) => handleNavClick(e, '#contact')}
              >
                Get Advice
              </a>
            )}
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}