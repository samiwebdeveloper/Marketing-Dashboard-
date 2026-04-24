"""
Windsor AI Connectors API Integration
Unified API to access data from 300+ marketing, analytics, and business platforms
Documentation: https://windsor.ai/api-documentation/
"""
import os
import json
from datetime import datetime
from typing import Dict, Optional
import requests


class WindsorConnector:
    """
    Windsor AI API Connector for multi-platform social media analytics.

    Base URL: https://connectors.windsor.ai
    Authentication: API key as query parameter
    """

    def __init__(self, api_key: Optional[str] = None):
        """
        Initialize Windsor AI connector.

        Args:
            api_key: Windsor API key. If None, reads from WINDSOR_API_KEY env var.
        """
        self.api_key = api_key or os.getenv('WINDSOR_API_KEY')
        if not self.api_key:
            raise ValueError('WINDSOR_API_KEY not provided')

        self.base_url = 'https://connectors.windsor.ai'
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'User-Agent': 'Windsor/1.0'
        })

    def _make_request(self, connector: str, fields: list, **kwargs) -> Dict:
        """
        Make a request to Windsor API.

        Args:
            connector: Platform name (facebook, tiktok, instagram, etc.)
            fields: List of fields to retrieve
            **kwargs: Optional parameters (date_preset, filter, etc.)

        Returns:
            API response or empty dict on error
        """
        try:
            # Build parameters
            params = {
                'api_key': self.api_key,
                'fields': ','.join(fields) if isinstance(fields, list) else fields
            }

            # Add optional parameters
            for key, value in kwargs.items():
                if value is not None:
                    params[key] = value

            # Make request
            url = f'{self.base_url}/{connector}'
            response = self.session.get(url, params=params, timeout=30)
            response.raise_for_status()

            data = response.json()
            return {
                'platform': connector,
                'timestamp': datetime.utcnow().isoformat(),
                'data': data.get('data', []),
                'meta': data.get('meta', {})
            }

        except requests.exceptions.HTTPError as e:
            if e.response.status_code == 401:
                print(f'❌ {connector}: Invalid API key (401)')
            elif e.response.status_code == 403:
                print(f'❌ {connector}: Permission denied (403) - API key may lack access')
            elif e.response.status_code == 404:
                print(f'❌ {connector}: Connector not found (404) - Check connector name')
            else:
                print(f'❌ {connector}: HTTP {e.response.status_code} - {e.response.reason}')
            return {}
        except Exception as e:
            print(f'❌ {connector}: Error - {str(e)[:100]}')
            return {}

    def fetch_youtube_metrics(self) -> Dict:
        """Fetch YouTube metrics from Windsor."""
        print('📺 Fetching YouTube data...')
        return self._make_request(
            'youtube',
            ['date', 'views', 'watch_time', 'subscribers', 'engagement_rate', 'ctr', 'impressions'],
            date_preset='last_30d'
        )

    def fetch_tiktok_metrics(self) -> Dict:
        """Fetch TikTok metrics from Windsor."""
        print('🎵 Fetching TikTok data...')
        return self._make_request(
            'tiktok',
            ['date', 'views', 'likes', 'shares', 'followers', 'engagement_rate', 'video_plays'],
            date_preset='last_30d'
        )

    def fetch_instagram_metrics(self) -> Dict:
        """Fetch Instagram metrics from Windsor."""
        print('📷 Fetching Instagram data...')
        return self._make_request(
            'instagram',
            ['date', 'reach', 'impressions', 'engagement_rate', 'followers', 'saves', 'comments'],
            date_preset='last_30d'
        )

    def fetch_facebook_metrics(self) -> Dict:
        """Fetch Facebook metrics from Windsor."""
        print('👥 Fetching Facebook data...')
        return self._make_request(
            'facebook',
            ['date', 'reach', 'engagement', 'followers', 'page_likes', 'shares', 'post_engagement'],
            date_preset='last_30d'
        )

    def fetch_linkedin_metrics(self) -> Dict:
        """Fetch LinkedIn metrics from Windsor."""
        print('💼 Fetching LinkedIn data...')
        return self._make_request(
            'linkedin',
            ['date', 'impressions', 'engagement_rate', 'followers', 'shares', 'comments', 'clicks'],
            date_preset='last_30d'
        )

    def fetch_twitter_metrics(self) -> Dict:
        """Fetch Twitter/X metrics from Windsor."""
        print('𝕏 Fetching Twitter data...')
        return self._make_request(
            'twitter',
            ['date', 'impressions', 'engagement_rate', 'followers', 'retweets', 'likes', 'replies'],
            date_preset='last_30d'
        )

    def fetch_all_platforms(self) -> Dict[str, Dict]:
        """Fetch metrics from all configured platforms."""
        results = {}
        platforms = [
            ('youtube', self.fetch_youtube_metrics),
            ('tiktok', self.fetch_tiktok_metrics),
            ('instagram', self.fetch_instagram_metrics),
            ('facebook', self.fetch_facebook_metrics),
            ('linkedin', self.fetch_linkedin_metrics),
            ('twitter', self.fetch_twitter_metrics),
        ]

        print('\n' + '=' * 70)
        print('WINDSOR AI DATA FETCH')
        print('=' * 70 + '\n')

        for platform_name, fetch_method in platforms:
            data = fetch_method()
            results[platform_name] = data
            if data and data.get('data'):
                record_count = len(data['data'])
                print(f'✅ {platform_name.upper():15} - {record_count} records fetched\n')
            else:
                print(f'⚠️  {platform_name.upper():15} - No data returned\n')

        print('=' * 70)
        return results

    def list_connectors(self) -> list:
        """List all available connectors."""
        try:
            url = f'{self.base_url}/list_connectors'
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f'Error listing connectors: {e}')
            return []

    def get_available_fields(self, connector: str) -> list:
        """Get available fields for a specific connector."""
        try:
            url = f'{self.base_url}/{connector}/fields'
            response = self.session.get(
                url,
                params={'api_key': self.api_key},
                timeout=10
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f'Error getting fields for {connector}: {e}')
            return []


def test_connection(api_key: str) -> bool:
    """Test Windsor API connection."""
    try:
        connector = WindsorConnector(api_key)
        # Try a simple request to test authentication
        response = connector.session.get(
            f'{connector.base_url}/list_connectors',
            timeout=5
        )
        return response.status_code == 200
    except Exception as e:
        print(f'Connection test failed: {e}')
        return False


if __name__ == '__main__':
    # Example usage
    api_key = os.getenv('WINDSOR_API_KEY', '5858cc1aecab4879157ad64085929426bd4e')

    try:
        connector = WindsorConnector(api_key)
        data = connector.fetch_all_platforms()

        # Save to analytics files
        from pathlib import Path
        analytics_dir = Path('src/data/analytics')

        for platform, platform_data in data.items():
            if platform_data and platform_data.get('data'):
                file_path = analytics_dir / f'{platform}.json'
                with open(file_path, 'w') as f:
                    json.dump(platform_data, f, indent=2)
                print(f'💾 Saved {platform} data to {file_path}')

    except Exception as e:
        print(f'Error: {e}')
