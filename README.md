# 🚀 SummarizeAI - Free AI Text Summarizer, Translator & Email Analyzer

**Live Demo:** https://summarizeai.vercel.app

![SummarizeAI](public/logo.svg)

A premium, AI-powered web application that provides text summarization, language translation, email analysis, and fake email detection — all for free with no API keys required.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [How It Works](#-how-it-works)
- [Deployment](#-deployment)
- [SEO Optimization](#-seo-optimization)
- [Security](#-security)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## ✨ Features

### 1. 📝 Smart Summarizer
- **AI-powered text summarization** using extractive NLP algorithms
- **3 summary lengths:** Short, Medium, Detailed
- **Preserves key points** from original text
- **Shows reduction percentage** (e.g., 31% smaller)
- **Copy to clipboard** functionality
- **Word & character count**

### 2. 🌐 Instant Translator
- **50+ languages** supported
- **Auto-detect source language** (Hindi, Arabic, Chinese, Japanese, Korean, Russian, etc.)
- **One-click language swap**
- **Powered by MyMemory Free API**
- **No API key required**

### 3. 📧 Email Analyzer
- **Extracts subject & sender** from email headers
- **Generates concise summary** of email body
- **Identifies action items** automatically
- **Detects priority level** (High/Medium/Low)
- **Analyzes sentiment** (Positive/Negative/Neutral)
- **Extracts key points**

### 4. 🛡️ Fake Email Detector
- **ML-powered phishing detection**
- **Header analysis** (suspicious domains, lookalike detection)
- **Content analysis** (urgency language, sensitive info requests)
- **Link analysis** (IP-based URLs, HTTP links, URL shorteners)
- **Language pattern analysis** (phishing phrases, brand spoofing, threats)
- **Risk score** (0-100) with confidence percentage
- **Detailed indicators** with danger levels

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | ^18.2.0 | UI library for building components |
| **Vite** | ^5.0.0 | Build tool & dev server (fast HMR) |
| **Tailwind CSS** | ^3.3.0 | Utility-first CSS framework |
| **Framer Motion** | ^10.16.0 | Animation library for smooth transitions |
| **React Router DOM** | ^6.20.0 | Client-side routing |
| **Axios** | ^1.6.0 | HTTP client for API calls |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | JavaScript runtime |
| **Express** | ^4.18.2 | Web framework for REST API |
| **CORS** | ^2.8.5 | Cross-origin resource sharing |
| **Dotenv** | ^16.3.1 | Environment variable management |

### AI / NLP (No API Keys!)

| Technology | Purpose |
|------------|---------|
| **Extractive Summarization** | Custom algorithm using word frequency scoring |
| **MyMemory API** | Free translation API (1000 requests/day) |
| **Custom ML Heuristics** | Fake email detection using pattern matching |

### DevOps & Tools

| Tool | Purpose |
|------|---------|
| **Git** | Version control |
| **GitHub** | Code repository |
| **Vercel** | Frontend hosting (free) |
| **Railway/Render** | Backend hosting (free) |
| **NPM** | Package management |

---

## 📁 Project Structure

```
summarize-ai/
├── 📂 public/                    # Static assets
│   ├── 📄 logo.svg               # App logo (SVG)
│   ├── 📄 sitemap.xml            # SEO sitemap
│   ├── 📄 robots.txt             # SEO crawler instructions
│   └── 📄 logo-preview.html      # Logo preview page
│
├── 📂 src/                       # Frontend source code
│   ├── 📄 main.jsx               # React entry point
│   ├── 📄 App.jsx                # Main App component
│   ├── 📄 index.css              # Global styles (Tailwind)
│   │
│   ├── 📂 components/            # Reusable UI components
│   │   ├── 📄 Navbar.jsx         # Navigation bar
│   │   ├── 📄 Hero.jsx           # Hero section
│   │   ├── 📄 Features.jsx       # Features section
│   │   ├── 📄 HowItWorks.jsx     # How it works section
│   │   ├── 📄 ToolSection.jsx    # Main tool container
│   │   ├── 📄 FAQ.jsx            # FAQ accordion
│   │   ├── 📄 Footer.jsx         # Footer
│   │   │
│   │   └── 📂 tabs/              # Tool tab components
│   │       ├── 📄 SummarizeTab.jsx
│   │       ├── 📄 TranslateTab.jsx
│   │       ├── 📄 EmailTab.jsx
│   │       └── 📄 FakeDetectTab.jsx
│   │
│   ├── 📂 pages/                 # Page components
│   │   └── 📄 Home.jsx           # Home page
│   │
│   ├── 📂 services/              # API service layer
│   │   └── 📄 api.js             # Axios API calls
│   │
│   └── 📂 hooks/                 # Custom React hooks (future)
│
├── 📂 server/                    # Backend source code
│   ├── 📄 index.js               # Express server entry
│   ├── 📄 package.json           # Backend dependencies
│   │
│   ├── 📂 routes/                # API route handlers
│   │   ├── 📄 summarize.js       # POST /api/summarize
│   │   ├── 📄 translate.js       # POST /api/translate
│   │   └── 📄 email.js           # POST /api/email/*
│   │
│   └── 📂 services/              # Business logic
│       ├── 📄 summarizeService.js    # Summarization algorithm
│       ├── 📄 translateService.js    # Translation service
│       ├── 📄 emailService.js        # Email analysis
│       └── 📄 fakeEmailService.js    # Fake email detection
│
├── 📄 index.html                 # HTML entry (with SEO)
├── 📄 package.json               # Frontend dependencies
├── 📄 vite.config.js             # Vite configuration
├── 📄 tailwind.config.js         # Tailwind configuration
├── 📄 postcss.config.js          # PostCSS configuration
├── 📄 vercel.json                # Vercel deployment config
├── 📄 .gitignore                 # Git ignore rules
└── 📄 README.md                  # This file
```

---

## 💻 Installation

### Prerequisites
- Node.js 18+ installed
- Git installed
- Code editor (VS Code recommended)

### Step 1: Clone the repository
```bash
git clone https://github.com/yogeshkharkwal1-bit/text-translator.git
cd text-translator
```

### Step 2: Install frontend dependencies
```bash
npm install
```

### Step 3: Install backend dependencies
```bash
cd server
npm install
cd ..
```

### Step 4: Run development servers

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd server
node index.js
```

### Step 5: Open browser
```
http://localhost:5173
```

---

## 🎮 Usage

### Summarizer
1. Paste any text or email content
2. Select summary length (Short/Medium/Detailed)
3. Click "Generate Summary"
4. Copy result with one click

### Translator
1. Enter text to translate
2. Select source language (or Auto-detect)
3. Select target language
4. Click "Translate"
5. Swap languages with one click

### Email Analyzer
1. Paste full email content (with headers)
2. Click "Analyze Email"
3. View summary, action items, priority, and sentiment

### Fake Email Detector
1. Paste email to check
2. Click "Analyze Email"
3. View verdict (Real/Suspicious/Fake)
4. Check risk score and indicators

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:3001/api
```

### 1. Summarize Text
```
POST /api/summarize
Content-Type: application/json

{
  "text": "Your long text here...",
  "length": "short" | "medium" | "detailed"
}
```

**Response:**
```json
{
  "summary": "Summarized text...",
  "originalLength": 277,
  "summaryLength": 190,
  "reduction": 31
}
```

### 2. Translate Text
```
POST /api/translate
Content-Type: application/json

{
  "text": "Hello world",
  "sourceLang": "auto",
  "targetLang": "es"
}
```

**Response:**
```json
{
  "translation": "Hola mundo",
  "sourceLang": "en",
  "targetLang": "es",
  "originalLength": 11,
  "translatedLength": 10
}
```

### 3. Summarize Email
```
POST /api/email/summarize
Content-Type: application/json

{
  "email": "From: sender@email.com\nTo: receiver@email.com\nSubject: Subject\n\nEmail body..."
}
```

**Response:**
```json
{
  "subject": "Subject",
  "from": "sender@email.com",
  "summary": "Email summary...",
  "actionItems": ["Action 1", "Action 2"],
  "keyPoints": ["Point 1", "Point 2"],
  "priority": "Medium",
  "sentiment": "Neutral",
  "wordCount": 687
}
```

### 4. Detect Fake Email
```
POST /api/email/detect
Content-Type: application/json

{
  "email": "From: sender@email.com\n\nSuspicious content..."
}
```

**Response:**
```json
{
  "verdict": "fake",
  "confidence": 85,
  "riskScore": 75,
  "indicators": [
    {"type": "danger", "message": "Requests for sensitive information detected"},
    {"type": "warning", "message": "IP address based URLs detected"}
  ],
  "details": { ... }
}
```

---

## 🧠 How It Works

### Summarization Algorithm
1. **Split text into sentences** using regex
2. **Calculate word frequency** (excluding stop words)
3. **Score each sentence** based on word importance
4. **Boost first and last sentences** (usually most important)
5. **Select top N sentences** based on summary length
6. **Restore original order** for coherence

### Translation
1. **Detect source language** using Unicode character ranges
2. **Call MyMemory API** (free, no key needed)
3. **Return translated text**

### Fake Email Detection
1. **Parse email headers** (From, Subject, Reply-To)
2. **Analyze sender domain** (lookalike detection, suspicious TLDs)
3. **Check content for phishing patterns** (urgency, threats, requests)
4. **Analyze links** (IP-based, HTTP, shorteners)
5. **Calculate risk score** (0-100)
6. **Return verdict** with confidence

---

## 🚀 Deployment

### Frontend (Vercel - Free)

1. Go to [vercel.com](https://vercel.com)
2. Click **Import Git Repository**
3. Select `yogeshkharkwal1-bit/text-translator`
4. **Framework Preset:** Vite
5. **Build Command:** `npm run build`
6. **Output Directory:** `dist`
7. Click **Deploy**

### Backend (Railway - Free)

1. Go to [railway.app](https://railway.app)
2. **New Project** → **Deploy from GitHub repo**
3. Select repository
4. **Root Directory:** `server`
5. **Start Command:** `node index.js`
6. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `PORT` = `3001`
7. Click **Deploy**

### Alternative Backend (Render - Free)

1. Go to [render.com](https://render.com)
2. **New Web Service**
3. **Build Command:** `cd server && npm install`
4. **Start Command:** `cd server && node index.js`
5. Free tier available!

---

## 🔍 SEO Optimization

### ✅ Implemented:
- [x] Semantic HTML5 structure
- [x] Meta title & description
- [x] Open Graph tags (Facebook, LinkedIn)
- [x] Twitter Card tags
- [x] JSON-LD structured data (Schema.org)
- [x] XML Sitemap
- [x] Robots.txt
- [x] Canonical URL
- [x] Mobile-first responsive design
- [x] Fast loading (Vite optimization)
- [x] Security headers (X-Frame-Options, X-XSS-Protection)

### 📈 To Rank Higher:
1. **Submit to Google Search Console**
   - Visit [search.google.com/search-console](https://search.google.com/search-console)
   - Add domain & verify
   - Submit sitemap.xml

2. **Submit to Bing Webmaster Tools**
   - Visit [bing.com/webmasters](https://bing.com/webmasters)
   - Add site

3. **Create Quality Backlinks**
   - Share on social media
   - Post on Reddit, Hacker News, Dev.to
   - Write guest posts

4. **Content Marketing**
   - Write blog posts about AI tools
   - Create video tutorials
   - Share on LinkedIn

---

## 🔒 Security

| Feature | Status |
|---------|--------|
| No API keys in frontend | ✅ |
| Environment variables for secrets | ✅ |
| Input validation on all endpoints | ✅ |
| CORS protection | ✅ |
| Security headers (X-Frame-Options, etc.) | ✅ |
| No password/credential storage | ✅ |
| HTTPS enforced (Vercel/Railway) | ✅ |

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

---

## 📄 License

MIT License - Free to use and modify!

Copyright (c) 2024 Yogesh Singh Kharkwal

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

---

## 👨‍💻 Author

### Yogesh Singh Kharkwal

- 🎓 **BCA Student** - SSJ University Almora, India
- 💻 **Skills:** Python, JavaScript, React, Node.js, OpenCV, MediaPipe, NLP
- 🔗 **GitHub:** [@yogeshkharkwal1-bit](https://github.com/yogeshkharkwal1-bit)
- 💼 **LinkedIn:** [Yogesh Singh Kharkwal](https://linkedin.com/in/yogesh-singh-kharkwal)
- 📧 **Email:** yogeshkharkwal1@gmail.com

---

## 🙏 Acknowledgments

- [MyMemory Translation API](https://mymemory.translated.net/) - Free translation service
- [Vercel](https://vercel.com) - Free frontend hosting
- [Railway](https://railway.app) - Free backend hosting
- [Tailwind CSS](https://tailwindcss.com) - Amazing CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Smooth animations

---

Made with ❤️ using React + Node.js

**⭐ Star this repo if you find it helpful!**
