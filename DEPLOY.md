# 🚀 Free Deployment Guide

## Frontend: Vercel (Free)

### Step 1: Vercel pe jao
```
https://vercel.com
```

### Step 2: Sign up / Login
- GitHub se sign up karo (recommended)

### Step 3: Import Project
1. **"Add New"** → **"Project"**
2. **"Import Git Repository"** section mein
3. Search: `yogeshkharkwal1-bit/text-translator`
4. **"Import"** dabao

### Step 4: Configure
```
Framework Preset:     Vite
Build Command:        npm run build
Output Directory:     dist
Install Command:      npm install
```

### Step 5: Deploy
1. **"Deploy"** dabao
2. Wait 2-3 minutes
3. **Live URL:** `https://text-translator-xyz.vercel.app`

---

## Backend: Render (Free)

### Step 1: Render pe jao
```
https://render.com
```

### Step 2: Sign up / Login
- GitHub se sign up karo

### Step 3: New Web Service
1. **"New +"** button dabao
2. **"Web Service"** select karo

### Step 4: GitHub Repo Connect
1. GitHub account connect karo
2. Repository select karo: `yogeshkharkwal1-bit/text-translator`

### Step 5: Configure Backend
```
Name:                 summarize-ai-backend
Root Directory:       server
Runtime:              Node
Build Command:        npm install
Start Command:        node index.js
Instance Type:        Free (512 MB RAM)
```

### Step 6: Environment Variables
1. **"Advanced"** section mein jao
2. Add karo:
   ```
   NODE_ENV = production
   PORT = 10000
   ```

### Step 7: Deploy
1. **"Create Web Service"** dabao
2. Wait 3-5 minutes
3. **Live URL:** `https://summarize-ai-backend.onrender.com`

---

## Connect Frontend + Backend

### Step 1: API URL update
`src/services/api.js` mein:
```javascript
const API_BASE = 'https://summarize-ai-backend.onrender.com';
```

### Step 2: Push changes
```bash
git add .
git commit -m "Update API URL for production"
git push origin main
```

### Step 3: Vercel auto-deploy
- Push karne se Vercel automatically deploy ho jayega!

---

## Alternative: Cyclic.sh (FREE, No Sleep)

Agar Render slow chale toh:

1. Go to [cyclic.sh](https://cyclic.sh)
2. Sign up with GitHub
3. Deploy from GitHub repo
4. Root: `server`
5. Start: `node index.js`
6. **No sleep** — 24/7 running!

---

## Free Tier Limits

| Platform | RAM | Timeout | Monthly Hours |
|----------|-----|---------|---------------|
| Vercel   | -   | None    | Unlimited     |
| Render   | 512MB | 15 min idle | 750 hours |
| Cyclic   | 256MB | None    | Unlimited     |

---

## After Deploy: Test

1. **Frontend URL** open karo
2. **4 tabs test** karo:
   - 📝 Summarizer
   - 🌐 Translator
   - 📧 Email Analyzer
   - 🛡️ Fake Email Detector

---

## SEO: Search Engine Ranking

### Google Search Console
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property: `https://text-translator-xyz.vercel.app`
3. Verify ownership
4. Submit sitemap: `https://text-translator-xyz.vercel.app/sitemap.xml`

### Bing Webmaster Tools
1. Go to [bing.com/webmasters](https://bing.com/webmasters)
2. Add site
3. Submit sitemap
