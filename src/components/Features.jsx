// src/components/Features.jsx
import { motion } from 'framer-motion'

const features = [
  {
    icon: '📝',
    title: 'Smart Summarizer',
    description: 'Get concise summaries of any text or email. Choose from Short, Medium, or Detailed lengths.',
    points: ['3 summary lengths', 'Context-aware AI', 'Preserves key points']
  },
  {
    icon: '🌐',
    title: 'Instant Translator',
    description: 'Translate text between 10+ languages with auto-detection and one-click swap.',
    points: ['10+ languages', 'Auto-detect source', 'One-click swap']
  },
  {
    icon: '📧',
    title: 'Email Summarizer',
    description: 'Analyze emails to extract summaries, action items, key points, and priority levels.',
    points: ['Action item extraction', 'Priority detection', 'Sentiment analysis']
  },
  {
    icon: '🛡️',
    title: 'Fake Email Detector',
    description: 'ML-powered detection of phishing emails, spam, and suspicious content.',
    points: ['Phishing detection', 'Link analysis', 'Risk scoring']
  }
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Powerful <span className="gradient-text">AI Tools</span>
          </h2>
          <p className="text-gray-400">Everything you need to process text efficiently</p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center text-2xl mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{feature.description}</p>
              <ul className="text-xs text-gray-500 space-y-1">
                {feature.points.map((point, j) => (
                  <li key={j}>✓ {point}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
