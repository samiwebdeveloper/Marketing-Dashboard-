# Marketing Operations Dashboard

A professional, AI-powered marketing analytics dashboard for C-level executives. Real-time insights from multiple social media platforms with Claude-powered strategic recommendations.

## Features

- **Multi-Platform Analytics**: YouTube, TikTok, Instagram, Facebook, LinkedIn, Twitter
- **Professional Design**: Anthropic warm-cream theme optimized for executive presentations
- **AI Insights**: Claude-powered analysis and strategic recommendations
- **Automated Updates**: 6-hour refresh cycle for live data
- **C-Level Ready**: Board presentation-quality visualizations
- **Local Data**: All analytics stored locally on your computer

## Tech Stack

- **Frontend**: React 18+ with Vite
- **Backend**: Python (data fetching + automation)
- **Analytics**: Claude API for insights
- **Data Sources**: Windsor API connector

## Getting Started

### Prerequisites

- Node.js 16+
- Python 3.8+
- Windsor API key

### Installation

1. Install Node dependencies:
```bash
npm install
```

2. Set up Python environment:
```bash
pip install requests anthropic schedule
```

3. Create `.env` file with your API keys:
```
WINDSOR_API_KEY=your_api_key_here
CLAUDE_API_KEY=your_claude_key_here
```

### Running the Dashboard

Development:
```bash
npm run dev
```

This opens the dashboard at http://localhost:3000

### Project Structure

```
marketing-dashboard/
├── src/
│   ├── dashboard/           # React components
│   │   ├── components/      # Reusable UI components
│   │   └── pages/           # Dashboard pages
│   ├── styles/              # Design system & theme
│   ├── data/                # Local data storage
│   │   └── analytics/       # Platform JSON files
│   ├── data_sources/        # API connectors
│   ├── intelligence/        # Claude insights
│   ├── automation/          # Schedulers
│   ├── actions/             # Claude Code skills
│   └── config/              # Configuration files
├── public/                  # Static files
└── vite.config.js          # Vite configuration
```

## Data Layer

### File Structure

Data is stored locally in JSON format:

```
src/data/analytics/
├── youtube.json             # YouTube metrics
├── tiktok.json              # TikTok metrics
├── instagram.json           # Instagram metrics
├── facebook.json            # Facebook metrics
├── linkedin.json            # LinkedIn metrics
├── twitter.json             # Twitter metrics
└── metadata.json            # Update tracking
```

### Schema

Each platform file contains:
```json
{
  "platform": "youtube",
  "updates": [
    {
      "timestamp": "2024-04-23T10:30:00.000Z",
      "metrics": {
        "views": 125000,
        "engagement_rate": 4.5,
        "followers": 50000,
        ...
      }
    }
  ]
}
```

## Configuration

### Platforms (`src/config/platforms.json`)

Define which platforms to track and their metrics:
- YouTube, TikTok, Instagram, Facebook, LinkedIn, Twitter
- Custom metrics per platform
- Update frequency (default: 6 hours)

### KPIs (`src/config/metrics.json`)

Set business goals and thresholds:
- Revenue targets
- Engagement benchmarks
- Growth goals
- Alert thresholds

## Development

### Building for Production

```bash
npm run build
```

Output goes to `dist/` directory.

### Testing

Initialize mock data for testing:
```bash
python src/data/fetch_data.py
```

## API Integration

### Windsor Connector

Fetch data from Windsor API:

```python
from data_sources.windsor_connector import WindsorConnector

connector = WindsorConnector(api_key='your_key')
data = connector.fetch_all_platforms()
```

### Claude Integration (Phase 4)

AI-powered insights coming in Phase 4:
- Trend analysis
- Anomaly detection
- Strategic recommendations
- Performance alerts

## Roadmap

- **Phase 1**: ✅ Design system & React setup
- **Phase 2**: Data layer & Windsor integration (In Progress)
- **Phase 3**: Dashboard UI & visualization
- **Phase 4**: Claude AI insights
- **Phase 5**: Automation & scheduler
- **Phase 6**: Production deployment

## Contributing

This is a single-user project dashboard. For questions or improvements, refer to the documentation.

## License

ISC
