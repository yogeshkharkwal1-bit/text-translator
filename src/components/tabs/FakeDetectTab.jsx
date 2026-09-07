// src/components/tabs/FakeDetectTab.jsx
import { useState } from 'react'
import { detectFakeEmail } from '../../services/api'

export default function FakeDetectTab() {
  const [email, setEmail] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleDetect = async () => {
    if (!email.trim()) return
    setLoading(true)
    setError('')
    try {
      const data = await detectFakeEmail(email)
      setResult(data)
    } catch (err) {
      setError('Failed to analyze email. Please try again.')
    }
    setLoading(false)
  }

  const realEmail = `From: support@amazon.com
To: customer@email.com
Subject: Your Order #123-456-789 Has Shipped

Hello,

Thank you for shopping with us! Your order has been shipped and is on its way.

Order Details:
- Item: Wireless Bluetooth Headphones
- Order Date: March 15, 2024
- Tracking Number: 1Z999AA10123456784

You can track your package at: https://www.amazon.com/orders

If you have any questions, please contact our customer service.

Best regards,
Amazon Customer Service`

  const fakeEmail = `From: security@paypa1.com
To: user@email.com
Subject: URGENT: Your Account Has Been Limited - Act Now!

Dear Valued Customer,

We have detected unusual activity on your account. Your account has been temporarily limited and will be suspended within 24 hours if you do not verify your identity immediately.

Click here to verify your account now: http://192.168.1.100/verify

Please confirm your:
- Full name
- Date of birth
- Social Security Number
- Credit card details
- Bank account information

Failure to act immediately will result in permanent account closure and legal action.

This is urgent! Act now! Limited time!

PayPal Security Team`

  return (
    <div className="glass rounded-3xl p-6 md:p-8">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-300">Email to Analyze</label>
            <div className="flex gap-2">
              <button 
                onClick={() => setEmail(realEmail)}
                className="text-xs text-green-400 hover:text-green-300 transition"
              >
                Load Real
              </button>
              <button 
                onClick={() => setEmail(fakeEmail)}
                className="text-xs text-red-400 hover:text-red-300 transition"
              >
                Load Fake
              </button>
            </div>
          </div>
          <textarea
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field h-64 font-mono text-xs"
            placeholder="Paste email content here to check if it's real or fake..."
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-gray-500">{email.length} characters</span>
            <button onClick={() => setEmail('')} className="text-xs text-gray-400 hover:text-white transition">Clear</button>
          </div>
          
          <button 
            onClick={handleDetect}
            disabled={loading || !email.trim()}
            className="btn-primary w-full mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <span className="spinner" /> : '🛡️ Analyze Email'}
          </button>
        </div>
        
        {/* Output */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Detection Result</label>
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
                {/* Verdict */}
                <div className="text-center py-4">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                    result.verdict === 'real' ? 'bg-green-500/20 text-green-300' :
                    result.verdict === 'fake' ? 'bg-red-500/20 text-red-300' :
                    'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {result.verdict === 'real' && '✅ REAL EMAIL'}
                    {result.verdict === 'fake' && '🚨 FAKE EMAIL DETECTED'}
                    {result.verdict === 'suspicious' && '⚠️ SUSPICIOUS'}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Confidence: {result.confidence}%
                  </p>
                </div>

                {/* Risk Score */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">Risk Score</span>
                    <span className="text-xs text-gray-400">{result.riskScore}/100</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        result.riskScore >= 70 ? 'bg-red-500' :
                        result.riskScore >= 40 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${result.riskScore}%` }}
                    />
                  </div>
                </div>

                {/* Indicators */}
                {result.indicators.length > 0 && (
                  <div>
                    <h4 className="text-xs font-medium text-gray-400 mb-2">Indicators Found</h4>
                    <div className="space-y-2">
                      {result.indicators.map((indicator, i) => (
                        <div key={i} className={`flex items-start gap-2 text-xs p-2 rounded-lg ${
                          indicator.type === 'danger' ? 'bg-red-500/10 text-red-300' :
                          indicator.type === 'warning' ? 'bg-yellow-500/10 text-yellow-300' :
                          'bg-blue-500/10 text-blue-300'
                        }`}>
                          <span>
                            {indicator.type === 'danger' && '🚨'}
                            {indicator.type === 'warning' && '⚠️'}
                            {indicator.type === 'info' && 'ℹ️'}
                          </span>
                          <span>{indicator.message}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-600 text-sm">Detection result will appear here...</p>
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
