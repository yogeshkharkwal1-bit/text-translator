// src/components/ToolSection.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import SummarizeTab from './tabs/SummarizeTab'
import TranslateTab from './tabs/TranslateTab'
import EmailTab from './tabs/EmailTab'
import FakeDetectTab from './tabs/FakeDetectTab'

const tabs = [
  { id: 'summarize', label: '📝 Summarizer', component: SummarizeTab },
  { id: 'translate', label: '🌐 Translator', component: TranslateTab },
  { id: 'email', label: '📧 Email Summary', component: EmailTab },
  { id: 'detect', label: '🛡️ Fake Detect', component: FakeDetectTab }
]

export default function ToolSection() {
  const [activeTab, setActiveTab] = useState('summarize')
  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component

  return (
    <section id="tool" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Try Our <span className="gradient-text">App Tools</span>
          </h2>
          <p className="text-gray-400">Choose a tool and get  results within 5second</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-medium transition ${
                activeTab === tab.id ? 'tab-active' : 'tab-inactive'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {ActiveComponent && <ActiveComponent />}
        </motion.div>
      </div>
    </section>
  )
}
