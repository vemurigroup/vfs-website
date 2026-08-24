import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, HeartPulse, TrendingUp, Landmark, PieChart } from 'lucide-react'

const comparisonData = [
  {
    product: 'Term Insurance',
    icon: ShieldCheck,
    purpose: 'Income protection',
    bestFor: 'Dependents, loans',
    horizon: 'Until retirement',
    liquidity: 'Claim on event',
    color: 'text-blue-500'
  },
  {
    product: 'Health Insurance',
    icon: HeartPulse,
    purpose: 'Medical cost cover',
    bestFor: 'Family protection',
    horizon: 'Ongoing',
    liquidity: 'Cashless claims',
    color: 'text-red-500'
  },
  {
    product: 'Mutual Funds (Equity)',
    icon: TrendingUp,
    purpose: 'Wealth creation',
    bestFor: 'Long-term goals',
    horizon: '5–15+ years',
    liquidity: 'High (T+2)',
    color: 'text-primary-500'
  },
  {
    product: 'NPS',
    icon: Landmark,
    purpose: 'Retirement+tax',
    bestFor: 'Tax-efficient corpus',
    horizon: 'Until retirement',
    liquidity: 'Restricted (lock-in)',
    color: 'text-green-500'
  },
  {
    product: 'Debt/Hybrid MF',
    icon: PieChart,
    purpose: 'Stability & parking',
    bestFor: 'Short to medium goals',
    horizon: '3 months – 3 years',
    liquidity: 'High (T+2)',
    color: 'text-purple-500'
  }
]

export default function Compare() {
  return (
    <section id="compare" className="py-8 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary-500">
            Quick Comparison
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900">
            Each product solves a <span className="text-primary-500">specific job.</span>
          </h3>
          <p className="text-lg text-gray-600">
            Mix them wisely to build a balanced, resilient financial portfolio.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="py-5 px-6 font-semibold text-gray-900 whitespace-nowrap">Product</th>
                  <th className="py-5 px-6 font-semibold text-gray-900 whitespace-nowrap">Primary Purpose</th>
                  <th className="py-5 px-6 font-semibold text-gray-900 whitespace-nowrap">Best For</th>
                  <th className="py-5 px-6 font-semibold text-gray-900 whitespace-nowrap">Time Horizon</th>
                  <th className="py-5 px-6 font-semibold text-gray-900 whitespace-nowrap">Liquidity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 px-6">
                      <div className="flex items-center space-x-3">
                        <row.icon className={`w-5 h-5 ${row.color}`} />
                        <span className="font-semibold text-gray-900">{row.product}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-gray-600">{row.purpose}</td>
                    <td className="py-5 px-6 text-gray-600">{row.bestFor}</td>
                    <td className="py-5 px-6 text-gray-600">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {row.horizon}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-gray-600">{row.liquidity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 flex items-center">
              <span className="text-primary-500 font-bold mr-1">Note:</span> Returns are market-linked or policy-specific; read scheme documents & policy wordings carefully.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}