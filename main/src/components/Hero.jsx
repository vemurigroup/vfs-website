import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Shield, TrendingUp } from 'lucide-react'
import ShinyText from './ShinyText'
import { useState, useEffect } from 'react'

export default function Hero() {
  const [isExpanded, setIsExpanded] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsExpanded(prev => !prev)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="home" className="relative pt-20 md:pt-28 pb-16 overflow-hidden bg-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100 rounded-full blur-[120px] -mr-40 -mt-20" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px] -ml-40 -mb-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col space-y-8"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-600 text-sm font-medium w-fit min-h-[32px]">
              <motion.div
                animate={{ rotate: isExpanded ? 360 : 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="flex items-center justify-center flex-shrink-0"
              >
                <Sparkles className="h-4 w-4" />
              </motion.div>
              <motion.div
                initial={{ width: "auto", opacity: 1 }}
                animate={{
                  width: isExpanded ? "auto" : 0,
                  opacity: isExpanded ? 1 : 0
                }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="overflow-hidden whitespace-nowrap"
              >
                <div className="pl-2">
                  <ShinyText
                    text="A balanced plan for every life stage"
                    speed={2}
                    delay={0}
                    color="#2B22C9"
                    shineColor="#ffffff"
                    spread={120}
                    direction="left"
                    yoyo={false}
                    pauseOnHover={false}
                  />
                </div>
              </motion.div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
              <span className="text-gradient">Protect today.</span><br />Grow for tomorrow.
            </h1>

            <p className="text-xl text-gray-600 max-w-[600px] leading-relaxed">
              Build a resilient financial plan that shields your family from risks and consistently grows your wealth. We blend <b>protection</b> (Term & Health) with <b>creation</b> (Mutual Funds & NPS).
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); const el = document.querySelector('#contact'); if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' }); }}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary-500 text-white font-semibold text-base shadow-xl shadow-primary-500/20 hover:bg-primary-600 transition-colors cursor-pointer"
              >
                Start your plan
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="#solutions"
                onClick={(e) => { e.preventDefault(); const el = document.querySelector('#solutions'); if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' }); }}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-gray-200 text-gray-900 font-semibold text-base hover:border-primary-500 hover:text-primary-600 transition-colors cursor-pointer"
              >
                Explore solutions
              </a>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900">₹10k → ₹1Cr*</span>
                <span className="text-sm text-gray-500">Long-term SIP potential</span>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900">2 Pillars</span>
                <span className="text-sm text-gray-500">Protection + Creation</span>
              </div>
            </div>
            <p className="text-xs text-gray-400">*Illustrative, not guaranteed. Market-linked & subject to risk.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-white/20 glass p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Your Financial Shield & Engine</h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Emergency Fund</h4>
                    <p className="text-sm text-gray-500">6–12 months expenses securely parked.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Risk Cover</h4>
                    <p className="text-sm text-gray-500">Term life 10–15× annual income + Health floater.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Wealth Engine</h4>
                    <p className="text-sm text-gray-500">Mutual Fund SIPs + NPS for long-term growth.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-600 italic">"Sequence matters: secure the downside first, then scale investments."</p>
              </div>
            </div>

            {/* <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-10 -right-10 z-20 glass p-4 rounded-xl shadow-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">100%</div>
                  <div className="text-xs text-gray-500">Goal-based</div>
                </div>
              </div>
            </motion.div> */}
          </motion.div>
        </div>
      </div>
    </section>
  )
}