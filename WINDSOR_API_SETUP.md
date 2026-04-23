# Windsor AI API Integration Setup

## Current Status

✅ **API Authentication**: Working (Bearer token recognized)  
⚠️ **Endpoints**: Need to be discovered  
📊 **Dashboard**: Running with mock data at http://localhost:3000

---

## What We Need From You

The diagnostic test shows your API key is valid, but we're getting **403 Forbidden** on all endpoints. This is likely because:

1. **Different base URL** - Your Windsor account might use a different API endpoint
2. **Different endpoint paths** - Windsor might use custom naming for your platforms
3. **Account permissions** - Your API key might have restricted access

### To Resolve This, Please:

#### Step 1: Check Your Windsor Dashboard
1. Log in to https://windsor.ai
2. Go to **Settings → API** or **Integrations → API**
3. Look for:
   - **API Base URL** (might be different than `https://connectors.windsor.ai`)
   - **Available Endpoints** or **API Documentation**
   - **Connected Data Sources** (which platforms you have connected)

#### Step 2: Find Your Endpoint Format
Windsor might return data in different formats. Common patterns:

```
Option A - Platform-specific endpoints:
  GET https://connectors.windsor.ai/youtube?api_key=YOUR_KEY
  GET https://connectors.windsor.ai/tiktok?api_key=YOUR_KEY
  GET https://connectors.windsor.ai/instagram?api_key=YOUR_KEY

Option B - Unified data endpoint:
  GET https://connectors.windsor.ai/data?source=youtube&api_key=YOUR_KEY
  GET https://connectors.windsor.ai/data?source=tiktok&api_key=YOUR_KEY

Option C - Metrics endpoint:
  GET https://connectors.windsor.ai/metrics?api_key=YOUR_KEY
  GET https://connectors.windsor.ai/metrics?platform=youtube&api_key=YOUR_KEY

Option D - Custom sub-domain:
  GET https://api.windsor.ai/v1/...
  GET https://data.windsor.ai/...
```

#### Step 3: Get Your Connected Data Sources
Check which platforms you have actually connected:
- YouTube (channels, videos)
- TikTok (accounts, videos)
- Instagram (business accounts, posts)
- Facebook (pages, posts)
- LinkedIn (company, posts)
- Twitter/X (accounts, tweets)

---

## How to Test Manually

Once you find the correct endpoint, test it:

```bash
# Replace with your actual endpoint and key
curl -H "Authorization: Bearer 5858cc1aecab4879157ad64085929426bd4e" \
     "https://connectors.windsor.ai/YOUR_ENDPOINT"

# Or with API key as query parameter:
curl "https://connectors.windsor.ai/YOUR_ENDPOINT?api_key=5858cc1aecab4879157ad64085929426bd4e"
```

Look for:
- ✅ **200 OK** - Endpoint is correct!
- ❌ **401 Unauthorized** - API key issue
- ❌ **403 Forbidden** - Permissions issue
- ❌ **404 Not Found** - Wrong endpoint path

---

## Once You Have the Information

Provide us with:

1. **Correct API Base URL**
   ```
   https://connectors.windsor.ai
   or
   https://api.windsor.ai/v1
   or custom
   ```

2. **Endpoint Paths** for each platform:
   ```
   YouTube endpoint: /youtube (or /youtube_analytics, etc.)
   TikTok endpoint: /tiktok
   Instagram endpoint: /instagram
   Facebook endpoint: /facebook
   LinkedIn endpoint: /linkedin
   Twitter endpoint: /twitter
   ```

3. **Authentication Method** (we'll verify):
   ```
   Bearer token in header (most common)
   API key in header (X-API-Key)
   API key as query parameter (?api_key=...)
   ```

4. **Data Response Format** - Example response:
   ```json
   {
     "views": 125000,
     "engagement": 4.5,
     ...
   }
   ```

---

## Alternative: Check Windsor API Documentation

Visit: **https://windsor.ai/api-documentation/**

Look for:
- Base URL
- Endpoints available
- Authentication method
- Example requests
- Response formats

---

## What I'll Do Once I Have This Info

Once you provide the correct endpoints, I will:

1. ✅ Update `windsor_connector.py` with correct endpoints
2. ✅ Update authentication method
3. ✅ Test live connection
4. ✅ Fetch real data from your Windsor account
5. ✅ Display live analytics on dashboard
6. ✅ Start 6-hour automated refresh

---

## Current Configuration

```python
# File: .env
WINDSOR_API_KEY=5858cc1aecab4879157ad64085929426bd4e
WINDSOR_BASE_URL=https://connectors.windsor.ai  # ← Might need to change

# Default endpoints (need to be updated):
/youtube_analytics
/tiktok_analytics
/instagram_analytics
/facebook_analytics
/linkedin_analytics
/twitter_analytics
```

---

## Meanwhile...

Your dashboard is fully functional with **mock test data**:
- ✅ All 4 pages working
- ✅ UI fully responsive
- ✅ Components interactive
- ✅ Ready to display real data once endpoints are confirmed

Access at: **http://localhost:3000**

---

## Contact Windsor Support

If you can't find the information:
1. Contact Windsor support: support@windsor.ai
2. Ask for:
   - Correct API endpoint URL
   - Available endpoints for social platforms
   - Example API request

---

**Once you reply with the endpoint information, I'll immediately update the integration!** 🚀
