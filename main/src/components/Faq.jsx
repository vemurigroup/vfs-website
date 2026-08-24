import React from 'react'
import { motion } from 'framer-motion'

export default function Faq() {
  const faqs = [
    {
      question: "Why start with protection first?",
      answer: "Insurance prevents a single event from derailing your goals. After a safety net is in place, you can invest aggressively for growth."
    },
    {
      question: "How much term cover do I need?",
      answer: "A practical range is 10–15× annual income or a human-life-value method that covers liabilities + future goals."
    },
    {
      question: "Are mutual fund returns guaranteed?",
      answer: "No. They are market-linked. Use asset allocation and a long horizon to reduce risk, and review annually."
    },
    {
      question: "Is NPS better than mutual funds?",
      answer: "They serve different purposes. NPS shines for tax + retirement discipline; MFs give more flexibility and liquidity."
    }
  ]

  return (
    <section id="faq" className="py-8 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary-500">
            FAQs
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900">
            Frequently Asked <span className="text-primary-500">Questions</span>
          </h3>
          <p className="text-lg text-gray-600">
            Short answers to common doubts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 rounded-3xl p-8 hover:shadow-lg transition-shadow border border-gray-100"
            >
              <h4 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h4>
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  )
}
