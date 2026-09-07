# Render Deployment Guide (FREE)

## Step 1: Render pe jao
```
https://render.com
```

## Step 2: Sign up / Login
- GitHub se sign up karo (recommended)

## Step 3: New Web Service
1. **"New +"** button dabao
2. **"Web Service"** select karo

## Step 4: GitHub Repo Connect
1. GitHub account connect karo
2. Repository select karo: `yogeshkharkwal1-bit/text-translator`

## Step 5: Configure Backend
```
Name:                 summarize-ai-backend
Root Directory:       server
Runtime:              Node
Build Command:        npm install
Start Command:        node index.js
Instance Type:        Free (512 MB RAM)
```

## Step 6: Environment Variables
1. **"Advanced"** section mein jao
2. Add karo:
   ```
   NODE_ENV = production
   PORT = 10000
   ```

## Step 7: Deploy
1. **"Create Web Service"** dabao
2. Wait for 3-5 minutes
3. **Live URL milega:** `https://summarize-ai-backend.onrender.com`

---

## Important Notes:

### Free Tier Limits:
- **512 MB RAM**
- **15 min idle timeout** (phir slow start hota hai)
- **750 hours/month** free

### Agar slow chale toh:
- **Cyclic.sh** pe try karo (free, no sleep)
- Ya **Fly.io** pe deploy karo (free tier)

---

## Alternative: Cyclic.sh (FREE, No Sleep)

1. Go to [cyclic.sh](https://cyclic.sh)
2. Sign up with GitHub
3. Deploy from GitHub repo
4. Root: `server`
5. Start: `node index.js`
6. **No sleep** — 24/7 running!

---

## After Deploy:

### Frontend mein API URL update:
`src/services/api.js` mein:
```javascript
const API_BASE = 'https://summarize-ai-backend.onrender.com';
```

### Push changes:
```bash
git add .
git commit -m "Update API URL for production"
git push origin main
```

### Vercel auto-deploy:
- Push karne se Vercel automatically deploy ho jayega
