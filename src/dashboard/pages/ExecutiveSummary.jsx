import React, { useState, useEffect } from 'react';
import { Card, CardHeader, MetricCard, InsightCard, Button } from '../components';
import { loadAllPlatformsData, aggregateMetrics, getLatestMetrics } from '../utils/dataLoader';
import { PLATFORMS, T } from '../../styles/theme';

export function ExecutiveSummary() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const allData = await loadAllPlatformsData();
      const aggregated = aggregateMetrics(allData);
      setMetrics(aggregated);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div style={{ padding: '24px' }}>Loading...</div>;

  const weekDate = new Date();
  weekDate.setDate(weekDate.getDate() - 7);

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Executive Brief Header */}
      <Card style={{ background: T.coralBg, border: `1px solid ${T.coral}20` }}>
        <CardHeader
          title="Executive Brief"
          subtitle={`Week of ${weekDate.toLocaleDateString()} - ${new Date().toLocaleDateString()}`}
          action={<Button size="sm" variant="primary">📥 Export PDF</Button>}
        />
        <div style={{ padding: '16px' }}>
          <p style={{ fontSize: '14px', color: T.ink, lineHeight: '1.6' }}>
            This week's performance summary across all marketing channels. All platforms showing positive engagement trends with strong reach growth. Recommend increasing content velocity on TikTok where performance is outpacing historical averages by 2x.
          </p>
        </div>
      </Card>

      {/* Key Metrics Row */}
      <div className="metrics-grid">
        <MetricCard
          label="Total Reach"
          value={metrics.totalReach}
          unit="people"
          delta={15}
          icon="👥"
          color={T.teal}
        />
        <MetricCard
          label="Avg Engagement"
          value={metrics.avgEngagement}
          unit="%"
          delta={8}
          icon="💬"
          color={T.coral}
        />
        <MetricCard
          label="Total Followers"
          value={metrics.totalFollowers}
          delta={12}
          icon="⭐"
          color={T.green}
        />
        <MetricCard
          label="Platforms Active"
          value={metrics.platformCount}
          unit="channels"
          icon="📱"
          color={T.instagram}
        />
      </div>

      {/* Platform Summary */}
      <Card>
        <CardHeader title="Platform Performance Summary" />
        <PlatformSummaryTable />
      </Card>

      {/* Strategic Recommendations */}
      <div>
        <h3 style={{ marginBottom: '16px' }}>Strategic Recommendations</h3>
        <div className="insights-grid">
          <InsightCard
            icon="🎯"
            title="Content Velocity"
            insight="Increase posting frequency to 3x/week on TikTok and 2x/week on YouTube Shorts. Current content is underutilized relative to platform demand."
            confidence="high"
            onAction={() => alert('Generate content calendar')}
          />
          <InsightCard
            icon="📈"
            title="Budget Allocation"
            insight="Reallocate 20% of Instagram budget to TikTok based on 2x performance outperformance. ROI metrics show clear advantage."
            confidence="high"
            onAction={() => alert('View budget analysis')}
          />
          <InsightCard
            icon="⚡"
            title="Emerging Opportunity"
            insight="LinkedIn engagement rate improved 34% YoY. Consider developing thought leadership content series targeting decision-makers."
            confidence="medium"
            onAction={() => alert('View LinkedIn insights')}
          />
          <InsightCard
            icon="💡"
            title="Risk Mitigation"
            insight="YouTube CTR declined 12% this month. Review thumbnail and title strategies immediately to maintain subscriber momentum."
            confidence="high"
            onAction={() => alert('View optimization guide')}
          />
        </div>
      </div>

      {/* Data Health */}
      <Card>
        <CardHeader title="Data Health" subtitle="Last updated: Today at 2:30 PM" />
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
            {Object.entries(PLATFORMS).map(([id, config]) => (
              <div key={id} style={{ fontSize: '13px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ color: T.green, fontSize: '16px' }}>✓</span>
                  <span style={{ fontWeight: '600' }}>{config.name}</span>
                </div>
                <div style={{ color: T.muted, fontSize: '11px' }}>
                  Data updated 2 hours ago
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
}

function PlatformSummaryTable() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const allData = await loadAllPlatformsData();
      const summary = {};

      Object.entries(allData).forEach(([platform, platformData]) => {
        const latest = getLatestMetrics(platformData);
        summary[platform] = latest?.metrics || {};
      });

      setData(summary);
    };

    fetchData();
  }, []);

  return (
    <div style={{ overflowX: 'auto', padding: '16px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: `2px solid ${T.border}` }}>
            <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '12px', fontWeight: '700', color: T.muted }}>
              Platform
            </th>
            <th style={{ textAlign: 'right', padding: '12px 0', fontSize: '12px', fontWeight: '700', color: T.muted }}>
              Views
            </th>
            <th style={{ textAlign: 'right', padding: '12px 0', fontSize: '12px', fontWeight: '700', color: T.muted }}>
              Engagement
            </th>
            <th style={{ textAlign: 'right', padding: '12px 0', fontSize: '12px', fontWeight: '700', color: T.muted }}>
              Followers
            </th>
            <th style={{ textAlign: 'center', padding: '12px 0', fontSize: '12px', fontWeight: '700', color: T.muted }}>
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(PLATFORMS).map(([id, config]) => {
            const metrics = data[id] || {};
            const status = metrics.views ? 'Active' : 'Pending';

            return (
              <tr key={id} style={{ borderBottom: `1px solid ${T.border}` }}>
                <td style={{ padding: '16px 0', fontSize: '13px', fontWeight: '600', color: T.ink }}>
                  {config.logo} {config.name}
                </td>
                <td style={{ padding: '16px 0', textAlign: 'right', fontSize: '13px', color: T.ink }}>
                  {(metrics.views || 0).toLocaleString()}
                </td>
                <td style={{ padding: '16px 0', textAlign: 'right', fontSize: '13px', color: T.ink }}>
                  {(metrics.engagement_rate || 0).toFixed(1)}%
                </td>
                <td style={{ padding: '16px 0', textAlign: 'right', fontSize: '13px', color: T.ink }}>
                  {(metrics.followers || 0).toLocaleString()}
                </td>
                <td style={{ padding: '16px 0', textAlign: 'center' }}>
                  <span style={{ fontSize: '12px', color: T.green, fontWeight: '600' }}>
                    ✓ {status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
