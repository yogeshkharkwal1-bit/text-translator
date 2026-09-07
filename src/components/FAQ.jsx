// src/components/FAQ.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'

const faqs = [
  { q: 'How accurate is the summarization?', a: 'Our AI uses state-of-the-art transformer models to provide highly accurate summaries that preserve key points.' },
  { q: 'What languages are supported for translation?', a: 'We support 50+ languages including English, Spanish, French, German, Japanese, Korean, Arabic, Hindi, and more.' },
  { q: 'How does the fake email detector work?', a: 'Our ML model analyzes email headers, content, links, and language patterns to detect phishing, spam, and suspicious emails.' },
  { q: 'Is there a limit on text length?', a: 'You can process up to 10,000 characters at a time. For longer documents, we recommend splitting them into sections.' },
  { q: 'Is my data secure?', a: 'Yes! We do not store your text or emails. All processing is done in real-time and your data is never saved on our servers.' }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id="faq" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
        </motion.div>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition"
              >
                <span className="font-medium">{faq.q}</span>
                <span className={`text-gray-500 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {openIndex === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="px-6 pb-4"
                >
                  <p className="text-gray-400 text-sm">{faq.a}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
