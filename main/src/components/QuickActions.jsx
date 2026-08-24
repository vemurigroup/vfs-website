import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar } from 'lucide-react'

export default function QuickActions() {
  const [hoveredButton, setHoveredButton] = useState(null)

  const buttons = [
    // {
    //   id: 'plan',
    //   icon: Target,
    //   label: 'Free Financial Plan',
    //   color: 'bg-[#FF6B6B]', // Vibrant Coral/Red
    //   onClick: handleScrollToContact
    // },
    {
      id: 'calendar',
      icon: Calendar,
      label: 'Book Consultation',
      color: 'bg-primary-600', // Primary Blue
      onClick: (e) => {
        e.preventDefault()
        window.open('https://calendly.com/vemurifin/30min', '_blank')
      }
    }
  ]

  return (
    <div className="fixed top-1/2 -translate-y-1/2 right-0 z-50 flex flex-col gap-3 pr-0">
      {buttons.map((btn) => {
        const Icon = btn.icon
        const isHovered = hoveredButton === btn.id

        return (
          <motion.div
            key={btn.id}
            onHoverStart={() => setHoveredButton(btn.id)}
            onHoverEnd={() => setHoveredButton(null)}
            className="flex items-center justify-end"
          >
            <motion.button
              onClick={btn.onClick}
              initial={false}
              animate={{ 
                width: isHovered ? 'auto' : '52px',
                paddingRight: isHovered ? '24px' : '0px',
                borderTopLeftRadius: '26px',
                borderBottomLeftRadius: '26px',
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className={`relative h-[52px] ${btn.color} text-white shadow-xl shadow-black/10 flex items-center overflow-hidden hover:brightness-110 group border-y border-l border-white/20`}
            >
              {/* Highlight Pulse Effect */}
              {!isHovered && (
                <div className="absolute inset-0 rounded-full animate-pulse bg-white/20" />
              )}
              
              <div className="w-[52px] h-[52px] flex-shrink-0 flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="whitespace-nowrap font-bold text-sm tracking-wide pr-2"
                  >
                    {btn.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        )
      })}
    </div>
  )
}
