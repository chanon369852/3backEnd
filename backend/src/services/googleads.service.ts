import { google } from 'googleapis';
import { prisma } from '../utils/prisma';

export interface GoogleAdsCredentials {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  developerToken: string;
  customerId: string;
}

export interface GoogleAdsCampaign {
  campaign: {
    id: string;
    name: string;
    status: string;
    advertisingChannelType: string;
    startDate: string;
    endDate?: string;
  };
  metrics: {
    impressions: number;
    clicks: number;
    costMicros: number;
    ctr: number;
    averageCpc: number;
    conversions: number;
    conversionValue: number;
  };
}

export interface GoogleAdsInsight {
  date: {
    year: string;
    month: string;
    day: string;
  };
  metrics: {
    impressions: number;
    clicks: number;
    costMicros: number;
    ctr: number;
    averageCpc: number;
    conversions: number;
    conversionValue: number;
  };
}

export class GoogleAdsService {
  private oauth2Client: any;
  private adsClient: any;

  async getCredentials(tenantId: string): Promise<GoogleAdsCredentials | null> {
    const integration = await prisma.integration.findFirst({
      where: { 
        tenantId, 
        provider: 'googleads',
        isActive: true 
      }
    });

    if (!integration) return null;

    return integration.config as unknown as GoogleAdsCredentials;
  }

  async initializeClient(tenantId: string): Promise<void> {
    const credentials = await this.getCredentials(tenantId);
    if (!credentials) throw new Error('Google Ads credentials not found');

    this.oauth2Client = new google.auth.OAuth2(
      credentials.clientId,
      credentials.clientSecret,
      'postmessage' // Used for server-side flows
    );

    this.oauth2Client.setCredentials({
      refresh_token: credentials.refreshToken
    });

    // Note: Google Ads API client initialization would go here
    // For now, we'll use mock data
    this.adsClient = null;
  }

  async validateCredentials(credentials: GoogleAdsCredentials): Promise<boolean> {
    try {
      const tempClient = new google.auth.OAuth2(
        credentials.clientId,
        credentials.clientSecret
      );

      tempClient.setCredentials({
        refresh_token: credentials.refreshToken
      });

      // Test the credentials by getting a new access token
      const { credentials: newCreds } = await tempClient.refreshAccessToken();
      return !!newCreds.access_token;
    } catch (error) {
      console.error('Google Ads validation failed:', error);
      return false;
    }
  }

  async getCampaigns(tenantId: string, _dateRange?: { start: string; end: string }): Promise<GoogleAdsCampaign[]> {
    const credentials = await this.getCredentials(tenantId);
    if (!credentials) throw new Error('Google Ads credentials not found');

    try {
      // Mock data for now - replace with actual Google Ads API calls
      return [
        {
          campaign: {
            id: 'mock-campaign-1',
            name: 'Mock Google Ads Campaign 1',
            status: 'ENABLED',
            advertisingChannelType: 'SEARCH',
            startDate: '2024-01-01',
            endDate: '2024-12-31'
          },
          metrics: {
            impressions: 10000,
            clicks: 100,
            costMicros: 50000,
            ctr: 1.0,
            averageCpc: 500,
            conversions: 5,
            conversionValue: 10000
          }
        }
      ];
    } catch (error) {
      console.error('Google Ads campaigns fetch failed:', error);
      throw new Error('Failed to fetch Google Ads campaigns');
    }
  }

  async getInsights(tenantId: string, _dateRange?: { start: string; end: string }): Promise<GoogleAdsInsight[]> {
    const credentials = await this.getCredentials(tenantId);
    if (!credentials) throw new Error('Google Ads credentials not found');

    try {
      // Mock data for now
      return [
        {
          date: {
            year: '2024',
            month: '01',
            day: '01'
          },
          metrics: {
            impressions: 1000,
            clicks: 50,
            costMicros: 25000,
            ctr: 5.0,
            averageCpc: 500,
            conversions: 2,
            conversionValue: 10000
          }
        }
      ];
    } catch (error) {
      console.error('Google Ads insights fetch failed:', error);
      throw new Error('Failed to fetch Google Ads insights');
    }
  }

  async getCustomers(tenantId: string): Promise<any[]> {
    await this.initializeClient(tenantId);

    try {
      const customerService = this.adsClient.CustomerService;
      const accessibleCustomers = await customerService.listAccessibleCustomers();

      return accessibleCustomers.map((customer: any) => ({
        customerId: customer.resourceName.split('/')[1],
        resourceName: customer.resourceName
      }));
    } catch (error) {
      console.error('Google Ads customers fetch failed:', error);
      throw new Error('Failed to fetch Google Ads customers');
    }
  }

  // OAuth flow helpers
  getAuthUrl(clientId: string, redirectUri: string, state: string): string {
    const scopes = [
      'https://www.googleapis.com/auth/adwords'
    ].join(' ');

    return `https://accounts.google.com/o/oauth2/v2/auth?` +
           `client_id=${clientId}&` +
           `redirect_uri=${encodeURIComponent(redirectUri)}&` +
           `scope=${encodeURIComponent(scopes)}&` +
           `response_type=code&` +
           `access_type=offline&` +
           `prompt=consent&` +
           `state=${state}`;
  }

  async exchangeCodeForToken(code: string, clientId: string, clientSecret: string, redirectUri: string): Promise<any> {
    try {
      const oauth2Client = new google.auth.OAuth2(
        clientId,
        clientSecret,
        redirectUri
      );

      const { tokens } = await oauth2Client.getToken(code);
      return tokens;
    } catch (error) {
      console.error('Google Ads token exchange failed:', error);
      throw new Error('Failed to exchange Google Ads code for token');
    }
  }

  async refreshToken(tenantId: string): Promise<string> {
    const credentials = await this.getCredentials(tenantId);
    if (!credentials) throw new Error('Google Ads credentials not found');

    try {
      const tempClient = new google.auth.OAuth2(
        credentials.clientId,
        credentials.clientSecret
      );

      tempClient.setCredentials({
        refresh_token: credentials.refreshToken
      });

      const { credentials: newCreds } = await tempClient.refreshAccessToken();
      
      // Update credentials in database
      await prisma.integration.updateMany({
        where: { tenantId, provider: 'googleads' },
        data: { 
          config: { ...credentials, refreshToken: newCreds.refresh_token }
        }
      });

      return newCreds.access_token || '';
    } catch (error) {
      console.error('Google Ads token refresh failed:', error);
      throw new Error('Failed to refresh Google Ads token');
    }
  }
}

export const googleAdsService = new GoogleAdsService();
