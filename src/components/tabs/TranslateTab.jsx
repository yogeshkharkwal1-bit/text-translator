// src/components/tabs/TranslateTab.jsx
import { useState } from 'react'
import { translateText } from '../../services/api'

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' }
]

export default function TranslateTab() {
  const [text, setText] = useState('')
  const [sourceLang, setSourceLang] = useState('auto')
  const [targetLang, setTargetLang] = useState('en')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleTranslate = async () => {
    if (!text.trim()) return
    setLoading(true)
    setError('')
    try {
      const data = await translateText(text, sourceLang, targetLang)
      setResult(data)
    } catch (err) {
      setError('Failed to translate. Please try again.')
    }
    setLoading(false)
  }

  const swapLanguages = () => {
    if (sourceLang === 'auto') return
    setSourceLang(targetLang)
    setTargetLang(sourceLang)
    if (result) {
      setText(result.translation)
      setResult(null)
    }
  }

  const copyToClipboard = () => {
    if (result?.translation) {
      navigator.clipboard.writeText(result.translation)
    }
  }

  return (
    <div className="glass rounded-3xl p-6 md:p-8">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-300">Source Text</label>
            <select
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm text-gray-300"
            >
              <option value="auto">Auto-detect</option>
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="input-field h-48"
            placeholder="Enter text to translate..."
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-gray-500">{text.length} characters</span>
            <button onClick={() => setText('')} className="text-xs text-gray-400 hover:text-white transition">Clear</button>
          </div>
          
          {/* Swap button */}
          <div className="flex justify-center my-4">
            <button
              onClick={swapLanguages}
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition"
              title="Swap languages"
            >
              ⇅
            </button>
          </div>
          
          {/* Target language */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">Translate to</label>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>
          
          <button 
            onClick={handleTranslate}
            disabled={loading || !text.trim()}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <span className="spinner" /> : '🌐 Translate'}
          </button>
        </div>
        
        {/* Output */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Translation Result</label>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 h-48 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <span className="spinner mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Translating...</p>
                </div>
              </div>
            ) : result ? (
              <p className="text-gray-300 text-sm leading-relaxed">{result.translation}</p>
            ) : (
              <p className="text-gray-600 text-sm">Translation will appear here...</p>
            )}
          </div>
          {result && (
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-500">
                {result.translatedLength} characters
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
