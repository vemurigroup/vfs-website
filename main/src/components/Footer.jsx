import React from 'react'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer({ onViewChange }) {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tighter text-white">VEMURI</h2>
              <p className="text-sm font-medium text-gray-400">Financial Services</p>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Protecting today, growing for tomorrow. We offer a balanced, goal-based plan for every life stage to ensure your wealth creation and protection.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61589120577437" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/vemuri-financial-services-282a37376/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://www.instagram.com/vemurifinancialservices/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#E1306C] hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://api.whatsapp.com/send/?phone=919886291668&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#home" onClick={(e) => { e.preventDefault(); onViewChange?.('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-primary-400 transition-colors cursor-pointer">Home</a></li>
              <li><a href="#pillars" onClick={(e) => { e.preventDefault(); onViewChange?.('home'); setTimeout(() => { const el = document.querySelector('#pillars'); if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' }); }, 150); }} className="hover:text-primary-400 transition-colors cursor-pointer">Pillars</a></li>
              <li><a href="#solutions" onClick={(e) => { e.preventDefault(); onViewChange?.('home'); setTimeout(() => { const el = document.querySelector('#solutions'); if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' }); }, 150); }} className="hover:text-primary-400 transition-colors cursor-pointer">Solutions</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); onViewChange?.('home'); setTimeout(() => { const el = document.querySelector('#services'); if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' }); }, 150); }} className="hover:text-primary-400 transition-colors cursor-pointer">Services</a></li>
              <li><a href="#sip" onClick={(e) => { e.preventDefault(); onViewChange?.('home'); setTimeout(() => { const el = document.querySelector('#sip'); if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' }); }, 150); }} className="hover:text-primary-400 transition-colors cursor-pointer">Calculators</a></li>
              <li><a href="#testimonialsSec" onClick={(e) => { e.preventDefault(); onViewChange?.('home'); setTimeout(() => { const el = document.querySelector('#testimonialsSec'); if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' }); }, 150); }} className="hover:text-primary-400 transition-colors cursor-pointer">Testimonials</a></li>
              <li><a href="#faq" onClick={(e) => { e.preventDefault(); onViewChange?.('home'); setTimeout(() => { const el = document.querySelector('#faq'); if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' }); }, 150); }} className="hover:text-primary-400 transition-colors cursor-pointer">Frequently Asked Questions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Portals & Resources</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => { onViewChange?.('partner'); window.scrollTo(0,0); }}
                  className="hover:text-primary-400 transition-colors text-left"
                >
                  Partner Hub
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onViewChange?.('gst'); window.scrollTo(0,0); }}
                  className="hover:text-primary-400 transition-colors text-left"
                >
                  GST Helper
                </button>
              </li>
              <li><a href="https://vfsoffice.vemurigroup.in/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">Office Portal</a></li>
              <li>
                <button
                  onClick={() => { onViewChange?.('vfs-benefits'); window.scrollTo(0,0); }}
                  className="hover:text-primary-400 transition-colors text-left"
                >
                  VFS Office Benefits & Pricing
                </button>
              </li>
              <li><a href="https://vfs.vemurigroup.in/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">Client Login</a></li>
              <li><a href="#kyc" onClick={(e) => { e.preventDefault(); onViewChange?.('home'); setTimeout(() => { const el = document.querySelector('#kyc'); if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' }); }, 150); }} className="hover:text-primary-400 transition-colors cursor-pointer">KYC Services</a></li>
              <li><a href="#compliance" onClick={(e) => { e.preventDefault(); onViewChange?.('home'); setTimeout(() => { const el = document.querySelector('#compliance'); if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' }); }, 150); }} className="hover:text-primary-400 transition-colors cursor-pointer">Regulatory Disclosures</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="w-5 h-5 mr-3 text-primary-500 flex-shrink-0" />
                <a href="tel:+919886291668" className="hover:text-white transition-colors">Call Us</a>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-3 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                <a href="https://api.whatsapp.com/send/?phone=919886291668&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Chat on WhatsApp</a>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 mr-3 text-primary-500 flex-shrink-0" />
                <a href="mailto:vemurifin@gmail.com" className="hover:text-white transition-colors">Email Us</a>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-primary-500 flex-shrink-0" />
                <span>ITI Colony, Bengaluru</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Vemuri Financial Services. All rights reserved.</p>
          <p className="mt-4 md:mt-0 text-xs font-semibold text-gray-400">AMFI Registered Mutual Fund Distributor - ARN-302882</p>
        </div>
      </div>
    </footer>
  )
}