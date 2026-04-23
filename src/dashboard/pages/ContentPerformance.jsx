import React, { useState, useEffect } from 'react';
import { Card, CardHeader, PlatformBadge } from '../components';
import { loadAllPlatformsData, getLatestMetrics } from '../utils/dataLoader';
import { PLATFORMS, T } from '../../styles/theme';
import '../styles/contentPerformance.css';

export function ContentPerformance() {
  const [content, setContent] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      const allData = await loadAllPlatformsData();

      // Generate mock content items from platform data
      const items = [];
      Object.entries(allData).forEach(([platform, data]) => {
        const latest = getLatestMetrics(data);
        if (latest?.metrics) {
          items.push({
            id: `${platform}-1`,
            platform,
            title: `${PLATFORMS[platform].name} Content #1`,
            views: latest.metrics.views || 0,
            engagement: latest.metrics.engagement_rate || 0,
            date: new Date(latest.timestamp),
            thumbnail: `https://via.placeholder.com/200x112?text=${PLATFORMS[platform].logo}`,
          });
        }
      });

      // Sort by views descending
      items.sort((a, b) => b.views - a.views);
      setContent(items);
      setLoading(false);
    };

    fetchContent();
  }, []);

  const filteredContent = filter === 'all' ? content : content.filter(c => c.platform === filter);

  return (
    <section className="content-performance">
      {/* Header */}
      <div className="content-performance__header">
        <div>
          <h2>Content Performance</h2>
          <p>Track performance across all platforms</p>
        </div>

        {/* Filter */}
        <div className="content-performance__filters">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Platforms
          </button>
          {Object.entries(PLATFORMS).map(([id, config]) => (
            <button
              key={id}
              className={`filter-btn ${filter === id ? 'active' : ''}`}
              onClick={() => setFilter(id)}
              style={{ borderColor: config.color }}
            >
              {config.logo} {config.name}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p style={{ color: T.muted }}>Loading content...</p>
      ) : filteredContent.length === 0 ? (
        <Card>
          <CardHeader title="No Content" />
          <p style={{ padding: '16px', color: T.muted }}>No content data available</p>
        </Card>
      ) : (
        <div className="content-grid">
          {filteredContent.map(item => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}

function ContentCard({ item }) {
  const config = PLATFORMS[item.platform];
  const performanceScore = Math.min(100, (item.engagement * 20).toFixed(0));

  return (
    <Card className="content-card">
      {/* Thumbnail */}
      <div className="content-card__thumbnail">
        <img src={item.thumbnail} alt={item.title} />
        <div className="content-card__badge">
          <PlatformBadge platform={item.platform} size="sm" showLabel={false} />
        </div>
      </div>

      {/* Info */}
      <div className="content-card__info">
        <h4 className="content-card__title">{item.title}</h4>

        {/* Metrics */}
        <div className="content-card__metrics">
          <div className="content-card__metric">
            <span className="content-card__metric-label">Views</span>
            <span className="content-card__metric-value">{(item.views / 1000).toFixed(1)}K</span>
          </div>
          <div className="content-card__metric">
            <span className="content-card__metric-label">Engagement</span>
            <span className="content-card__metric-value">{item.engagement.toFixed(1)}%</span>
          </div>
        </div>

        {/* Performance Bar */}
        <div className="content-card__performance">
          <div className="content-card__performance-label">Performance</div>
          <div className="content-card__performance-bar">
            <div
              className="content-card__performance-fill"
              style={{
                width: `${performanceScore}%`,
                backgroundColor: performanceScore > 70 ? T.green : performanceScore > 40 ? T.coral : T.red,
              }}
            />
          </div>
          <span className="content-card__performance-score">{performanceScore}%</span>
        </div>

        {/* Date */}
        <p className="content-card__date">
          {item.date.toLocaleDateString()} {item.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </Card>
  );
}
