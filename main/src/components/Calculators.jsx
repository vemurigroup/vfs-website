import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Sip from '../components/Sip'
import Swp from '../components/Swp'
import Fd from '../components/Fd'
import Inflation from '../components/Inflation'
import { Calculator, ChevronRight } from 'lucide-react'

const popularCalculators = [
  { id: 'sip', name: 'SIP Calculator', desc: 'Plan monthly investments and estimate wealth growth over time.' },
  { id: 'lumpsum', name: 'Lumpsum Calculator', desc: 'Estimate returns on a one-time investment at a given rate.' },
  { id: 'swp', name: 'SWP Calculator', desc: 'Plan systematic withdrawals from your mutual fund corpus.' },
  { id: 'fd', name: 'FD Calculator', desc: 'Calculate maturity amount on fixed deposits at your bank rate.' },
  { id: 'inflation', name: 'Inflation Calculator', desc: 'See how inflation erodes your money\'s purchasing power.' }
  // { id: 'mf-returns', name: 'Mutual Fund Returns', desc: 'Check projected returns for lumpsum or SIP in mutual funds.' },
  // { id: 'ppf', name: 'PPF Calculator', desc: 'Estimate Public Provident Fund maturity with 15-year lock-in.' },
  // { id: 'epf', name: 'EPF Calculator', desc: 'Calculate Employee Provident Fund balance at retirement.' },
  // { id: 'rd', name: 'RD Calculator', desc: 'Forecast your recurring deposit maturity value.' },
  // { id: 'emi', name: 'EMI Calculator', desc: 'Find your monthly EMI for home, car, or personal loans.' },
  // { id: 'nps', name: 'NPS Calculator', desc: 'Project your National Pension System corpus and pension.' },
  // { id: 'income-tax', name: 'Income Tax Calculator', desc: 'Estimate your tax liability under old and new regimes.' },
]

export default function Calculators() {
  const [activeTab, setActiveTab] = useState('sip')

  const handleCalcClick = (id) => {
    if (['sip', 'lumpsum', 'swp', 'fd', 'inflation'].includes(id)) {
      setActiveTab(id)
      // Scroll up to the calculator area, especially important for mobile 
      // where the sidebar is below the calculator
      const el = document.getElementById('sip')
      if (el) {
        window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' })
      }
    }
  }

  return (
    <section id="sip" className="py-8 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary-500">
            Planning Tools
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900">
            Calculate Your <span className="text-primary-500">Future</span>
          </h3>
          <p className="text-lg text-gray-600">
            Plan your investments, estimate your returns, and stay ahead of inflation with our suite of smart financial tools.
          </p>
        </div>

        {/* Main Content: Calculator + Sidebar */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-10">
          {/* Calculator Area */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1 min-w-0"
          >
            {(activeTab === 'sip' || activeTab === 'lumpsum') && <Sip mode={activeTab} />}
            {activeTab === 'swp' && <Swp />}
            {activeTab === 'fd' && <Fd />}
            {activeTab === 'inflation' && <Inflation />}
          </motion.div>

          {/* Sidebar: Popular Calculators */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden sticky top-32">
              <div className="bg-gray-50 px-6 py-5 border-b border-gray-100">
                <h4 className="font-bold text-gray-900 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-primary-500" />
                  Popular Calculators
                </h4>
              </div>
              <div className="divide-y divide-gray-50">
                {popularCalculators.map((calc) => (
                  <button
                    key={calc.id}
                    onClick={() => handleCalcClick(calc.id)}
                    className={`relative w-full text-left pl-5 pr-6 py-4 hover:bg-primary-50 transition-colors group ${
                      activeTab === calc.id ? 'bg-primary-50/50' : ''
                    }`}
                  >
                    {activeTab === calc.id && (
                      <span className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500 rounded-r-full" />
                    )}
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <span className={`text-sm font-semibold block ${
                          activeTab === calc.id
                            ? 'text-primary-600'
                            : 'text-gray-800 group-hover:text-primary-600'
                        }`}>
                          {calc.name}
                        </span>
                        <span className="text-xs text-gray-400 leading-snug block mt-1 line-clamp-2">
                          {calc.desc}
                        </span>
                      </div>
                      <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-colors ${
                        activeTab === calc.id
                          ? 'text-primary-500'
                          : 'text-gray-300 group-hover:text-primary-400'
                      }`} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
