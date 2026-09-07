// src/components/tabs/SummarizeTab.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { summarizeText } from '../../services/api'

export default function SummarizeTab() {
  const [text, setText] = useState('')
  const [length, setLength] = useState('medium')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSummarize = async () => {
    if (!text.trim()) return
    setLoading(true)
    setError('')
    try {
      const data = await summarizeText(text, length)
      setResult(data)
    } catch (err) {
      setError('Failed to summarize. Please try again.')
    }
    setLoading(false)
  }

  const copyToClipboard = () => {
    if (result?.summary) {
      navigator.clipboard.writeText(result.summary)
    }
  }

  return (
    <div className="glass rounded-3xl p-6 md:p-8">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Input Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="input-field h-48"
            placeholder="Paste your text or email here..."
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-gray-500">{text.length} characters • {text.split(' ').filter(w => w).length} words</span>
            <button onClick={() => setText('')} className="text-xs text-gray-400 hover:text-white transition">Clear</button>
          </div>
          
          {/* Options */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">Summary Length</label>
            <div className="flex gap-2">
              {['short', 'medium', 'detailed'].map(l => (
                <button
                  key={l}
                  onClick={() => setLength(l)}
                  className={`px-4 py-2 rounded-lg text-sm border transition ${
                    length === l 
                      ? 'bg-primary-500/20 text-primary-300 border-primary-500/30' 
                      : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {l.charAt(0).toUpperCase() + l.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <button 
            onClick={handleSummarize}
            disabled={loading || !text.trim()}
            className="btn-primary w-full mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <span className="spinner" /> : '✨ Generate Summary'}
          </button>
        </div>
        
        {/* Output */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Summary Result</label>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 h-48 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <span className="spinner mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">AI is processing...</p>
                </div>
              </div>
            ) : result ? (
              <p className="text-gray-300 text-sm leading-relaxed">{result.summary}</p>
            ) : (
              <p className="text-gray-600 text-sm">Summary will appear here...</p>
            )}
          </div>
          {result && (
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-500">
                {result.summaryLength} characters • {result.reduction}% reduction
              </span>
              <div className="flex gap-2">
                <button onClick={copyToClipboard} className="text-xs text-primary-400 hover:text-primary-300 transition">📋 Copy</button>
                <button onClick={() => setResult(null)} className="text-xs text-gray-400 hover:text-white transition">🔄 Reset</button>
              </div>
            </div>
          )}
          {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
        </div>
      </div>
    </div>
  )
}
