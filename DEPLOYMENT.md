# Marketing Dashboard - Deployment Guide

## Quick Start (Local Development)

### Prerequisites
- Node.js 16+
- Python 3.8+
- Windsor API key

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   pip install requests schedule anthropic
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys:
   # WINDSOR_API_KEY=your_key_here
   # CLAUDE_API_KEY=your_claude_key_here (for Phase 4)
   ```

3. **Initialize test data:**
   ```bash
   python src/data/fetch_data.py
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

   Dashboard opens at **http://localhost:3000**

---

## Production Build

### Build for production:
```bash
npm run build
```

Output: `dist/` directory (ready for deployment)

### Serve production build:
```bash
npm run preview
```

---

## Deployment Options

### Option 1: Vercel (Recommended for React)
```bash
npm install -g vercel
vercel
```

### Option 2: Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Option 3: Docker
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

### Option 4: Self-hosted (Linux/Ubuntu)
```bash
# Install Node
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install and run
git clone <repo>
cd marketing-dashboard
npm install
npm run build
npm run preview
```

---

## Backend Automation

### Start data refresh scheduler:
```bash
python src/automation/scheduler.py
```

Runs data collection every 6 hours automatically.

### Run single refresh:
```bash
python -c "from src.data.fetch_data import DataFetcher; DataFetcher().fetch_all_data('YOUR_API_KEY')"
```

---

## Environment Variables

Create `.env` file:
```env
# Windsor API
WINDSOR_API_KEY=your_api_key_here

# Claude API (Phase 4)
CLAUDE_API_KEY=your_claude_key_here

# Optional: Scheduler
REFRESH_INTERVAL_HOURS=6
LOG_LEVEL=INFO

# Optional: Server
PORT=3000
NODE_ENV=production
```

---

## Data Storage

Data stored locally in `/src/data/analytics/`:
- `youtube.json`
- `tiktok.json`
- `instagram.json`
- `facebook.json`
- `linkedin.json`
- `twitter.json`
- `metadata.json`

Each file contains historical data with timestamps.

---

## Monitoring & Logging

### View scheduler logs:
```bash
tail -f logs/scheduler.log
```

### Check data freshness:
```bash
cat src/data/analytics/metadata.json
```

### Health check endpoint:
```bash
curl http://localhost:3000/api/health
```

---

## Troubleshooting

### Issue: "WINDSOR_API_KEY not set"
**Solution:** Set environment variable before running:
```bash
export WINDSOR_API_KEY=your_key
python src/automation/scheduler.py
```

### Issue: "No data loading on dashboard"
**Solution:** Initialize mock data:
```bash
python src/data/fetch_data.py
```

### Issue: "Dashboard blank or not loading"
**Solution:** Check browser console for errors:
1. Open DevTools (F12)
2. Check Console tab for JavaScript errors
3. Check Network tab for failed API calls

### Issue: "Port 3000 already in use"
**Solution:** Use different port:
```bash
PORT=3001 npm run dev
```

---

## Performance Optimization

### Build size reduction:
- Output from `npm run build` is already optimized with tree-shaking
- Total bundle: ~50KB gzipped

### Dashboard performance:
- Data loaded on-demand (lazy loading)
- Charts rendered with SVG (lightweight)
- Responsive grid layout (no heavy dependencies)

### Data refresh optimization:
- 6-hour refresh cycle prevents API overuse
- Local storage reduces bandwidth
- Historical data capped at 500 updates per platform

---

## Security Considerations

1. **API Keys**: Store in `.env` file, never commit to repo
2. **Data Privacy**: All analytics stay on your computer/server
3. **HTTPS**: Use in production (enable on hosting platform)
4. **Access Control**: Implement authentication for multi-user access

---

## Scaling

### For large teams:
1. Deploy frontend to Vercel/Netlify (free tier)
2. Deploy backend to Railway/Render (free tier)
3. Use managed database for analytics (optional)

### For multiple agencies:
1. Add multi-tenant support (separate data per account)
2. Implement user authentication (Auth0, Firebase)
3. Add role-based access control (RBAC)

---

## Support

For issues or questions:
- Check `README.md` for feature overview
- Review `API_REFERENCE.md` for integration details
- Run diagnostics: `npm run diagnostics`

---

## License

ISC
