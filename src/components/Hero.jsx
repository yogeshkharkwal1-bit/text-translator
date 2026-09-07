// src/components/Hero.jsx
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background orbs */}
      <div className="orb orb-primary w-[600px] h-[600px] -top-48 -left-48" />
      <div className="orb orb-accent w-[500px] h-[500px] top-1/2 -right-48" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-sm mb-6"
        >
          <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
          Powered by Transformer Models
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold font-display mb-6 leading-tight"
        >
          Summarize, Translate &<br />
          <span className="gradient-text">Detect Fake Emails</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto"
        >
          Get concise summaries,  translations, and AI-powered email analysis in seconds. 
          Our AI understands context, not just words.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a href="#tool" className="btn-primary text-lg px-8 py-4">
            Try It Now
          </a>
          <a href="#features" className="btn-secondary text-lg px-8 py-4">
            ▶️ Learn More
          </a>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">👤</span>
            <span>5 Users</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <span>3 Rating</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌍</span>
            <span>10+ Languages</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛡️</span>
            <span>Transformer Powered</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
