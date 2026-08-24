import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowUpRight } from 'lucide-react'

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = {
      name: e.target.name.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
      goal: e.target.goal.value,
      message: e.target.message.value
    }

    fetch("https://script.google.com/macros/s/AKfycbywfr-RRwWlApZeBybKXynYytnKoEXWKYDrQQkLa16n8cgvTTJW8vi_mx9Ttc-gZwra/exec", {
      method: "POST",
      body: JSON.stringify(formData)
    })
    .then(res => res.text())
    .then(() => {
      alert("✅ Thank you! We will call you back soon.")
      e.target.reset()
      setIsSubmitting(false)
    })
    .catch(() => {
      alert("❌ Something went wrong. Try again later.")
      setIsSubmitting(false)
    })
  }

  return (
    <section id="contact" className="py-8 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary-500">
            Start Your Plan
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900">
            Let's build your <span className="text-primary-500">financial future.</span>
          </h3>
          <p className="text-lg text-gray-600">
            Share basic details and we'll tailor a plan to your specific goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold text-gray-700">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    required
                    placeholder="Your name" 
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-semibold text-gray-700">Phone</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    required
                    placeholder="+91-" 
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    placeholder="name@example.com" 
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="goal" className="text-sm font-semibold text-gray-700">Primary Goal</label>
                  <select 
                    id="goal" 
                    name="goal"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors appearance-none"
                  >
                    <option>Children's Education</option>
                    <option>Retirement Planning</option>
                    <option>Tax Saving</option>
                    <option>Wealth Creation</option>
                    <option>Insurance Planning</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold text-gray-700">Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  rows="4" 
                  placeholder="Tell us about your timeline, budget, and preferences..." 
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors resize-none"
                ></textarea>
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full md:w-auto px-8 py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-primary-500/30 flex items-center justify-center ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Sending...' : 'Request Call-Back'}
                  {!isSubmitting && <ArrowUpRight className="ml-2 w-5 h-5" />}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Info Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6 flex flex-col"
          >
            <div className="bg-primary-900 rounded-3xl p-8 shadow-xl text-white flex-grow">
              <h3 className="text-2xl font-bold mb-6">What you'll get</h3>
              <ul className="space-y-4">
                {[
                  'Personalized coverage & investment plan',
                  'SIP suggestions with top-up strategy',
                  'Tax-efficient allocation (incl. NPS)',
                  'Annual review & rebalancing roadmap'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-primary-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-200 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-6">
                <a 
                  href="#faq"
                  onClick={(e) => { e.preventDefault(); const el = document.querySelector('#faq'); if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' }); }}
                  className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white border border-white/20 hover:bg-white/10 rounded-xl transition-colors w-full cursor-pointer"
                >
                  View FAQs
                </a>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-xs text-gray-400 leading-relaxed">
                  <strong className="text-gray-300">SEBI:</strong> Mutual Fund investments are subject to market risks. <br/><br/>
                  <strong className="text-gray-300">IRDAI:</strong> Insurance is a subject matter of solicitation. Read all scheme documents and policy wordings carefully.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}