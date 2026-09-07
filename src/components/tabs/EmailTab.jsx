// src/components/tabs/EmailTab.jsx
import { useState } from 'react'
import { summarizeEmail } from '../../services/api'

export default function EmailTab() {
  const [email, setEmail] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSummarize = async () => {
    if (!email.trim()) return
    setLoading(true)
    setError('')
    try {
      const data = await summarizeEmail(email)
      setResult(data)
    } catch (err) {
      setError('Failed to analyze email. Please try again.')
    }
    setLoading(false)
  }

  const sampleEmail = `From: john.smith@company.com
To: team@company.com
Subject: Q4 Project Update & Action Required

Hi Team,

I hope this email finds you well. I wanted to provide a quick update on our Q4 project status.

We have successfully completed the following milestones:
- Frontend redesign (100% complete)
- API integration (85% complete)
- Testing phase (60% complete)

However, we need to address some critical issues:
1. The payment gateway integration is delayed by 2 weeks
2. We need additional resources for the testing team
3. Client feedback session is scheduled for next Monday

Action items:
- Please review the attached project timeline
- Submit your individual status reports by Friday
- Confirm your availability for Monday's meeting

Let me know if you have any questions.

Best regards,
John Smith
Project Manager`

  return (
    <div className="glass rounded-3xl p-6 md:p-8">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-300">Email Content</label>
            <button 
              onClick={() => setEmail(sampleEmail)}
              className="text-xs text-primary-400 hover:text-primary-300 transition"
            >
              Load Sample
            </button>
          </div>
          <textarea
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field h-64 font-mono text-xs"
            placeholder="Paste email content here..."
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-gray-500">{email.length} characters</span>
            <button onClick={() => setEmail('')} className="text-xs text-gray-400 hover:text-white transition">Clear</button>
          </div>
          
          <button 
            onClick={handleSummarize}
            disabled={loading || !email.trim()}
            className="btn-primary w-full mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <span className="spinner" /> : '📧 Analyze Email'}
          </button>
        </div>
        
        {/* Output */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Analysis Result</label>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 h-64 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <span className="spinner mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Analyzing email...</p>
                </div>
              </div>
            ) : result ? (
              <div className="space-y-4">
                {/* Priority badge */}
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    result.priority === 'High' ? 'bg-red-500/20 text-red-300' :
                    result.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-green-500/20 text-green-300'
                  }`}>
                    {result.priority} Priority
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    result.sentiment === 'Positive' ? 'bg-green-500/20 text-green-300' :
                    result.sentiment === 'Negative' ? 'bg-red-500/20 text-red-300' :
                    'bg-gray-500/20 text-gray-300'
                  }`}>
                    {result.sentiment}
                  </span>
                </div>

                {/* Summary */}
                <div>
                  <h4 className="text-xs font-medium text-gray-400 mb-1">Summary</h4>
                  <p className="text-sm text-gray-300">{result.summary}</p>
                </div>

                {/* Action Items */}
                {result.actionItems.length > 0 && (
                  <div>
                    <h4 className="text-xs font-medium text-gray-400 mb-1">Action Items</h4>
                    <ul className="text-xs text-gray-300 space-y-1">
                      {result.actionItems.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary-400">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Key Points */}
                {result.keyPoints.length > 0 && (
                  <div>
                    <h4 className="text-xs font-medium text-gray-400 mb-1">Key Points</h4>
                    <ul className="text-xs text-gray-300 space-y-1">
                      {result.keyPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-accent-400">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-600 text-sm">Email analysis will appear here...</p>
            )}
          </div>
          {result && (
            <button onClick={() => setResult(null)} className="text-xs text-gray-400 hover:text-white transition mt-2">
              🔄 Reset
            </button>
          )}
          {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
        </div>
      </div>
    </div>
  )
}
