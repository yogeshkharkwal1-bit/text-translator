// src/components/Navbar.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="SummarizeAI" className="w-10 h-10 rounded-xl" />
            <span className="text-xl font-bold gradient-text">SummarizeAI</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#how-it-works" className="hover:text-white transition">How it Works</a>
            <a href="#tool" className="hover:text-white transition">Tool</a>
            <a href="#faq" className="hover:text-white transition">FAQ</a>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button className="btn-secondary text-sm">Explore Now</button>
            <button className="btn-primary text-sm">Get Started</button>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden py-4 border-t border-white/10"
          >
            <div className="flex flex-col gap-4 text-sm text-gray-300">
              <a href="#features" className="hover:text-white transition">Features</a>
              <a href="#how-it-works" className="hover:text-white transition">How it Works</a>
              <a href="#tool" className="hover:text-white transition">Tool</a>
              <a href="#faq" className="hover:text-white transition">FAQ</a>
              <div className="flex gap-3 pt-4">
                <button className="btn-secondary text-sm flex-1">Sign In</button>
                <button className="btn-primary text-sm flex-1">Get Started</button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
