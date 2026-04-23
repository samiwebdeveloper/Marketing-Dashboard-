#!/usr/bin/env python3
"""
Windsor AI API Diagnostic Tool
Helps identify correct API endpoints and authentication method
"""
import requests
import json
import sys
from typing import Dict, List, Tuple

class WindsorDiagnostic:
    def __init__(self, api_key: str, base_url: str = 'https://connectors.windsor.ai'):
        self.api_key = api_key
        self.base_url = base_url.rstrip('/')
        self.working_auth = None
        self.working_endpoints = []

    def test_authentication(self) -> bool:
        """Test different authentication methods."""
        print("\n" + "=" * 70)
        print("STEP 1: Testing Authentication Methods")
        print("=" * 70)

        auth_methods = {
            'Bearer Token (Header)': {
                'headers': {'Authorization': f'Bearer {self.api_key}'},
                'params': {}
            },
            'X-API-Key (Header)': {
                'headers': {'X-API-Key': self.api_key},
                'params': {}
            },
            'API Key (Query Parameter)': {
                'headers': {},
                'params': {'api_key': self.api_key}
            },
            'Auth Token (Query Parameter)': {
                'headers': {},
                'params': {'auth_token': self.api_key}
            },
        }

        for auth_name, auth_config in auth_methods.items():
            try:
                headers = {'Content-Type': 'application/json'}
                headers.update(auth_config['headers'])

                response = requests.get(
                    f'{self.base_url}/',
                    headers=headers,
                    params=auth_config['params'],
                    timeout=5
                )

                if response.status_code == 401:
                    print(f"❌ {auth_name:35} - 401 Unauthorized")
                elif response.status_code == 403:
                    print(f"⚠️  {auth_name:35} - 403 Forbidden (Auth might work, endpoint doesn't)")
                    self.working_auth = auth_name
                elif response.status_code == 404:
                    print(f"⚠️  {auth_name:35} - 404 Not Found (Auth might work, endpoint doesn't)")
                    self.working_auth = auth_name
                elif response.status_code == 200:
                    print(f"✅ {auth_name:35} - 200 OK")
                    self.working_auth = auth_name
                    return True
                else:
                    print(f"⚠️  {auth_name:35} - {response.status_code} {response.reason}")
            except Exception as e:
                print(f"❌ {auth_name:35} - Error: {str(e)[:40]}")

        return self.working_auth is not None

    def discover_endpoints(self) -> List[str]:
        """Try to discover available endpoints."""
        print("\n" + "=" * 70)
        print("STEP 2: Discovering API Endpoints")
        print("=" * 70)

        endpoint_patterns = [
            # Windsor specific patterns
            '/api/v1/metrics',
            '/api/metrics',
            '/metrics',
            '/api/data',
            '/data',
            '/api/connectors',
            '/connectors',
            '/accounts',
            '/list',

            # Platform-specific patterns
            '/youtube_analytics',
            '/tiktok_analytics',
            '/instagram_analytics',
            '/facebook_analytics',
            '/linkedin_analytics',
            '/twitter_analytics',
            '/x_analytics',

            # Alternative patterns
            '/analytics',
            '/platforms',
            '/sources',
            '/integrations',
        ]

        print(f"Testing {len(endpoint_patterns)} endpoint patterns...\n")

        for endpoint in endpoint_patterns:
            try:
                url = f'{self.base_url}{endpoint}'
                response = requests.get(
                    url,
                    headers={'Content-Type': 'application/json',
                            'Authorization': f'Bearer {self.api_key}'},
                    timeout=5
                )

                if response.status_code == 200:
                    print(f"✅ Found: {endpoint:35} - 200 OK")
                    self.working_endpoints.append(endpoint)
                    # Try to show response preview
                    try:
                        data = response.json()
                        print(f"   {str(data)[:70]}...")
                    except:
                        print(f"   Response: {response.text[:70]}...")
                elif response.status_code != 404:
                    print(f"⚠️  {endpoint:35} - {response.status_code}")

            except Exception as e:
                pass

        return self.working_endpoints

    def generate_report(self):
        """Generate diagnostic report."""
        print("\n" + "=" * 70)
        print("DIAGNOSTIC REPORT")
        print("=" * 70)

        print(f"\nBase URL: {self.base_url}")
        print(f"API Key: {self.api_key[:20]}...")

        if self.working_auth:
            print(f"\n✅ Working Auth Method: {self.working_auth}")
        else:
            print(f"\n❌ No working authentication method found")
            print("   Please verify your API key and base URL")

        if self.working_endpoints:
            print(f"\n✅ Found {len(self.working_endpoints)} working endpoint(s):")
            for ep in self.working_endpoints:
                print(f"   - {ep}")
        else:
            print(f"\n❌ No working endpoints found")
            print("   This could mean:")
            print("   - Incorrect base URL")
            print("   - API key doesn't have required permissions")
            print("   - Endpoints are protected/require additional setup")

        print("\n" + "=" * 70)
        print("NEXT STEPS")
        print("=" * 70)
        print("""
1. Check your Windsor AI dashboard for:
   - Correct API base URL
   - Connected platforms/integrations
   - Available data sources

2. Verify your API key has access to:
   - Social media connectors
   - Analytics data endpoints

3. Common Windsor endpoints:
   - /connectors - List connected accounts
   - /metrics - Available metrics
   - /platform_name_analytics - Platform-specific data

4. Contact Windsor support if endpoints aren't working
""")


if __name__ == '__main__':
    api_key = '5858cc1aecab4879157ad64085929426bd4e'
    base_url = 'https://connectors.windsor.ai'

    print("\n🔍 Windsor AI API Diagnostic Tool")
    print(f"API Key: {api_key[:20]}...")
    print(f"Base URL: {base_url}\n")

    diagnostic = WindsorDiagnostic(api_key, base_url)

    # Run diagnostics
    diagnostic.test_authentication()
    diagnostic.discover_endpoints()
    diagnostic.generate_report()
