import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Shield, Monitor, FileSpreadsheet, Calculator, Briefcase, ChevronRight, BarChart, Search, Building2, ChevronDown, Check, Minus } from 'lucide-react'
import { useLanguage } from '../i18n/useLanguage'

export default function VfsOfficeBenefits({ onNavigateHome }) {
  const { t } = useLanguage()
  React.useEffect(() => {
    const originalTitle = document.title
    document.title = "VFS Office – Distributor Backoffice"
    return () => {
      document.title = originalTitle
    }
  }, [])

  const plans = [
    { name: 'Basic', price: '₹0', term: 'forever', features: ['21 of 31 tools', '200MB storage', '50 credits/mo'] },
    { name: 'Medium', price: '₹49', term: '/month', features: ['26 of 31 tools', '1GB storage', '500 credits/mo'] },
    { name: 'Advanced', price: '₹99', term: '/month', features: ['30 of 31 tools', 'Unlimited users', 'Unlimited credits'], popular: true },
    { name: 'Enterprise', price: '₹1,999', term: '/year', features: ['All 31 tools', 'My Business Profile included', 'Priority Support'] }
  ]

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-teal-600" />,
      title: "Files never leave your browser",
      description: "Commission PDF signing happens on your own computer — nothing sensitive uploaded."
    },
    {
      icon: <Monitor className="w-8 h-8 text-teal-600" />,
      title: "No tech skills needed",
      description: "If you can use WhatsApp, you can use every module from day one."
    },
    {
      icon: <Briefcase className="w-8 h-8 text-teal-600" />,
      title: "Your own branding on reports",
      description: "My Business Profile puts your name, not just the company's, on client documents."
    }
  ]

  const allTools = [
    { category: "Distributor tools", items: ["GST & Commission Invoicing", "GST Filing History & Operations", "Monthly MFD Wizard", "My Business Profile"] },
    { category: "AMCs", items: ["AMCs at a Glance", "AMC Directory", "MF US/Canada Residency Rules"] },
    { category: "Client tools", items: ["Multisheet", "22 Calculators", "NPS Detail Calculator", "Bank ePayEEZZ Availability", "Financial Planner", "Advanced Financial Planner"] },
    { category: "Marketing", items: ["Mail (festival, birthday & anniversary templates)", "Social Post Composer", "WhatsApp Messaging"] },
    { category: "Reports", items: ["Report Builder", "External Reports (CAMS & tax)", "Reports Center"] },
    { category: "Knowledge", items: ["Certification Prep", "Industry Ecosystem Directory", "Document Library", "Regulatory Updates", "Search", "Knowledge Base"] },
    { category: "Support & admin", items: ["Feedback & Testimonials", "Support Tickets", "Approvals", "Feedback Dashboard", "Mail Campaigns", "Error & Issue Monitor"] }
  ]

  const faqs = [
    { q: "What happens when my 30-day trial ends?", a: "Nothing breaks and nothing is deleted. Your account simply drops back to the free Basic plan automatically — upgrade again whenever you're ready, at any time." },
    { q: "Is my commission data safe?", a: "PDF signing and Excel mapping happen entirely inside your own browser — those files are never uploaded to any server, even temporarily, during processing." },
    { q: "Do I need to know Excel or GST rules?", a: "No. The GST & Commission Invoicing workflow is a guided, numbered checklist — it tells you what to do at each step, not the other way around." },
    { q: "Can I change plans later?", a: "Yes, any time, from your own account — upgrade, downgrade, or cancel. There's no separate request or approval needed." },
    { q: "How do I pay?", a: "By UPI (scan and enter your reference number) or by card/netbanking where available. A free plan needs no payment step at all." },
    { q: "What if I get stuck?", a: "Built-in Search covers documentation and FAQs instantly, and every plan includes access to Support Tickets for anything Search can't answer." }
  ]

  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="pt-28 md:pt-32 pb-16 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-500/30 text-yellow-500 text-sm font-bold tracking-widest uppercase mb-8"
          >
            {t('VFS Office · Distributor Backoffice')}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-6 leading-tight"
          >
            {t('Everything your MFD business does on paper, ')}<span className="text-yellow-500">{t('done in minutes online.')}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            {t('One login for GST commission invoicing, client calculators, AMC information, reports, and your own business profile — built specifically for Indian Mutual Fund Distributors, from your first day to your busiest month-end.')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="https://vfsoffice.vemurigroup.in/request-access.php"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-yellow-500 text-slate-900 font-bold rounded-xl hover:bg-yellow-400 transition-colors w-full sm:w-auto"
            >
              {t('Try Free — Get Started on Basic')}
            </a>
            <a
              href="https://vfsoffice.vemurigroup.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/10 text-white border border-white/20 font-bold rounded-xl hover:bg-white/20 transition-colors w-full sm:w-auto inline-flex justify-center items-center gap-2"
            >
              {t('Portal Login')} <ChevronRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Free Strip */}
      <div className="bg-yellow-500 text-slate-900 text-center py-3 font-bold text-sm sm:text-base">
        ✓ {t('Basic plan is FREE forever — no card needed')}
      </div>

      {/* Stats */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="text-4xl font-black text-primary-600 mb-2">31</div>
            <div className="text-gray-500 font-medium">{t('tools, 1 login')}</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="text-4xl font-black text-primary-600 mb-2">30 {t('days')}</div>
            <div className="text-gray-500 font-medium">{t('full trial free')}</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="text-4xl font-black text-primary-600 mb-2">~90%</div>
            <div className="text-gray-500 font-medium">{t('less GST paperwork')}</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="text-4xl font-black text-primary-600 mb-2">₹0</div>
            <div className="text-gray-500 font-medium">{t('to get started')}</div>
          </div>
        </div>
      </section>

      {/* Why Switch */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-sm font-bold tracking-widest text-primary-600 uppercase mb-8 text-center">
            {t('Why distributors switch')}
          </div>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            {t("Built around how an MFD's month actually goes. Commission statements land. Clients call for a SIP number. Compliance paperwork is due. This app puts all three in one place.")}
          </p>
          <div className="space-y-8">
            {features.map((feature, idx) => (
              <div key={idx} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t(feature.title)}</h3>
                  <p className="text-gray-600 leading-relaxed">{t(feature.description)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inside the App - Detailed Features */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-sm font-bold tracking-widest text-primary-600 uppercase mb-4">
              {t('Inside the app')}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">{t('Six tools that do the heaviest lifting.')}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('These are the modules distributors use every single week — walked through exactly as they appear inside the app.')}</p>
          </div>

          <div className="space-y-24">
            {/* 1. GST */}
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 lg:pr-8">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6">
                  <FileSpreadsheet className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('GST & Commission Invoicing')}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{t('A whole month of GST paperwork, guided step by step. Download your commission reports, digitally sign every PDF with your saved signatory, auto-map the matching Excel, verify invoice numbers, and generate GST-ready reports.')}</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" /> <span className="text-gray-700">{t('Cuts a 3–4 hour monthly task down to about 20–30 minutes')}</span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" /> <span className="text-gray-700">{t('One click fetches, signs, and files a whole folder')}</span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" /> <span className="text-gray-700">{t('All processing happens in your own browser — nothing uploaded')}</span></li>
                </ul>
              </div>
              <div className="flex-1 w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="text-xs font-mono text-gray-400 mb-4 uppercase tracking-wider">{t('Step 3 of 8')}</div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-400"><CheckCircle className="w-5 h-5 text-teal-500" /> {t('Download CAMS / KFin reports')}</div>
                  <div className="flex items-center gap-3 text-gray-400"><CheckCircle className="w-5 h-5 text-teal-500" /> {t('Sign commission PDFs')}</div>
                  <div className="flex items-center gap-3 font-bold text-primary-600"><span className="w-5 h-5 border-2 border-primary-600 rounded-full flex items-center justify-center text-[10px]">3</span> {t('Map Excel & verify invoices')}</div>
                  <div className="flex items-center gap-3 text-gray-300"><div className="w-5 h-5 border-2 border-gray-200 rounded-full" /> {t('Generate GST-ready reports')}</div>
                </div>
              </div>
            </div>

            {/* 2. My Business Profile */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              <div className="flex-1 lg:pl-8">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6">
                  <Briefcase className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('My Business Profile')}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{t("Every report leaves with your name on it, not just the company's. Set your own business name, logo, tagline, contact details, and regulatory numbers once. Every report generated carries your identity.")}</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" /> <span className="text-gray-700">{t('One flag switches your own branding on or off')}</span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" /> <span className="text-gray-700">{t('Perfect for sub-distributors and franchisees')}</span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" /> <span className="text-gray-700">{t('Bundled at no extra cost into the Enterprise plan')}</span></li>
                </ul>
              </div>
              <div className="flex-1 w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-400">{t('LOGO')}</div>
                  <div className="h-4 bg-gray-200 w-32 mx-auto rounded mb-2"></div>
                  <div className="h-3 bg-gray-100 w-48 mx-auto rounded mb-6"></div>
                  <div className="flex justify-center gap-2">
                    <span className="px-3 py-1 bg-gray-50 text-xs rounded border text-gray-500">ARN-XXXX</span>
                    <span className="px-3 py-1 bg-gray-50 text-xs rounded border text-gray-500">GSTIN-XXXX</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Calculators */}
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 lg:pr-8">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6">
                  <Calculator className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('22 Client Calculators')}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{t('Every client conversation, backed by a printable projection. SIP, SWP, Lumpsum, Retirement, Loan EMI, and more — 22 calculators producing year-by-year tables, charts, and reports.')}</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" /> <span className="text-gray-700">{t('Turns a client meeting into a professional, printed take-away')}</span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" /> <span className="text-gray-700">{t('Dedicated NPS calculator covers allocation & annuity breakdowns')}</span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" /> <span className="text-gray-700">{t('Included free on every plan, from Basic upward')}</span></li>
                </ul>
              </div>
              <div className="flex-1 w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-end justify-between gap-2 h-32 mb-6 px-4">
                  {[40, 60, 50, 80, 70, 100, 90, 120].map((h, i) => (
                    <div key={i} className="w-full bg-primary-200 rounded-t-sm" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-400 font-medium px-4">
                  <span>{t('Chart')}</span>
                  <span>{t('Table')}</span>
                  <span>{t('Share/Print')}</span>
                </div>
              </div>
            </div>

            {/* 4. Reports Center */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              <div className="flex-1 lg:pl-8">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6">
                  <BarChart className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('Reports Center')}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{t('See the whole business without asking anyone for a spreadsheet. Subscription activity, payments, module usage, support performance — pulled straight from what the app has recorded.')}</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" /> <span className="text-gray-700">{t('Answers "what happened this month" in one screen')}</span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" /> <span className="text-gray-700">{t('Support performance includes CSAT and ticket resolution time')}</span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" /> <span className="text-gray-700">{t("Every figure traces back to the app's own real activity log")}</span></li>
                </ul>
              </div>
              <div className="flex-1 w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="text-sm text-gray-500 mb-1">{t('Active Subs')}</div>
                    <div className="text-3xl font-black text-primary-600">128</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="text-sm text-gray-500 mb-1">{t('Payments')}</div>
                    <div className="text-3xl font-black text-primary-600">₹42k</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 col-span-2 flex justify-between items-center">
                    <div className="text-sm text-gray-500">{t('Support CSAT')}</div>
                    <div className="text-xl font-black text-green-500">94%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Search */}
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 lg:pr-8">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6">
                  <Search className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('Search')}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{t('One box that searches the whole app at once. Type a question and get results from modules, documentation, workflows, AMCs, FAQs, and reports — instead of hunting through menus.')}</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" /> <span className="text-gray-700">{t('Works instantly, no setup, included on every plan')}</span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" /> <span className="text-gray-700">{t('Can optionally answer in natural language once AI is enabled')}</span></li>
                </ul>
              </div>
              <div className="flex-1 w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg p-3 mb-6">
                  <Search className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400 font-medium">{t('Search everything...')}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm p-2 bg-primary-50 text-primary-700 rounded"><span className="font-medium">{t('Modules')}</span> <span className="text-xs">3 {t('results')}</span></div>
                  <div className="flex items-center justify-between text-sm p-2 text-gray-600"><span className="font-medium">{t('Documentation')}</span> <span className="text-xs">1 {t('result')}</span></div>
                  <div className="flex items-center justify-between text-sm p-2 text-gray-600"><span className="font-medium">{t('AMCs & FAQs')}</span> <span className="text-xs">4 {t('results')}</span></div>
                </div>
              </div>
            </div>

            {/* 6. AMC Directory */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              <div className="flex-1 lg:pl-8">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6">
                  <Building2 className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('AMC Directory')}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{t("Every AMC's login link and speciality, already looked up. A built-in, always-current directory of Indian AMCs with empanelment status and direct login links.")}</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" /> <span className="text-gray-700">{t('No more hunting across bookmarks for the right AMC login')}</span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" /> <span className="text-gray-700">{t('Includes which AMCs accept US/Canada-resident investors')}</span></li>
                </ul>
              </div>
              <div className="flex-1 w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="space-y-4">
                  <div className="border border-gray-100 rounded-xl p-4 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-bold text-gray-900">SBI Mutual Fund</div>
                      <span className="text-[10px] uppercase font-bold bg-green-100 text-green-700 px-2 py-1 rounded">{t('Empanelled')}</span>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1"><span className="text-yellow-500">★</span> {t('Largest AUM')}</div>
                  </div>
                  <div className="border border-gray-100 rounded-xl p-4 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-bold text-gray-900">PPFAS Mutual Fund</div>
                      <span className="text-[10px] uppercase font-bold bg-green-100 text-green-700 px-2 py-1 rounded">{t('Empanelled')}</span>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1"><span className="text-yellow-500">★</span> {t('Value Investing')}</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Everything Included (30 Tools list) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-sm font-bold tracking-widest text-primary-600 uppercase mb-4">
              {t('Everything included')}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">{t('31 tools, organized the way your business thinks.')}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t("The complete set of tools, grouped by what they're for.")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allTools.map((cat, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h4 className="text-lg font-bold text-gray-900 mb-4">{t(cat.category)}</h4>
                <ul className="space-y-2">
                  {cat.items.map((item, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-primary-500 mt-1">•</span>
                      <span>{t(item)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Comparison */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-sm font-bold tracking-widest text-yellow-500 uppercase mb-4">
              {t('Plans & Pricing')}
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-4">{t('Start free. Upgrade only when you need to.')}</h2>
            <p className="text-slate-300">{t('Every plan includes the 30-day full-access trial first — this is what each one costs and unlocks after that.')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {plans.map((plan, idx) => (
              <div key={idx} className={`rounded-3xl p-8 border ${plan.popular ? 'bg-primary-600 border-primary-500 relative shadow-2xl scale-105 z-10' : 'bg-slate-800 border-slate-700'}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {t('Most Popular')}
                  </div>
                )}
                <h3 className={`text-xl font-bold mb-4 ${plan.popular ? 'text-white' : 'text-slate-300'}`}>{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className={`text-sm ${plan.popular ? 'text-primary-200' : 'text-slate-400'}`}>{t(plan.term)}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex gap-3 text-sm">
                      <CheckCircle className={`w-5 h-5 flex-shrink-0 ${plan.popular ? 'text-yellow-400' : 'text-primary-500'}`} />
                      <span className={plan.popular ? 'text-primary-50' : 'text-slate-300'}>{t(feature)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Feature Table */}
          <div className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden shadow-xl max-w-5xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-300 bg-slate-800/50">
                    <th className="p-4 md:p-6 font-semibold">{t('Feature Area')}</th>
                    <th className="p-4 md:p-6 font-semibold text-center">Basic</th>
                    <th className="p-4 md:p-6 font-semibold text-center">Medium</th>
                    <th className="p-4 md:p-6 font-semibold text-center">Advanced</th>
                    <th className="p-4 md:p-6 font-semibold text-center text-yellow-500">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  <tr className="hover:bg-slate-700/30 transition-colors">
                    <td className="p-4 md:p-6 text-sm text-slate-300">{t('Core client tools (calculators, planner, eKYC)')}</td>
                    <td className="p-4 md:p-6 text-center"><Check className="w-5 h-5 text-teal-400 mx-auto" /></td>
                    <td className="p-4 md:p-6 text-center"><Check className="w-5 h-5 text-teal-400 mx-auto" /></td>
                    <td className="p-4 md:p-6 text-center"><Check className="w-5 h-5 text-teal-400 mx-auto" /></td>
                    <td className="p-4 md:p-6 text-center"><Check className="w-5 h-5 text-teal-400 mx-auto" /></td>
                  </tr>
                  <tr className="hover:bg-slate-700/30 transition-colors">
                    <td className="p-4 md:p-6 text-sm text-slate-300">{t('AMC directory & bank payment info')}</td>
                    <td className="p-4 md:p-6 text-center"><Minus className="w-5 h-5 text-slate-600 mx-auto" /></td>
                    <td className="p-4 md:p-6 text-center"><Check className="w-5 h-5 text-teal-400 mx-auto" /></td>
                    <td className="p-4 md:p-6 text-center"><Check className="w-5 h-5 text-teal-400 mx-auto" /></td>
                    <td className="p-4 md:p-6 text-center"><Check className="w-5 h-5 text-teal-400 mx-auto" /></td>
                  </tr>
                  <tr className="hover:bg-slate-700/30 transition-colors">
                    <td className="p-4 md:p-6 text-sm text-slate-300">{t('GST & Commission Invoicing')}</td>
                    <td className="p-4 md:p-6 text-center"><Minus className="w-5 h-5 text-slate-600 mx-auto" /></td>
                    <td className="p-4 md:p-6 text-center"><Minus className="w-5 h-5 text-slate-600 mx-auto" /></td>
                    <td className="p-4 md:p-6 text-center"><Check className="w-5 h-5 text-teal-400 mx-auto" /></td>
                    <td className="p-4 md:p-6 text-center"><Check className="w-5 h-5 text-teal-400 mx-auto" /></td>
                  </tr>
                  <tr className="hover:bg-slate-700/30 transition-colors">
                    <td className="p-4 md:p-6 text-sm text-slate-300">{t('Report Builder & External Reports')}</td>
                    <td className="p-4 md:p-6 text-center"><Minus className="w-5 h-5 text-slate-600 mx-auto" /></td>
                    <td className="p-4 md:p-6 text-center"><Check className="w-5 h-5 text-teal-400 mx-auto" /></td>
                    <td className="p-4 md:p-6 text-center"><Check className="w-5 h-5 text-teal-400 mx-auto" /></td>
                    <td className="p-4 md:p-6 text-center"><Check className="w-5 h-5 text-teal-400 mx-auto" /></td>
                  </tr>
                  <tr className="hover:bg-slate-700/30 transition-colors">
                    <td className="p-4 md:p-6 text-sm text-slate-300">{t('Mail Marketing & Social Composer')}</td>
                    <td className="p-4 md:p-6 text-center"><Minus className="w-5 h-5 text-slate-600 mx-auto" /></td>
                    <td className="p-4 md:p-6 text-center text-sm">{t('Composer only')}</td>
                    <td className="p-4 md:p-6 text-center"><Check className="w-5 h-5 text-teal-400 mx-auto" /></td>
                    <td className="p-4 md:p-6 text-center"><Check className="w-5 h-5 text-teal-400 mx-auto" /></td>
                  </tr>
                  <tr className="hover:bg-slate-700/30 transition-colors">
                    <td className="p-4 md:p-6 text-sm text-slate-300">{t('WhatsApp Messaging')}</td>
                    <td className="p-4 md:p-6 text-center text-sm">{t('Single only')}</td>
                    <td className="p-4 md:p-6 text-center text-sm">{t('Single only')}</td>
                    <td className="p-4 md:p-6 text-center"><Check className="w-5 h-5 text-teal-400 mx-auto" /></td>
                    <td className="p-4 md:p-6 text-center"><Check className="w-5 h-5 text-teal-400 mx-auto" /></td>
                  </tr>
                  <tr className="hover:bg-slate-700/30 transition-colors">
                    <td className="p-4 md:p-6 text-sm text-slate-300">{t('My Business Profile (own branding)')}</td>
                    <td className="p-4 md:p-6 text-center text-sm text-slate-400">{t('Add-on')}</td>
                    <td className="p-4 md:p-6 text-center text-sm text-slate-400">{t('Add-on')}</td>
                    <td className="p-4 md:p-6 text-center text-sm text-slate-400">{t('Add-on')}</td>
                    <td className="p-4 md:p-6 text-center text-sm text-yellow-400 font-bold">✓ {t('Included')}</td>
                  </tr>

                  <tr className="hover:bg-slate-700/30 transition-colors">
                    <td className="p-4 md:p-6 text-sm text-slate-300 border-b-0">{t('Monthly credits')}</td>
                    <td className="p-4 md:p-6 text-center text-sm border-b-0">50</td>
                    <td className="p-4 md:p-6 text-center text-sm border-b-0">500</td>
                    <td className="p-4 md:p-6 text-center text-sm border-b-0">{t('Unlimited')}</td>
                    <td className="p-4 md:p-6 text-center text-sm border-b-0">{t('Unlimited')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-16 text-center">
            <a
              href="https://vfsoffice.vemurigroup.in/request-access.php"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-8 py-4 bg-yellow-500 text-slate-900 font-bold rounded-xl hover:bg-yellow-400 transition-colors"
            >
              {t('Try Free — Get Started on Basic')}
            </a>
            <p className="mt-4 text-slate-400 text-sm">{t('Instant account, no approval wait. Every new account gets 30 days of every feature unlocked, free.')}</p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-sm font-bold tracking-widest text-primary-600 uppercase mb-4">
              {t('Questions new users ask')}
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-4">{t("No jargon. Just what you'd actually want to know.")}</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <button
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-bold text-gray-900 pr-4">{t(faq.q)}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                        {t(faq.a)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="text-center py-12 bg-white border-t border-gray-100">
        <button
          onClick={onNavigateHome}
          className="text-primary-600 font-semibold hover:text-primary-700 underline"
        >
          &larr; {t('Back to Main Website')}
        </button>
      </div>
    </div>
  )
}
