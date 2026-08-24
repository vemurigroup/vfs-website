import React from 'react'
import { motion } from 'framer-motion'
import { FileEdit, CheckCircle, UploadCloud, Info, Phone } from 'lucide-react'

export default function KycServices() {
  const cards = [
    {
      id: "kyc-entry",
      title: "KYC Entry",
      icon: <FileEdit className="w-8 h-8 text-primary-500" />,
      description: "Submit your KYC details and upload the required documents.",
      actionText: "KYC Entry",
      actionUrl: "https://www.cvlkra.com/",
    },
    {
      id: "kyc-validation",
      title: "KYC Validation",
      icon: <CheckCircle className="w-8 h-8 text-green-500" />,
      description: "Verify your PAN and check whether your KYC is valid.",
      actionText: "Validate KYC",
      actionUrl: "https://validate.cvlindia.com/CVLKRAVerification_V1/",
    },
    {
      id: "do-kyc",
      title: "Do KYC",
      icon: <UploadCloud className="w-8 h-8 text-blue-500" />,
      description: "Complete your Online KYC for first-time investments.",
      actionText: "Do KYC",
      actionUrl: "https://www.dspim.com/invest/#goto=kyc",
    }
  ]

  return (
    <section id="kyc" className="py-8 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary-500">
            Getting Started
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900">
            KYC <span className="text-primary-500">Services</span>
          </h3>
          <p className="text-lg text-gray-600">
            Complete your KYC seamlessly before investing in Mutual Funds and other financial products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:border-primary-100 transition-all flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-primary-50 transition-colors">
                {card.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h4>
              <p className="text-gray-600 mb-8 flex-grow">{card.description}</p>
              
              <a 
                href={card.actionUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold text-white bg-primary-500 hover:bg-primary-600 rounded-full transition-colors"
              >
                {card.actionText}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-xl"
        >
          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1 space-y-6">
              <div className="flex items-center space-x-3 text-gray-900">
                <Info className="w-6 h-6 text-primary-500" />
                <h3 className="text-2xl font-bold">Why is KYC Important?</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Mandatory for investing in Mutual Funds.",
                  "Required as per SEBI regulations.",
                  "Protects against identity fraud.",
                  "Enables smooth purchases, SIPs and redemptions.",
                  "One-time process with easy updates whenever required.",
                  "Valid KYC helps avoid transaction rejections."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 text-orange-800 text-sm">
                <strong>Note:</strong> Investors without a valid KYC may not be able to invest or transact in Mutual Funds until their KYC is completed and verified.
              </div>
            </div>
            
            <div className="md:w-72 flex flex-col justify-center items-center text-center p-8 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <Phone className="w-8 h-8 text-primary-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Need help?</h4>
              <p className="text-gray-600 text-sm mb-4">
                Need help completing your KYC?
              </p>
              <a href="tel:+919886291668" className="text-2xl font-black text-primary-600 hover:text-primary-700 transition-colors">
                Call Us
              </a>
              <p className="text-xs text-gray-500 mt-4 font-semibold uppercase tracking-wider">
                Vemuri Financial Services
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
