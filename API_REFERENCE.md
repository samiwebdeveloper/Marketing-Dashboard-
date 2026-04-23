# API Reference - Marketing Dashboard

## Windsor API Integration

### WindsorConnector

The `Windsor Connector` handles multi-platform data fetching.

```python
from data_sources.windsor_connector import WindsorConnector

# Initialize
connector = WindsorConnector(api_key='your_key')

# Fetch specific platform
youtube_data = connector.fetch_youtube_metrics()
tiktok_data = connector.fetch_tiktok_metrics()
instagram_data = connector.fetch_instagram_metrics()
facebook_data = connector.fetch_facebook_metrics()
linkedin_data = connector.fetch_linkedin_metrics()
twitter_data = connector.fetch_twitter_metrics()

# Fetch all platforms
all_data = connector.fetch_all_platforms()
# Returns: {
#   'youtube': {...},
#   'tiktok': {...},
#   'instagram': {...},
#   ...
# }

# Test connection
from data_sources.windsor_connector import test_connection
success = test_connection('your_api_key')
```

---

## Data Storage

### DataFetcher

Manages local JSON storage and retrieval.

```python
from data.fetch_data import DataFetcher

fetcher = DataFetcher()

# Fetch and store data
results = fetcher.fetch_all_data(api_key='your_key')
# Returns: {'youtube': True, 'tiktok': True, ...}

# Get latest data
latest = fetcher.get_latest_data('youtube')
# Returns: {
#   'timestamp': '2024-04-23T...',
#   'metrics': {'views': 125000, ...}
# }

# Get historical data
history = fetcher.get_platform_history('youtube', limit=30)
# Returns: [
#   {'timestamp': '2024-04-23T...', 'metrics': {...}},
#   ...
# ]
```

---

## React Utilities

### Data Loader

Load analytics data in React components.

```javascript
import { 
  loadPlatformData, 
  loadAllPlatformsData,
  loadMetadata,
  getLatestMetrics,
  getHistoryData,
  calculateDelta,
  aggregateMetrics 
} from 'dashboard/utils/dataLoader';

// Load single platform
const youtubeData = await loadPlatformData('youtube');

// Load all platforms
const allData = await loadAllPlatformsData();

// Get latest metrics
const latest = getLatestMetrics(youtubeData);
// Returns: { timestamp: '...', metrics: {...} }

// Get historical data
const history = getHistoryData(youtubeData, 30);
// Returns: [...] - Last 30 updates

// Calculate week-over-week delta
const delta = calculateDelta(youtubeData);
// Returns: 12.5 (12.5% change)

// Aggregate all platforms
const metrics = aggregateMetrics(allData);
// Returns: {
//   totalReach: 1234500,
//   avgEngagement: 4.2,
//   totalFollowers: 250000,
//   platformCount: 6
// }
```

---

## React Components

### MetricCard

Display KPI with delta indicator.

```jsx
import { MetricCard } from 'dashboard/components';

<MetricCard
  label="Total Reach"
  value={1234500}
  unit="people"
  delta={12.5}  // positive/negative percentage
  trend="vs last week"
  icon="👥"
  color="#2B6B6B"
  loading={false}
/>
```

### SimpleChart

Time-series visualization.

```jsx
import { SimpleChart } from 'dashboard/components/SimpleChart';

<SimpleChart
  data={[
    { value: 100000 },
    { value: 120000 },
    { value: 115000 },
  ]}
  label="Views"
  color="#CC0000"
  height={250}
/>
```

### InsightCard

Display AI-powered insight.

```jsx
import { InsightCard } from 'dashboard/components';

<InsightCard
  icon="🎯"
  title="Performance Alert"
  insight="YouTube reach is down 41% - recommend 2x/week content"
  confidence="high"  // 'high' | 'medium' | 'low'
  onAction={() => console.log('clicked')}
/>
```

### PlatformBadge

Platform indicator with brand colors.

```jsx
import { PlatformBadge } from 'dashboard/components';

<PlatformBadge 
  platform="youtube" 
  size="md"  // 'sm' | 'md' | 'lg'
  showLabel={true}
/>
```

---

## Intelligence / Insights

### Insight Generator

Generate strategic insights from data.

```javascript
import { 
  generatePlatformInsights,
  generateTrendInsights,
  generateContentRecommendations,
  generateCompetitiveInsights,
  generateRiskAlerts,
  generateExecutiveSummary 
} from 'intelligence/insightGenerator';

// Platform-specific insight
const insight = await generatePlatformInsights('youtube', data);
// Returns: {
//   title: '...',
//   insight: '...',
//   confidence: 'high'
// }

// Trend analysis
const trends = await generateTrendInsights(metrics);
// Returns: [{icon, title, insight, confidence}, ...]

// Content recommendations
const recs = generateContentRecommendations(data);
// Returns: [{icon, title, insight, action}, ...]

// Competitive analysis
const competitive = generateCompetitiveInsights();

// Risk detection
const risks = generateRiskAlerts(metrics);
// Returns: [{severity, title, insight}, ...]

// Executive summary
const summary = generateExecutiveSummary(metrics);
// Returns: { headline, summary, recommendation }
```

---

## Automation

### Dashboard Scheduler

Automate data refresh.

```python
from automation.scheduler import DashboardScheduler

# Create scheduler
scheduler = DashboardScheduler(interval_hours=6)

# Run in background
scheduler.run_background()

# Run once
scheduler.run_once()

# Run blocking (continuous)
scheduler.run()

# Health check
scheduler.health_check()
```

---

## Claude Code Skills

Callable functions for strategic analysis.

```javascript
import { 
  analyzePlatformTrends,
  generateContentStrategy,
  identifyGrowthOpportunities,
  dashboardSnapshot,
  updateInsights,
  competitiveAnalysis,
  generateROIReport
} from 'actions/skills';

// Analyze platform
const analysis = await analyzePlatformTrends('youtube');
// Returns: { platform, analysis, timestamp, status }

// Generate strategy
const strategy = await generateContentStrategy();
// Returns: { strategy: {...}, timestamp, status }

// Growth opportunities
const opps = await identifyGrowthOpportunities();
// Returns: { opportunities: [...], totalPotentialReach, timeframe }

// Dashboard export
const snapshot = await dashboardSnapshot();
// Returns: { snapshot: {...}, status, message }

// Update insights
const updated = await updateInsights();
// Returns: { updates: {...}, count, timestamp, status }

// Competitive analysis
const competitive = await competitiveAnalysis();
// Returns: { analysis: {...}, status }

// ROI report
const roi = await generateROIReport();
// Returns: { roi: {...}, status }
```

---

## Theme & Styling

### Color System

```javascript
import { T, THEME } from 'styles/theme';

// Token colors
T.bg          // #FAF7F2
T.coral       // #C5522A
T.ink         // #1A1611
T.green       // #2E7D52
T.red         // #C0392B
T.youtube     // #CC0000
T.instagram   // #E1306C
T.tiktok      // #000000
// ... and more

// CSS Variables
--bg          /* Background */
--coral       /* Primary accent */
--ink         /* Text */
--border      /* Borders */
```

### Platform Config

```javascript
import { PLATFORMS } from 'styles/theme';

PLATFORMS.youtube
// {
//   name: 'YouTube',
//   color: '#CC0000',
//   logo: '📺',
//   metrics: ['views', 'watch_time', ...]
// }
```

---

## Configuration

### Platforms Config (`src/config/platforms.json`)

```json
{
  "platforms": [
    {
      "id": "youtube",
      "name": "YouTube",
      "logo": "📺",
      "color": "#CC0000",
      "enabled": true,
      "metrics": ["views", "watch_time", ...]
    },
    ...
  ],
  "updateFrequency": "6h",
  "timezone": "UTC"
}
```

### Metrics Config (`src/config/metrics.json`)

```json
{
  "kpis": {
    "total_reach": {
      "label": "Total Reach",
      "target": 1500000,
      "minimum": 500000
    },
    ...
  },
  "platformGoals": {
    "youtube": {
      "views_per_video": 10000,
      "subscriber_growth": 50,
      ...
    }
  }
}
```

---

## Data Schema

### Platform Data Structure

Each platform JSON file contains:

```json
{
  "platform": "youtube",
  "updates": [
    {
      "timestamp": "2024-04-23T10:30:00.000Z",
      "metrics": {
        "views": 125000,
        "watch_time_hours": 2500,
        "subscribers": 50000,
        "engagement_rate": 4.5,
        "ctr": 5.2,
        "impressions": 250000
      }
    },
    ...
  ]
}
```

### Metadata

```json
{
  "last_update": "2024-04-23T10:30:00.000Z",
  "results": {
    "youtube": true,
    "tiktok": true,
    ...
  },
  "schema_version": "1.0"
}
```

---

## Error Handling

### API Errors

```javascript
try {
  const data = await loadPlatformData('youtube');
} catch (error) {
  console.error('Failed to load data:', error);
  // Falls back to mock data automatically
}
```

### Python Error Handling

```python
try:
  connector = WindsorConnector('api_key')
  data = connector.fetch_all_platforms()
except ValueError as e:
  print(f'Configuration error: {e}')
except Exception as e:
  print(f'API error: {e}')
```

---

## Rate Limits & Quotas

- **Windsor API**: Check Windsor documentation for rate limits
- **Data Refresh**: 6-hour default interval (configurable)
- **Historical Data**: Last 500 updates per platform
- **Dashboard**: All data loaded client-side (no server queries)

---

## Future (Phase 4+)

### Claude API Integration (Coming)

```javascript
// Will be available in Phase 4
import { claudeApiClient } from 'intelligence/claude-client';

const insights = await claudeApiClient.generateInsights({
  data: analyticsData,
  context: businessGoals,
  model: 'claude-opus-4'
});
```

---

For questions or issues, refer to README.md and DEPLOYMENT.md.
