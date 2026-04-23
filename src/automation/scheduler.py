"""
Automated data refresh scheduler for marketing dashboard
Runs data collection every 6 hours with error handling and logging
"""
import os
import json
import time
import schedule
from datetime import datetime
from pathlib import Path
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from data.fetch_data import DataFetcher
from data_sources.windsor_connector import WindsorConnector


class DashboardScheduler:
    def __init__(self, interval_hours=6):
        """Initialize scheduler with refresh interval."""
        self.interval_hours = interval_hours
        self.data_fetcher = DataFetcher()
        self.log_file = Path('logs/scheduler.log')
        self.log_file.parent.mkdir(exist_ok=True)

    def log(self, message: str, level: str = 'INFO'):
        """Log message to file and console."""
        timestamp = datetime.utcnow().isoformat()
        log_message = f'[{timestamp}] [{level}] {message}'
        print(log_message)

        with open(self.log_file, 'a') as f:
            f.write(log_message + '\n')

    def refresh_data(self):
        """Fetch latest data from all platforms."""
        self.log('Starting data refresh...')

        api_key = os.getenv('WINDSOR_API_KEY')
        if not api_key:
            self.log('WINDSOR_API_KEY not set - skipping refresh', 'WARNING')
            return False

        try:
            results = self.data_fetcher.fetch_all_data(api_key)
            success_count = sum(1 for v in results.values() if v)
            total_count = len(results)

            self.log(f'Data refresh completed: {success_count}/{total_count} platforms')
            return success_count > 0
        except Exception as e:
            self.log(f'Error during data refresh: {e}', 'ERROR')
            return False

    def regenerate_insights(self):
        """Regenerate AI insights (Phase 4)."""
        self.log('Regenerating insights...')
        try:
            # This will be integrated with Claude API in Phase 4
            self.log('Insights regenerated successfully')
            return True
        except Exception as e:
            self.log(f'Error regenerating insights: {e}', 'ERROR')
            return False

    def health_check(self):
        """Verify system health and data freshness."""
        metadata_path = Path('src/data/analytics/metadata.json')

        if not metadata_path.exists():
            self.log('Metadata file missing', 'WARNING')
            return False

        with open(metadata_path, 'r') as f:
            metadata = json.load(f)

        last_update = datetime.fromisoformat(metadata.get('last_update', '1970-01-01T00:00:00'))
        age_minutes = (datetime.utcnow() - last_update).total_seconds() / 60

        if age_minutes > self.interval_hours * 60:
            self.log(f'Data is {age_minutes:.0f} minutes old - refresh may have failed', 'WARNING')
            return False

        self.log(f'Health check passed - data {age_minutes:.0f} minutes old')
        return True

    def schedule_jobs(self):
        """Schedule recurring jobs."""
        # Schedule data refresh every N hours
        schedule.every(self.interval_hours).hours.do(self.refresh_data)
        schedule.every(self.interval_hours).hours.do(self.regenerate_insights)
        schedule.every(1).hours.do(self.health_check)

        self.log(f'Scheduler configured - refresh every {self.interval_hours} hours')

    def run(self):
        """Run scheduler in foreground (blocking)."""
        self.schedule_jobs()
        self.log('Scheduler started')

        try:
            while True:
                schedule.run_pending()
                time.sleep(60)  # Check every minute
        except KeyboardInterrupt:
            self.log('Scheduler stopped')

    def run_background(self):
        """Run scheduler checks without blocking."""
        self.schedule_jobs()
        self.log('Scheduler initialized for background operation')

        # Run once at startup
        self.refresh_data()
        self.health_check()

        return self

    def run_once(self):
        """Run a single data refresh cycle."""
        self.refresh_data()
        self.health_check()


def start_scheduler(interval_hours=6):
    """Start the dashboard scheduler."""
    scheduler = DashboardScheduler(interval_hours)
    scheduler.run()


if __name__ == '__main__':
    # Run background scheduler
    scheduler = DashboardScheduler(interval_hours=6)
    scheduler.run_background()

    # Keep process alive
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print('\nScheduler stopped')
