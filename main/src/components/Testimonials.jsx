import React from 'react'
import { motion } from 'framer-motion'
import { Quote, ExternalLink } from 'lucide-react'

export default function Testimonials() {
  const testimonialsData = [
    {
      text: "Its been over 5 years since I started my financial journey with Vemuri Financial Services and I couldnt be more satisfied Their expert guidance has helped me stay disciplined with my SIPs build a strong mutual fund portfolio and plan ahead for my familys future What I appreciate most is their personalized approach they always listen patiently and suggest what truly suits my goals not just whats trending Regular reviews and proactive communication have made me feel confident and stressfree about my investments A big thank you to the Vemuri team for being my trusted financial partner for the last 5 years M Swathi Bangalore Auditor of ITI PVT LTD",
      author: "Mamedipaka Swathi"
    },
    {
      text: "Its been 3 years since I started working with Vemuri Financial Services and the experience has been excellent Their guidance on mutual funds NPS and insurance has helped me build a solid financial foundation They explain everything in a simple way and regularly follow up to make sure my investments are on track I feel confident and secure about my future thanks to their support Mr Muralidhar N Bangalore Client Since 2021",
      author: "Muralidhar Nayani"
    },
    {
      text: "I have been associated with Vemuri Financial Services for the past 10 years and I can confidently say it has been one of the best financial decisions Ive made Right from mutual fund investments and NPS to insurance and retirement planning every recommendation has been well thoughtout and tailored to my goals Their consistent support regular reviews and honest advice have helped me grow my wealth while feeling completely secure I truly appreciate their professionalism and personal care in managing my financial journey over this decade Thank you for being a trusted partner in my life Mr Ramkumar Madanapalli Client Since 2015",
      author: "Ramkumar Devatha"
    },
    {
      text: "I have been associated with Vemuri Financial Services for over a decade now and the journey has been nothing short of exceptional From the very first day their approach has always been personal transparent and driven by my financial goals Whether it was planning for my childrens education taxsaving investments or retirement planning their advice has always been timely and spoton Their consistency market knowledge and ethical practices make them a trusted partner in my financial journey Im proud to say that with their guidance Ive not only grown my wealth but also gained confidence in managing my finances Thank you for being a reliable partner for the last 10 years A Himabindu Bangalore Entrepreneur LongTerm Client",
      author: "Achutha Himabindu"
    },
    {
      text: "Ive been associated with Vemuri Financial Services for the past 3 years and it has been a truly rewarding experience From guiding me on the right mutual funds to helping with taxefficient investments theyve always offered honest and practical advice Their team regularly checks in to review my goals and update strategies based on market changes The personalized service and clarity they provide make financial planning simple and stressfree I highly recommend Vemuri Financial Services to anyone looking for longterm financial peace of mind M SateeshKumar Vizianagaram Accountant",
      author: "Mamidipaka Sateeshkumar"
    }
  ]

  const googleReviewLink = "https://www.google.com/search?q=Vemuri+Financial+Services#lrd=0x3bae11887838ceed:0x41caa87cdeb641c,1,,,,"

  return (
    <section id="testimonialsSec" className="py-8 bg-primary-900 relative overflow-hidden text-white">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary-800/50 blur-[100px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary-800/50 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary-300">
            Testimonials
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white">
            What Clients Are <span className="text-primary-400">Saying</span>
          </h3>
        </div>

        <div className="flex overflow-hidden relative w-full pb-8">
          {/* Fading edges for seamless look */}
          <div className="absolute top-0 left-0 w-12 md:w-32 h-full bg-gradient-to-r from-primary-900 to-transparent z-10" />
          <div className="absolute top-0 right-0 w-12 md:w-32 h-full bg-gradient-to-l from-primary-900 to-transparent z-10" />
          
          <motion.div 
            className="flex gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 35, // Adjust for speed
              repeat: Infinity
            }}
            // Pause animation on hover
            whileHover={{ animationPlayState: "paused" }} 
          >
            {[...testimonialsData, ...testimonialsData].map((t, index) => (
              <div
                key={index}
                className="flex-none w-[320px] md:w-[400px] bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:bg-white/15 transition-colors relative"
              >
                <Quote className="absolute top-6 right-6 w-8 h-8 text-primary-400/30" />
                <div className="h-full flex flex-col justify-between space-y-6">
                  <p className="text-gray-200 text-sm leading-relaxed italic relative z-10">
                    "{t.text}"
                  </p>
                  <div className="border-t border-white/10 pt-4 mt-auto">
                    <p className="font-bold text-primary-300 text-sm">
                      — {t.author}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex justify-center"
        >
          <a
            href={googleReviewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-white text-primary-900 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl hover:shadow-2xl hover:-translate-y-0.5 duration-200"
          >
            Read more reviews on Google
            <ExternalLink className="ml-2 w-5 h-5" />
          </a>
        </motion.div>
        
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  )
}