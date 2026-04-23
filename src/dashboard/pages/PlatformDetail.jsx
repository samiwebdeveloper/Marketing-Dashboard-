import React, { useState, useEffect } from 'react';
import { Card, CardHeader, MetricCard, PlatformBadge, InsightCard } from '../components';
import { SimpleChart } from '../components/SimpleChart';
import { loadPlatformData, getLatestMetrics, getHistoryData, calculateDelta } from '../utils/dataLoader';
import { PLATFORMS, T } from '../../styles/theme';
import '../styles/platformDetail.css';

export function PlatformDetail({ platformId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const config = PLATFORMS[platformId];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const platformData = await loadPlatformData(platformId);
      setData(platformData);
      setLoading(false);
    };
    fetchData();
  }, [platformId]);

  if (!config) return <div>Platform not found</div>;
  if (loading) return <div style={{ padding: '24px' }}>Loading...</div>;

  const latest = getLatestMetrics(data);
  const history = getHistoryData(data);
  const delta = calculateDelta(data);
  const metrics = latest?.metrics || {};

  const chartData = history.map((entry, idx) => ({
    label: `Update ${idx}`,
    value: entry.metrics?.views || 0,
  }));

  return (
    <section className="platform-detail">
      {/* Header */}
      <div className="platform-detail__header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '48px' }}>{config.logo}</span>
          <div>
            <h2 style={{ margin: 0, marginBottom: '4px' }}>{config.name}</h2>
            <p style={{ margin: 0, color: T.muted, fontSize: '13px' }}>
              Platform performance analytics
            </p>
          </div>
        </div>
        <PlatformBadge platform={platformId} size="lg" />
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <MetricCard
          label="Views"
          value={metrics.views || 0}
          delta={delta}
          trend="vs previous"
          icon={config.logo}
          color={config.color}
        />
        <MetricCard
          label="Engagement Rate"
          value={metrics.engagement_rate || 0}
          unit="%"
          icon="💬"
          color={T.coral}
        />
        <MetricCard
          label="Followers"
          value={metrics.followers || 0}
          icon="👥"
          color={T.teal}
        />
        <MetricCard
          label="Growth"
          value={metrics.growth || 0}
          unit="new"
          icon="⬆️"
          color={T.green}
        />
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <Card>
          <CardHeader title="Views Over Time" />
          <SimpleChart
            data={chartData}
            label="Views"
            color={config.color}
            height={250}
          />
        </Card>

        <Card>
          <CardHeader title="Engagement Trend" />
          <SimpleChart
            data={history.map((entry, idx) => ({
              label: `Update ${idx}`,
              value: entry.metrics?.engagement_rate || 0,
            }))}
            label="Engagement Rate %"
            color={T.coral}
            height={250}
          />
        </Card>
      </div>

      {/* Insights */}
      <div className="section">
        <h3 style={{ marginBottom: '16px' }}>AI Insights</h3>
        <div className="insights-grid">
          <InsightCard
            icon="📊"
            title="Performance Analysis"
            insight={`${config.name} is performing ${delta > 0 ? 'well' : 'below'} expectations with ${Math.abs(delta)}% change in views. Consider adjusting posting schedule and content format.`}
            confidence={Math.abs(delta) > 20 ? 'high' : 'medium'}
          />
          <InsightCard
            icon="🎯"
            title="Content Strategy"
            insight={`Current engagement rate of ${metrics.engagement_rate}% suggests content resonates with audience. Focus on ${platformId === 'youtube' ? 'Shorts' : platformId === 'tiktok' ? 'trending sounds' : 'carousel posts'}.`}
            confidence="high"
          />
          <InsightCard
            icon="⚡"
            title="Growth Opportunity"
            insight={`With ${metrics.followers?.toLocaleString()} followers, you have capacity to grow ${Math.round(metrics.followers * 0.2)} more followers this quarter with consistent posting.`}
            confidence="medium"
          />
        </div>
      </div>
    </section>
  );
}
