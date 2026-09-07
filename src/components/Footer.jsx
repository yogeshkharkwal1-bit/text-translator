// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm">
                S
              </div>
              <span className="font-bold gradient-text">TextSummarizer</span>
            </div>
            <p className="text-sm text-gray-500">AI-powered text summarizer, translator, and email analyzer.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Product</h4>
            <ul className="text-sm text-gray-500 space-y-2">
              <li><a href="#features" className="hover:text-white transition">Features</a></li>
              <li><a href="#tool" className="hover:text-white transition">Tool</a></li>
              <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
            </ul>
          </div>
           
          <div>
            <h4 className="font-semibold mb-3 text-sm">Legal</h4>
            <ul className="text-sm text-gray-500 space-y-2">
              <li><a href="#" className="hover:text-white transition">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 text-center text-sm text-gray-600">
          <p>© 2026 Made by Yogesh Singh Kharkwal</p>
        </div>
      </div>
    </footer>
  )
}
