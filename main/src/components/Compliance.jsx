import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, ShieldCheck, Scale, Landmark, PiggyBank } from 'lucide-react'

export default function Compliance() {
  const disclosures = [
    {
      id: "amfi",
      title: "Mutual Fund Distribution",
      badge: "Mutual Funds — AMFI / SEBI",
      icon: <PiggyBank className="w-6 h-6 text-primary-500" />,
      content: (
        <>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Vemuri Financial Services is an <b>AMFI-registered Mutual Fund Distributor</b> (ARN-302882). We facilitate distribution only and do not provide investment advice or portfolio management services unless separately registered to do so.
          </p>
          <ul className="space-y-2 text-sm text-gray-500 mb-6">
            <li className="flex items-start">
              <span className="mr-2 text-primary-400">•</span>
              Mutual Fund investments are subject to market risks. Read all scheme related documents carefully.
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-primary-400">•</span>
              In accordance with AMFI guidelines, we disclose that we earn incidental/trail commission from Asset Management Companies for distributing their mutual funds.
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-primary-400">•</span>
              No assured or guaranteed returns are offered on any scheme, and past performance is not indicative of future results.
            </li>
          </ul>
          <p className="text-sm text-gray-700 mb-6">
            <b>Grievance escalation:</b> Contact our Grievance Officer first → AMFI investor helpline → SEBI SCORES if unresolved.
          </p>
        </>
      ),
      links: [
        { label: "AMFI", url: "https://www.amfiindia.com/" },
        { label: "SEBI SCORES", url: "https://scores.sebi.gov.in/" }
      ]
    },
    {
      id: "irdai",
      title: "Insurance Distribution",
      badge: "Insurance — IRDAI",
      icon: <ShieldCheck className="w-6 h-6 text-primary-500" />,
      content: (
        <>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Vemuri Financial Services is a registered Insurance Agent / Corporate Agent / POSP with IRDAI. <b>Insurance is the subject matter of solicitation.</b>
          </p>
          <ul className="space-y-2 text-sm text-gray-500 mb-6">
            <li className="flex items-start">
              <span className="mr-2 text-primary-400">•</span>
              For more details on risk factors, terms & conditions, read the product brochure before concluding a sale.
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-primary-400">•</span>
              IRDAI does not sell policies, invest premiums or announce bonuses — beware of fraudulent calls/offers.
            </li>
          </ul>
          <p className="text-sm text-gray-700 mb-6 mt-auto">
            <b>Grievance escalation:</b> Insurer's grievance cell → our Grievance Officer → IRDAI Bima Bharosa (Toll-free 155255 / 1800-4254-732).
          </p>
        </>
      ),
      links: [
        { label: "IRDAI Bima Bharosa", url: "https://bimabharosa.irdai.gov.in/" }
      ]
    },
    {
      id: "pfrda",
      title: "NPS Distribution",
      badge: "NPS — PFRDA",
      icon: <Scale className="w-6 h-6 text-primary-500" />,
      content: (
        <>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Vemuri Financial Services facilitates NPS onboarding as an authorised Point of Presence (POP) / subscriber-facilitation channel registered with PFRDA. NPS returns are market-linked and <b>not guaranteed</b> by PFRDA or the Government of India.
          </p>
          <ul className="space-y-2 text-sm text-gray-500 mb-6">
            <li className="flex items-start">
              <span className="mr-2 text-primary-400">•</span>
              Subscribers should read the NPS Offer Document and scheme information before investing.
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-primary-400">•</span>
              PFRDA does not collect any charges directly from subscribers for grievance redressal.
            </li>
          </ul>
          <p className="text-sm text-gray-700 mb-6 mt-auto">
            <b>Grievance escalation:</b> POP grievance officer → CRA (NSDL/KFintech/CAMS) → PFRDA Pension Sahayak Portal → NPS Trust Ombudsman (Toll-free: 1800 110 708).
          </p>
        </>
      ),
      links: [
        { label: "Pension Sahayak", url: "https://pensionsahayak.pfrda.org.in/" }
      ]
    },
    {
      id: "rbi",
      title: "Loan Referral Disclosure",
      badge: "Loans — RBI",
      icon: <Landmark className="w-6 h-6 text-primary-500" />,
      content: (
        <>
          <p className="text-gray-600 mb-4 leading-relaxed">
            For Loan Against Mutual Funds, Home Loan and Personal Loan services, Vemuri Financial Services acts <b>only as a referral partner / Direct Selling Agent (DSA)</b> for RBI-regulated Banks and NBFCs. We are <b>not a lender</b> and do not sanction, disburse or hold custody of loan funds.
          </p>
          <ul className="space-y-2 text-sm text-gray-500 mb-6">
            <li className="flex items-start">
              <span className="mr-2 text-primary-400">•</span>
              Please read the Key Fact Statement (KFS) and loan agreement carefully before signing, as per RBI's Fair Practices Code.
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-primary-400">•</span>
              We do not charge you anything for referring you to a lending partner.
            </li>
          </ul>
          <p className="text-sm text-gray-700 mb-6 mt-auto">
            <b>Grievance escalation:</b> Lender's Nodal/Grievance Officer → RBI Complaint Management System, CMS (Toll-free 14448), if unresolved after 30 days.
          </p>
        </>
      ),
      links: [
        { label: "RBI CMS Portal", url: "https://cms.rbi.org.in/" }
      ]
    }
  ]

  return (
    <section id="compliance" className="py-8 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary-500">
            Compliance
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900">
            Regulatory Disclosures &amp; <span className="text-primary-500">Grievance Redressal</span>
          </h3>
          <p className="text-lg text-gray-600">
            As mandated by AMFI, IRDAI, PFRDA and RBI for regulated financial distribution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {disclosures.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-xl transition-shadow flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide uppercase">
                  {item.badge}
                </span>
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center border border-gray-100">
                  {item.icon}
                </div>
              </div>
              
              <h4 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h4>
              
              <div className="flex-grow flex flex-col">
                {item.content}
              </div>

              <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200/60">
                {item.links.map((link, lIdx) => (
                  <a
                    key={lIdx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 text-sm font-semibold text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-full transition-colors"
                  >
                    🌐 {link.label}
                    <ExternalLink className="ml-2 w-4 h-4 opacity-70" />
                  </a>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-200">
          <p className="text-xs text-gray-500 leading-relaxed text-center">
            <b>Disclaimer:</b> Vemuri Financial Services does not guarantee returns on any investment, insurance or loan product; all products are offered by their respective regulated principals (AMCs, insurers, PFRDA-registered pension funds, banks & NBFCs) and are subject to their terms, conditions and regulatory guidelines.
          </p>
        </div>
        
      </div>
    </section>
  )
}