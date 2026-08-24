import React from 'react'
import { motion } from 'framer-motion'
import { ShieldAlert, TrendingUp } from 'lucide-react'

export default function Pillars() {
  return (
    <section id="pillars" className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">The 2 Pillars of Wealth</h2>
          <p className="mt-4 text-xl text-primary-600 font-medium">Protect first, grow next</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Pillar 1: Protection */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-8 lg:p-12 relative overflow-hidden group hover:border-red-200 transition-colors"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-400 to-red-600" />
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <ShieldAlert size={32} />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">1. Wealth Protection</h3>
            <p className="text-lg text-gray-600 mb-6">Securing the foundation against life’s uncertainties.</p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 rounded-full bg-red-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700"><strong>Term Insurance:</strong> Replace future income if you’re not around.</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 rounded-full bg-red-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700"><strong>Health Insurance:</strong> Protect savings from medical inflation.</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 rounded-full bg-red-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700"><strong>Emergency Fund:</strong> Liquid cash for short-term shocks (FDs, Liquid Funds).</span>
              </li>
            </ul>
          </motion.div>

          {/* Pillar 2: Creation */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-3xl p-8 lg:p-12 relative overflow-hidden group hover:border-green-200 transition-colors"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-green-600" />
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <TrendingUp size={32} />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">2. Wealth Creation</h3>
            <p className="text-lg text-gray-600 mb-6">Building the engine for future prosperity.</p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700"><strong>Equity Mutual Funds:</strong> Long-term inflation-beating growth.</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700"><strong>Debt Funds & Bonds:</strong> Stability and consistent returns.</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700"><strong>NPS:</strong> Tax-efficient retirement corpus building.</span>
              </li>
            </ul>
          </motion.div>
        </div>
        
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, delay: 0.4 }}
           className="mt-12 bg-primary-50 rounded-2xl p-6 md:p-8 text-center border border-primary-100"
        >
          <p className="text-lg md:text-xl text-primary-800 font-medium">
            "We don't just sell products; we architect a plan."
          </p>
        </motion.div>
      </div>
    </section>
  )
}