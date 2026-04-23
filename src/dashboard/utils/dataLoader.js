/**
 * Data loading utilities for analytics dashboard
 * Loads data from local JSON files and provides hooks for React components
 */

// Mock data loader - in production this will load from actual JSON files
export async function loadPlatformData(platform) {
  try {
    // In development, we use mock data stored in public/data
    const response = await fetch(`/data/analytics/${platform}.json`);
    if (!response.ok) {
      console.warn(`Could not load data for ${platform}, using defaults`);
      return getDefaultPlatformData(platform);
    }
    return await response.json();
  } catch (error) {
    console.warn(`Error loading ${platform} data:`, error);
    return getDefaultPlatformData(platform);
  }
}

export async function loadAllPlatformsData() {
  const platforms = ['youtube', 'tiktok', 'instagram', 'facebook', 'linkedin', 'twitter'];
  const data = {};

  for (const platform of platforms) {
    data[platform] = await loadPlatformData(platform);
  }

  return data;
}

export async function loadMetadata() {
  try {
    const response = await fetch('/data/analytics/metadata.json');
    if (!response.ok) return getDefaultMetadata();
    return await response.json();
  } catch (error) {
    console.warn('Error loading metadata:', error);
    return getDefaultMetadata();
  }
}

export function getLatestMetrics(platformData) {
  if (!platformData || !platformData.updates || platformData.updates.length === 0) {
    return null;
  }
  return platformData.updates[platformData.updates.length - 1];
}

export function getHistoryData(platformData, limit = 30) {
  if (!platformData || !platformData.updates) {
    return [];
  }
  return platformData.updates.slice(-limit);
}

export function calculateDelta(platformData) {
  if (!platformData || !platformData.updates || platformData.updates.length < 2) {
    return null;
  }

  const latest = platformData.updates[platformData.updates.length - 1];
  const previous = platformData.updates[platformData.updates.length - 2];

  const latestViews = latest.metrics?.views || 0;
  const previousViews = previous.metrics?.views || 0;

  if (previousViews === 0) return null;

  const delta = ((latestViews - previousViews) / previousViews) * 100;
  return Math.round(delta * 10) / 10;
}

export function aggregateMetrics(allPlatformsData) {
  const metrics = {
    totalReach: 0,
    totalEngagement: 0,
    platformCount: 0,
    totalFollowers: 0,
  };

  for (const [platform, data] of Object.entries(allPlatformsData)) {
    const latest = getLatestMetrics(data);
    if (!latest) continue;

    const m = latest.metrics || {};
    metrics.totalReach += m.views || m.reach || 0;
    metrics.totalEngagement += m.engagement_rate || 0;
    metrics.totalFollowers += m.followers || 0;
    metrics.platformCount += 1;
  }

  if (metrics.platformCount > 0) {
    metrics.avgEngagement = Math.round((metrics.totalEngagement / metrics.platformCount) * 10) / 10;
  }

  return metrics;
}

// Default data for testing
function getDefaultPlatformData(platform) {
  return {
    platform,
    updates: [
      {
        timestamp: new Date().toISOString(),
        metrics: {
          views: Math.floor(Math.random() * 500000) + 50000,
          engagement_rate: Math.random() * 8 + 2,
          followers: Math.floor(Math.random() * 100000) + 10000,
          growth: Math.floor(Math.random() * 500) + 50,
          watch_time_hours: Math.floor(Math.random() * 5000) + 500,
          impressions: Math.floor(Math.random() * 1000000) + 100000,
        },
      },
    ],
  };
}

function getDefaultMetadata() {
  return {
    last_update: new Date().toISOString(),
    results: {
      youtube: true,
      tiktok: true,
      instagram: true,
      facebook: true,
      linkedin: true,
      twitter: true,
    },
    schema_version: '1.0',
  };
}
