import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Copy, Check, Users } from 'lucide-react'
import partnerData from '../data/partnerData.json'

export default function PartnerHub({ onNavigateHome }) {
  React.useEffect(() => {
    const originalTitle = document.title
    document.title = "VFS Partner Hub"
    return () => {
      document.title = originalTitle
    }
  }, [])

  const [showRM, setShowRM] = useState(false)
  const [copiedId, setCopiedId] = useState(null)
  const [editedTemplates, setEditedTemplates] = useState({})

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleTemplateChange = (id, value) => {
    setEditedTemplates(prev => ({ ...prev, [id]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 md:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-gray-200 pb-8">
          <div>
            <button 
              onClick={onNavigateHome}
              className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-primary-600 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Main Website
            </button>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Partner <span className="text-primary-500">Hub</span>
            </h1>
            <p className="text-lg text-gray-600 mt-3 max-w-2xl">
              Access partner dashboards, distributor portals, and relationship-manager details for all your financial services.
            </p>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={() => setShowRM(!showRM)}
              className={`inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-all shadow-sm ${
                showRM 
                ? 'bg-primary-50 text-primary-700 border border-primary-200' 
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Users className="w-5 h-5 mr-2" />
              {showRM ? 'Hide RM Details' : 'Show RM Details'}
            </button>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-16">
          {partnerData.map((section) => {
            // Handle AMC grid differently if needed, but the structure handles it mostly well
            const isTemplate = section.id === 'templates'
            const isAMC = section.id === 'amcs'

            return (
              <motion.section 
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="scroll-mt-32"
                id={section.id}
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    {section.title}
                  </h2>
                  {section.tag && (
                    <p className="text-sm font-medium text-primary-600 mt-2 uppercase tracking-wide">
                      {section.tag}
                    </p>
                  )}
                </div>

                <div className={`grid gap-6 ${isAMC ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : isTemplate ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                  {section.cards.map((card, cIdx) => (
                    <div 
                      key={`${section.id}-${cIdx}`} 
                      className={`bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col relative overflow-hidden ${isTemplate ? '' : 'group'}`}
                    >
                      {/* Decorative gradient for normal cards */}
                      {!isTemplate && (
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full blur-[50px] -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}

                      <h3 className="text-xl font-bold text-gray-900 mb-4 relative z-10">{card.title}</h3>
                      
                      {/* RM Details */}
                      {card.meta && card.meta.length > 0 && (
                        <div className={`space-y-2 mb-6 relative z-10 ${!showRM && card.meta[0].includes('RM Name') ? 'hidden' : 'block'}`}>
                          {card.meta.map((metaStr, mIdx) => {
                            const [key, ...valParts] = metaStr.split(':')
                            const val = valParts.join(':')
                            if(!val) return <p key={mIdx} className="text-sm text-gray-600">{metaStr}</p>
                            return (
                              <p key={mIdx} className="text-sm">
                                <span className="font-semibold text-gray-700">{key}:</span> 
                                <span className="text-gray-600">{val}</span>
                              </p>
                            )
                          })}
                        </div>
                      )}

                      {/* Templates */}
                      {isTemplate && card.template && (
                        <div className="mb-6 flex-grow flex flex-col">
                          <textarea 
                            value={editedTemplates[`${section.id}-${cIdx}`] !== undefined ? editedTemplates[`${section.id}-${cIdx}`] : card.template}
                            onChange={(e) => handleTemplateChange(`${section.id}-${cIdx}`, e.target.value)}
                            className="w-full flex-grow min-h-[250px] p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-700 font-mono resize-none focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                          />
                          <div className="flex justify-end mt-4">
                            <button
                              onClick={() => handleCopy(editedTemplates[`${section.id}-${cIdx}`] !== undefined ? editedTemplates[`${section.id}-${cIdx}`] : card.template, `${section.id}-${cIdx}`)}
                              className="inline-flex items-center px-4 py-2 bg-primary-50 hover:bg-primary-100 text-primary-700 rounded-full text-sm font-semibold transition-colors"
                            >
                              {copiedId === `${section.id}-${cIdx}` ? (
                                <><Check className="w-4 h-4 mr-2" /> Copied</>
                              ) : (
                                <><Copy className="w-4 h-4 mr-2" /> Copy Message</>
                              )}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Links */}
                      {card.links && card.links.length > 0 && (
                        <div className="mt-auto flex flex-wrap gap-2 relative z-10 pt-4">
                          {card.links.map((link, lIdx) => (
                            <a
                              key={lIdx}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-4 py-2 text-sm font-semibold text-primary-600 bg-white border border-gray-200 hover:border-primary-200 hover:bg-primary-50 rounded-full transition-all"
                            >
                              {link.label}
                              <ExternalLink className="ml-1.5 w-3.5 h-3.5 opacity-70" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.section>
            )
          })}
        </div>

      </div>
    </div>
  )
}
