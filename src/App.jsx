import React, { useState } from 'react';
import { MetricCard, Card, CardHeader, PlatformBadge, InsightCard, Button } from './dashboard/components';
import { T, PLATFORMS } from './styles/theme';
import './styles/index.css';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(r => setTimeout(r, 1500));
    setRefreshing(false);
  };

  return (
    <div className="app" style={{ backgroundColor: T.bg }}>
      {/* Header */}
      <header className="app-header">
        <div className="app-header__content">
          <div className="app-header__branding">
            <div className="app-header__logo">📊</div>
            <div>
              <h1 className="app-header__title">Marketing Dashboard</h1>
              <p className="app-header__subtitle">Live analytics & insights for your social channels</p>
            </div>
          </div>
          <div className="app-header__actions">
            <span className="app-header__status">
              <span className="app-header__indicator" style={{ backgroundColor: T.green }} />
              Live data
            </span>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleRefresh}
              loading={refreshing}
              icon="🔄"
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="app-nav">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'platforms', label: 'By Platform', icon: '📱' },
            { id: 'content', label: 'Content', icon: '📝' },
            { id: 'insights', label: 'Insights', icon: '💡' },
          ].map(tab => (
            <button
              key={tab.id}
              className={`app-nav__item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main className="app-main">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'platforms' && <PlatformsTab />}
        {activeTab === 'content' && <ContentTab />}
        {activeTab === 'insights' && <InsightsTab />}
      </main>
    </div>
  );
}

function OverviewTab() {
  return (
    <section className="section">
      <div className="section-header">
        <div>
          <h2>Overview</h2>
          <p>Week-over-week performance across all platforms</p>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="metrics-grid">
        <MetricCard
          label="Total Reach"
          value={1234500}
          unit="people"
          delta={12.5}
          trend="vs last week"
          icon="👥"
          color={T.teal}
        />
        <MetricCard
          label="Engagement Rate"
          value={4.2}
          unit="%"
          delta={-2.1}
          trend="vs last week"
          icon="💬"
          color={T.coral}
        />
        <MetricCard
          label="Content Pieces"
          value={24}
          delta={8.3}
          trend="vs last week"
          icon="📸"
          color={T.instagram}
        />
        <MetricCard
          label="Growth"
          value={156}
          unit="new followers"
          delta={21.3}
          trend="vs last week"
          icon="⬆️"
          color={T.green}
        />
      </div>

      {/* Insights Section */}
      <div className="section">
        <h3 style={{ marginBottom: '16px' }}>AI Insights</h3>
        <div className="insights-grid">
          <InsightCard
            icon="🎯"
            title="YouTube Performance"
            insight="YouTube reach is down 41% this week. Recommend increasing video frequency to 2x/week and focusing on Shorts format."
            confidence="high"
          />
          <InsightCard
            icon="📈"
            title="Instagram Opportunity"
            insight="Instagram engagement up 23% with high-performing product links. Continue this strategy and consider increasing budget."
            confidence="high"
          />
          <InsightCard
            icon="⚡"
            title="TikTok Leadership"
            insight="TikTok outperforming competitors by 2x on similar content. Opportunity to scale budget and create more TikTok-specific content."
            confidence="medium"
          />
        </div>
      </div>
    </section>
  );
}

function PlatformsTab() {
  return (
    <section className="section">
      <div className="section-header">
        <h2>Platforms</h2>
      </div>

      <div className="platforms-grid">
        {Object.entries(PLATFORMS).map(([key, config]) => (
          <Card
            key={key}
            className="platform-card"
            style={{ borderTopColor: config.color, borderTopWidth: '3px' }}
          >
            <CardHeader
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>{config.logo}</span>
                  {config.name}
                </div>
              }
            />
            <div style={{ paddingLeft: '16px', paddingRight: '16px', paddingBottom: '16px' }}>
              <div style={{ marginBottom: '16px' }}>
                <p style={{ color: T.muted, fontSize: '12px', marginBottom: '4px' }}>
                  Views This Week
                </p>
                <p style={{ fontSize: '24px', fontWeight: '700', color: T.ink }}>
                  {Math.floor(Math.random() * 500000).toLocaleString()}
                </p>
              </div>
              <PlatformBadge platform={key} size="md" />
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function ContentTab() {
  return (
    <section className="section">
      <div className="section-header">
        <h2>Content Performance</h2>
      </div>
      <Card>
        <CardHeader title="Top Performing Content" />
        <div style={{ padding: '16px' }}>
          <p style={{ color: T.muted }}>Content performance data will load from analytics files</p>
        </div>
      </Card>
    </section>
  );
}

function InsightsTab() {
  return (
    <section className="section">
      <div className="section-header">
        <h2>Strategic Insights</h2>
      </div>

      <div className="insights-grid">
        {Array.from({ length: 5 }).map((_, i) => (
          <InsightCard
            key={i}
            icon={['🎯', '📈', '⚡', '💰', '🚀'][i]}
            title={
              [
                'Performance Alert',
                'Growth Opportunity',
                'Strategy Recommendation',
                'ROI Analysis',
                'Trend Alert',
              ][i]
            }
            insight="AI-powered insight will be generated based on your analytics data and historical trends."
            confidence={['high', 'medium', 'high', 'low', 'medium'][i]}
          />
        ))}
      </div>
    </section>
  );
}

export default App;
