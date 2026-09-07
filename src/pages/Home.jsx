import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import ToolSection from '../components/ToolSection'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#020617] text-white overflow-x-hidden"
    >
      {/* Background orbs */}
      <div className="orb orb-primary w-[500px] h-[500px] -top-48 -left-48 fixed" />
      <div className="orb orb-accent w-[400px] h-[400px] top-1/2 -right-48 fixed" />
      
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <ToolSection />
      <FAQ />
      <Footer />
    </motion.div>
  )
}
