"""
Data fetching orchestrator for marketing analytics dashboard.
Pulls data from Windsor API and stores in JSON format.
"""
import json
import os
from datetime import datetime
from pathlib import Path
from typing import Dict, List
import sys

# Add parent directory to path for imports
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from data_sources.windsor_connector import WindsorConnector


class DataFetcher:
    def __init__(self, data_dir: str = 'src/data/analytics'):
        """Initialize data fetcher with storage directory."""
        self.data_dir = Path(data_dir)
        self.data_dir.mkdir(parents=True, exist_ok=True)
        self.schemas_dir = Path('src/data/schemas')
        self.schemas_dir.mkdir(parents=True, exist_ok=True)

    def fetch_all_data(self, api_key: str) -> Dict[str, bool]:
        """Fetch data from all platforms and store locally."""
        try:
            connector = WindsorConnector(api_key)
        except ValueError as e:
            print(f'Error initializing Windsor connector: {e}')
            return {}

        results = {}
        platforms = ['youtube', 'tiktok', 'instagram', 'facebook', 'linkedin', 'twitter']

        for platform in platforms:
            try:
                method_name = f'fetch_{platform}_metrics'
                fetch_method = getattr(connector, method_name)
                data = fetch_method()

                if data:
                    self._save_platform_data(platform, data)
                    results[platform] = True
                    print(f'✓ Successfully fetched {platform} data')
                else:
                    results[platform] = False
                    print(f'✗ No data returned for {platform}')
            except Exception as e:
                results[platform] = False
                print(f'✗ Error fetching {platform}: {e}')

        self._update_metadata(results)
        return results

    def _save_platform_data(self, platform: str, data: Dict) -> None:
        """Save platform data to JSON file with timestamp."""
        file_path = self.data_dir / f'{platform}.json'

        # Load existing data if file exists
        if file_path.exists():
            with open(file_path, 'r') as f:
                existing_data = json.load(f)
        else:
            existing_data = {'platform': platform, 'updates': []}

        # Add new data point with timestamp
        new_entry = {
            'timestamp': datetime.utcnow().isoformat(),
            'metrics': data.get('data', data)
        }
        existing_data['updates'].append(new_entry)

        # Keep only last 500 updates to avoid file bloat
        if len(existing_data['updates']) > 500:
            existing_data['updates'] = existing_data['updates'][-500:]

        # Write back to file
        with open(file_path, 'w') as f:
            json.dump(existing_data, f, indent=2)

    def _update_metadata(self, results: Dict[str, bool]) -> None:
        """Update metadata file with last fetch results."""
        metadata = {
            'last_update': datetime.utcnow().isoformat(),
            'results': results,
            'schema_version': '1.0'
        }

        metadata_path = self.data_dir / 'metadata.json'
        with open(metadata_path, 'w') as f:
            json.dump(metadata, f, indent=2)

    def get_latest_data(self, platform: str) -> Dict:
        """Get the most recent data for a platform."""
        file_path = self.data_dir / f'{platform}.json'

        if not file_path.exists():
            return {}

        with open(file_path, 'r') as f:
            data = json.load(f)

        if data.get('updates'):
            return data['updates'][-1]  # Return latest entry
        return {}

    def get_platform_history(self, platform: str, limit: int = 50) -> List[Dict]:
        """Get historical data for a platform."""
        file_path = self.data_dir / f'{platform}.json'

        if not file_path.exists():
            return []

        with open(file_path, 'r') as f:
            data = json.load(f)

        updates = data.get('updates', [])
        return updates[-limit:] if updates else []


def initialize_test_data():
    """Initialize with mock data for testing dashboard."""
    fetcher = DataFetcher()

    # Create mock data structure for each platform
    platforms = ['youtube', 'tiktok', 'instagram', 'facebook', 'linkedin', 'twitter']

    for platform in platforms:
        mock_data = {
            'platform': platform,
            'updates': [
                {
                    'timestamp': datetime.utcnow().isoformat(),
                    'metrics': {
                        'views': 125000,
                        'engagement_rate': 4.5,
                        'followers': 50000,
                        'growth': 150,
                        'watch_time_hours': 2500,
                        'impressions': 250000,
                        'clicks': 5000
                    }
                }
            ]
        }

        file_path = fetcher.data_dir / f'{platform}.json'
        with open(file_path, 'w') as f:
            json.dump(mock_data, f, indent=2)

        print(f'Created mock data for {platform}')

    # Create metadata
    metadata = {
        'last_update': datetime.utcnow().isoformat(),
        'results': {p: True for p in platforms},
        'schema_version': '1.0',
        'note': 'Mock data for testing'
    }
    metadata_path = fetcher.data_dir / 'metadata.json'
    with open(metadata_path, 'w') as f:
        json.dump(metadata, f, indent=2)

    print('Test data initialized')


if __name__ == '__main__':
    # Initialize test data for development
    initialize_test_data()
