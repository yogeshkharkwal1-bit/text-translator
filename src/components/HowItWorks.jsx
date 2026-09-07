// src/components/HowItWorks.jsx
import { motion } from 'framer-motion'

const steps = [
  { num: '1', title: 'Paste Your Text', desc: 'Copy and paste any text, email, or document you want to process.' },
  { num: '2', title: 'Choose Options', desc: 'Select summary length, target language, or analysis type.' },
  { num: '3', title: 'Get Results', desc: 'Receive instant, high-quality results. Copy with one click.' }
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Simple <span className="gradient-text">3-Step</span> Process
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card text-center"
            >
              <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center text-xl font-bold text-primary-400 mx-auto mb-4">
                {step.num}
              </div>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
