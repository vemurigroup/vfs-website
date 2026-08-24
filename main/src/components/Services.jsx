import React from 'react'
import { motion } from 'framer-motion'
import { 
  Briefcase, 
  Landmark, 
  RefreshCcw, 
  Home, 
  IndianRupee, 
  Globe, 
  HeartPulse, 
  ShieldCheck, 
  Car, 
  TrendingUp, 
  PiggyBank, 
  Gem,
  ExternalLink,
  Phone
} from 'lucide-react'

const services = [
  {
    badge: 'Onboarding',
    title: 'Mutual Fund Onboarding',
    description: 'Start a fresh mutual fund folio or manage existing investments — choose whichever platform works best for you.',
    icon: Briefcase,
    color: 'bg-blue-500',
    links: [
      { text: 'VFS Web Login', url: 'https://vfs.vemurigroup.in/', type: 'web' }
    ]
  },
  {
    badge: 'Retirement',
    title: 'NPS — National Pension System',
    description: 'Log in or Create your NPS account to contribute, switch fund managers, or check your retirement corpus.',
    icon: Landmark,
    color: 'bg-green-500',
    links: [
      { text: 'NPS Login', url: 'https://tinyurl.com/vfsnps', type: 'web' }
    ]
  },
  {
    badge: 'Instant Liquidity',
    title: 'Loan Against Mutual Funds',
    description: 'Unlock cash against your MF portfolio without redeeming it. Compare and apply with our lending partners.',
    icon: RefreshCcw,
    color: 'bg-indigo-500',
    links: [
      { text: 'Volt Money', url: 'https://voltmoney.in/check-loan-eligibility-against-mutual-funds?ref=UMLIMC', type: 'web' },
      { text: 'Quicklend', url: 'https://www.quicklend.in?ref_code=NIABFETK', type: 'web' },
      { text: 'Yenmo', url: 'https://vemurifin.loanonline.cc/', type: 'web' },
      { text: 'NJ Capital', url: 'https://www.njcapital.in/partner/customer/login', type: 'web' }
    ]
  },
  {
    badge: 'Property',
    title: 'Home Loan',
    description: 'Explore home loan and loan-against-securities options through our FundsIndia partnership for your property needs.',
    icon: Home,
    color: 'bg-orange-500',
    links: [
      { text: 'Eligibility Check', url: 'https://frm.finfinity.co.in/?utm_campaign=302882', type: 'web' }
    ]
  },
  {
    badge: 'Quick Approval',
    title: 'Personal Loan',
    description: 'Rates starting at 9.99%* p.a. Speak to our loan officer directly for eligibility & a personalised quote.',
    icon: IndianRupee,
    color: 'bg-teal-500',
    links: [
      { text: 'Get a Quote', url: 'tel:+919886291668', type: 'phone' },
      { text: 'Eligibility Check', url: 'https://frm.finfinity.co.in/?utm_campaign=302882', type: 'web' }
    ]
  },
  {
    badge: 'Global Investing',
    title: 'Global Funds — GIFT City',
    description: 'Access international market exposure via GIFT City\'s IFSC framework, and open a Samco demat account.',
    icon: Globe,
    color: 'bg-cyan-500',
    links: [
      { text: 'GIFT City Overview', url: 'https://tinyurl.com/dspgiftcity', type: 'web' },
      { text: 'US Trade Login', url: 'https://sam-co.in/bkJzRDhiZGg1SVdOSWdRemVCS3FXUT09', type: 'web' }
    ]
  },
  {
    badge: 'Protection',
    title: 'Health Insurance',
    description: 'Family floater and super top-up plans to safeguard your savings from medical emergencies.',
    icon: HeartPulse,
    color: 'bg-red-500',
    links: [
      { text: 'Get a Quote', url: 'tel:+919886291668', type: 'phone' }
    ]
  },
  {
    badge: 'Protection',
    title: 'Term Insurance',
    description: 'Pure, low-cost life cover to protect your family\'s income and outstanding liabilities.',
    icon: ShieldCheck,
    color: 'bg-purple-500',
    links: [
      { text: 'Check Plans', url: 'https://sitaramaranganadharamanujadasuvemuri.axismaxlife.agency/website/', type: 'web' }
    ]
  },
  {
    badge: 'Protection',
    title: 'General Insurance',
    description: 'Motor, home, travel & other general insurance covers tailored to your everyday needs.',
    icon: Car,
    color: 'bg-pink-500',
    links: [
      { text: 'Get a Quote', url: 'tel:+919886291668', type: 'phone' },
      { text: 'Check Plans', url: 'https://tinyurl.com/tataaig01', type: 'web' }
    ]
  },
  {
    badge: 'Fixed Income',
    title: 'Bonds',
    description: 'Explore government, corporate & RBI bonds for steady, market-linked fixed income.',
    icon: TrendingUp,
    color: 'bg-emerald-500',
    links: [
      { text: 'Explore Bonds', url: 'https://ndxfinserv.com/signUp/NDX0001197', type: 'web' }
    ]
  },
  {
    badge: 'Fixed Income',
    title: 'Fixed Deposit',
    description: 'Explore fixed deposit options for secure, predictable returns on your savings.',
    icon: PiggyBank,
    color: 'bg-amber-500',
    links: [
      { text: 'Connect', url: 'tel:+919886291668', type: 'phone' }
    ]
  },
  {
    badge: 'Alternative Investment',
    title: 'Gold & Silver Investments',
    description: 'Explore gold investment options for diversification and hedge against inflation.',
    icon: Gem,
    color: 'bg-yellow-500',
    links: [
      { text: 'Connect', url: 'tel:+919886291668', type: 'phone' },
      { text: 'Explore Investments', url: 'https://qrcode.batuk.gold/partner/?ref=SRRRV461', type: 'web' }
    ]
  }
]

export default function Services() {
  return (
    <section id="services" className="py-8 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary-500">
            Our Services
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900">
            One-tap access to <span className="text-primary-500">everything you need</span>
          </h3>
          <p className="text-lg text-gray-600">
            Directly connect with onboarding, loans, NPS, insurance, bonds & global investing from a single platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden border border-gray-100 flex flex-col"
            >
              <div className={`h-1.5 w-full ${service.color}`} />
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${service.color} bg-opacity-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className={`h-6 w-6 ${service.color.replace('bg-', 'text-')}`} />
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${service.color} text-white`}>
                    {service.badge}
                  </span>
                </div>
                
                <h4 className="text-xl font-bold mb-2 text-gray-900">{service.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>
                
                <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                  {service.links.map((link, lIndex) => (
                    <a
                      key={lIndex}
                      href={link.url}
                      target={link.type === 'web' ? '_blank' : undefined}
                      rel={link.type === 'web' ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 transition-colors"
                    >
                      {link.type === 'phone' ? (
                        <Phone className="w-3.5 h-3.5 mr-1.5 text-primary-500" />
                      ) : (
                        <ExternalLink className="w-3.5 h-3.5 mr-1.5 text-primary-500" />
                      )}
                      {link.text}
                    </a>
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