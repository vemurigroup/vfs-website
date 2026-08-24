import React from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  ShieldCheck,
  HeartPulse,
  Landmark,
  GraduationCap,
  Umbrella,
  Wallet,
  PiggyBank,
  PieChart,
  CheckCircle2
} from 'lucide-react'

const solutions = [
  {
    badge: 'Wealth Creation',
    title: 'Mutual Funds (SIP)',
    description: 'Start with diversified equity index/active funds. Align each SIP to a specific goal—education, house, or retirement.',
    icon: TrendingUp,
    color: 'bg-primary-500',
    features: [
      'Automate monthly investing',
      'Top-up SIP annually to beat inflation',
      'Use debt/hybrid for short horizons'
    ]
  },
  {
    badge: 'Protection',
    title: 'Term Insurance',
    description: 'Pure life cover to protect dependents. Choose adequate sum assured and keep nominee details updated.',
    icon: ShieldCheck,
    color: 'bg-blue-500',
    features: [
      '10–15× annual income coverage',
      'Cover until planned retirement age',
      'Disclose health & lifestyle honestly'
    ]
  },
  {
    badge: 'Protection',
    title: 'Health Insurance',
    description: 'Safeguard savings from medical costs with a family floater and high-deductible top-up.',
    icon: HeartPulse,
    color: 'bg-red-500',
    features: [
      'Cashless network hospitals',
      'No-claim bonus & restoration',
      'Consider OPD & maternity as needed'
    ]
  },
  {
    badge: 'Retirement & Tax',
    title: 'NPS (National Pension System)',
    description: 'NPS adds an extra tax deduction under Sec 80CCD(1B) up to ₹50,000 and builds a disciplined retirement corpus.',
    icon: Landmark,
    color: 'bg-green-500',
    features: [
      'Choose active or auto choice',
      'Low-cost equity & debt exposure',
      'Lock-in till retirement encourages discipline'
    ]
  },
  {
    badge: 'Goal Planning',
    title: 'Children’s Education Planning',
    description: 'Map current costs to future value, then back-calc SIP needed. Use equity for long horizon; debt for near-term.',
    icon: GraduationCap,
    color: 'bg-purple-500',
    features: [
      'Inflation-adjusted goal values',
      'Dedicated goal-based funds',
      'Annual review & rebalancing'
    ]
  },
  {
    badge: 'Lifetime Goal',
    title: 'Retirement Planning',
    description: 'Combine NPS + MF SIPs for growth, then shift to income strategies near retirement.',
    icon: Umbrella,
    color: 'bg-orange-500',
    features: [
      'Target corpus with SWP plan later',
      'Glide path: equity → hybrid → debt',
      'Tax-aware withdrawal strategy'
    ]
  },
  {
    badge: 'Instant Liquidity',
    title: 'Loan Against Mutual Fund',
    description: 'Unlock liquidity instantly by pledging your mutual fund investments without selling them.',
    icon: Wallet,
    color: 'bg-indigo-500',
    features: [
      'Lower Interest Rates',
      'Quick & Hassle-Free Processing',
      'No Impact on Investments'
    ]
  },
  {
    badge: 'Safe & Accessible',
    title: 'Emergency Fund',
    description: 'Build a financial cushion for emergencies with liquid & arbitrage mutual funds that ensure quick access to your money.',
    icon: PiggyBank,
    color: 'bg-teal-500',
    features: [
      'High Liquidity – withdraw anytime',
      'Better returns than Savings Account',
      'Low Risk & Safe investment'
    ]
  },
  {
    badge: 'Diversified Growth',
    title: 'Diversified Asset Allocation',
    description: 'Invest across equity, debt, and gold for balanced returns with lower risk.',
    icon: PieChart,
    color: 'bg-cyan-500',
    features: [
      'Diversification across asset classes',
      'Reduces overall portfolio volatility',
      'Potential for stable, long-term growth'
    ]
  }
]

export default function Solutions() {
  return (
    <section id="solutions" className="py-8 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-50 rounded-full blur-[100px] -mr-20 -mt-20 -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-[100px] -ml-20 -mb-20 -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary-500">
            Solutions & Use-Cases
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900">
            Pick what you need now — <span className="text-primary-500">add more as life evolves.</span>
          </h3>
          <p className="text-lg text-gray-600">
            From protecting your family today to leaving a legacy tomorrow, we map every investment to a specific, measurable life goal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden border border-gray-100 flex flex-col"
            >
              <div className={`h-2 w-full ${solution.color}`} />
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl ${solution.color} bg-opacity-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <solution.icon className={`h-8 w-8 ${solution.color.replace('bg-', 'text-')}`} />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${solution.color} text-white`}>
                    {solution.badge}
                  </span>
                </div>

                <h4 className="text-2xl font-bold mb-3 text-gray-900">{solution.title}</h4>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {solution.description}
                </p>

                <div className="mt-auto space-y-3 pt-6 border-t border-gray-100">
                  {solution.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}