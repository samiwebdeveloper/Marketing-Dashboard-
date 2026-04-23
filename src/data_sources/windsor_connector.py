"""
Windsor API connector for multi-platform social media analytics.
Fetches content performance metrics from Windsor and stores in JSON format.
"""
import os
import json
from datetime import datetime
from typing import Dict, List, Optional
import requests


class WindsorConnector:
    def __init__(self, api_key: Optional[str] = None, base_url: Optional[str] = None):
        """
        Initialize Windsor API connector.

        Args:
            api_key: Windsor API key. If None, reads from WINDSOR_API_KEY env var.
            base_url: Custom base URL. Default: https://connectors.windsor.ai
        """
        self.api_key = api_key or os.getenv('WINDSOR_API_KEY')
        if not self.api_key:
            raise ValueError('WINDSOR_API_KEY not provided')

        # Use custom base URL or Windsor connectors endpoint
        self.base_url = base_url or os.getenv('WINDSOR_BASE_URL', 'https://connectors.windsor.ai')

        self.session = requests.Session()

        # Try different authentication methods
        self.session.headers.update({
            'Content-Type': 'application/json'
        })

        # Test which auth method works
        self._auth_method = self._detect_auth_method()

    def _detect_auth_method(self) -> str:
        """Detect which authentication method Windsor accepts."""
        auth_methods = [
            ('Bearer', {'Authorization': f'Bearer {self.api_key}'}),
            ('API Key Header', {'X-API-Key': self.api_key}),
            ('Query Param', {}),  # Will be added to URL
        ]

        for method_name, headers in auth_methods:
            try:
                test_headers = self.session.headers.copy()
                test_headers.update(headers)
                # Try a simple test endpoint
                response = requests.get(
                    f'{self.base_url}/',
                    headers=test_headers,
                    timeout=5
                )
                if response.status_code != 401:
                    print(f'✓ Using {method_name} authentication')
                    self.session.headers.update(headers)
                    return method_name
            except:
                continue

        print('⚠ Could not auto-detect auth method, using Bearer token')
        self.session.headers['Authorization'] = f'Bearer {self.api_key}'
        return 'Bearer'

    def fetch_youtube_metrics(self) -> Dict:
        """Fetch YouTube metrics via Windsor."""
        endpoints_to_try = [
            f'{self.base_url}/youtube_analytics',
            f'{self.base_url}/youtube',
            f'{self.base_url}/connectors/youtube',
            f'{self.base_url}/data?connector=youtube',
        ]

        for endpoint in endpoints_to_try:
            try:
                response = self.session.get(endpoint, timeout=10)
                if response.status_code == 200:
                    print(f'✓ YouTube endpoint found: {endpoint}')
                    return self._format_response(response.json(), 'youtube')
            except Exception as e:
                continue

        print(f'⚠ Could not fetch YouTube metrics (tried {len(endpoints_to_try)} endpoints)')
        return {}

    def fetch_tiktok_metrics(self) -> Dict:
        """Fetch TikTok account metrics via Windsor."""
        try:
            response = self.session.get(f'{self.base_url}/tiktok/accounts')
            response.raise_for_status()
            return self._format_response(response.json(), 'tiktok')
        except Exception as e:
            print(f'Error fetching TikTok metrics: {e}')
            return {}

    def fetch_instagram_metrics(self) -> Dict:
        """Fetch Instagram account metrics via Windsor."""
        try:
            response = self.session.get(f'{self.base_url}/instagram/accounts')
            response.raise_for_status()
            return self._format_response(response.json(), 'instagram')
        except Exception as e:
            print(f'Error fetching Instagram metrics: {e}')
            return {}

    def fetch_facebook_metrics(self) -> Dict:
        """Fetch Facebook page metrics via Windsor."""
        try:
            response = self.session.get(f'{self.base_url}/facebook/pages')
            response.raise_for_status()
            return self._format_response(response.json(), 'facebook')
        except Exception as e:
            print(f'Error fetching Facebook metrics: {e}')
            return {}

    def fetch_linkedin_metrics(self) -> Dict:
        """Fetch LinkedIn profile metrics via Windsor."""
        try:
            response = self.session.get(f'{self.base_url}/linkedin/profiles')
            response.raise_for_status()
            return self._format_response(response.json(), 'linkedin')
        except Exception as e:
            print(f'Error fetching LinkedIn metrics: {e}')
            return {}

    def fetch_twitter_metrics(self) -> Dict:
        """Fetch Twitter account metrics via Windsor."""
        try:
            response = self.session.get(f'{self.base_url}/twitter/accounts')
            response.raise_for_status()
            return self._format_response(response.json(), 'twitter')
        except Exception as e:
            print(f'Error fetching Twitter metrics: {e}')
            return {}

    def fetch_all_platforms(self) -> Dict[str, Dict]:
        """Fetch metrics from all enabled platforms."""
        results = {}
        platforms = ['youtube', 'tiktok', 'instagram', 'facebook', 'linkedin', 'twitter']

        for platform in platforms:
            method_name = f'fetch_{platform}_metrics'
            if hasattr(self, method_name):
                results[platform] = getattr(self, method_name)()

        return results

    def _format_response(self, data: Dict, platform: str) -> Dict:
        """
        Format API response into standard schema.

        Args:
            data: Raw API response data
            platform: Platform name

        Returns:
            Formatted data with platform, timestamp, and metrics
        """
        return {
            'platform': platform,
            'timestamp': datetime.utcnow().isoformat(),
            'data': data
        }


def test_connection(api_key: str) -> bool:
    """Test Windsor API connection."""
    try:
        connector = WindsorConnector(api_key)
        response = connector.session.get(f'{connector.base_url}/health')
        return response.status_code == 200
    except Exception as e:
        print(f'Connection test failed: {e}')
        return False
