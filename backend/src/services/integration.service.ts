import { prisma } from '../utils/prisma';
import { facebookService } from './facebook.service';
import { googleAdsService } from './googleads.service';
import { lineService } from './line.service';
import { tiktokService } from './tiktok.service';
import { shopeeService } from './shopee.service';

export interface PlatformConfig {
  facebook?: {
    accessToken: string;
    accountId: string;
    appId: string;
    appSecret: string;
  };
  googleads?: {
    clientId: string;
    clientSecret: string;
    refreshToken: string;
    developerToken: string;
    customerId: string;
  };
  line?: {
    channelId: string;
    channelSecret: string;
    accessToken: string;
    webhookUrl?: string;
  };
  tiktok?: {
    appId: string;
    appSecret: string;
    accessToken: string;
    advertiserId?: string;
    refreshToken?: string;
  };
  shopee?: {
    partnerId: number;
    partnerKey: string;
    shopId: number;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}

export interface SyncResult {
  platform: string;
  success: boolean;
  data?: any;
  error?: string;
  timestamp: Date;
}

export interface WebhookEvent {
  platform: string;
  type: string;
  data: any;
  signature?: string;
  timestamp: Date;
}

class IntegrationService {
  private platforms = {
    facebook: facebookService,
    googleads: googleAdsService,
    line: lineService,
    tiktok: tiktokService,
    shopee: shopeeService
  };

  async getActiveIntegrations(tenantId: string): Promise<string[]> {
    const integrations = await prisma.integration.findMany({
      where: { 
        tenantId, 
        isActive: true 
      },
      select: { provider: true }
    });

    return integrations.map(integration => integration.provider);
  }

  async validatePlatformCredentials(platform: string, credentials: any): Promise<boolean> {
    try {
      const service = this.platforms[platform as keyof typeof this.platforms];
      if (!service) {
        throw new Error(`Platform ${platform} not supported`);
      }

      return await service.validateCredentials(credentials);
    } catch (error) {
      console.error(`Validation failed for ${platform}:`, error);
      return false;
    }
  }

  async syncAllPlatforms(tenantId: string, dateRange?: { start: string; end: string }): Promise<SyncResult[]> {
    const activePlatforms = await this.getActiveIntegrations(tenantId);
    const results: SyncResult[] = [];

    for (const platform of activePlatforms) {
      try {
        const result = await this.syncPlatform(tenantId, platform, dateRange);
        results.push(result);
      } catch (error) {
        results.push({
          platform,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date()
        });
      }
    }

    return results;
  }

  async syncPlatform(tenantId: string, platform: string, dateRange?: { start: string; end: string }): Promise<SyncResult> {
    try {
      const service = this.platforms[platform as keyof typeof this.platforms];
      if (!service) {
        throw new Error(`Platform ${platform} not supported`);
      }

      let data: any = {};

      switch (platform) {
        case 'facebook':
          data = {
            campaigns: await (service as any).getCampaigns(tenantId, dateRange),
            insights: await (service as any).getInsights(tenantId, undefined, dateRange)
          };
          break;

        case 'googleads':
          data = {
            campaigns: await (service as any).getCampaigns(tenantId, dateRange),
            insights: await (service as any).getInsights(tenantId, dateRange)
          };
          break;

        case 'line':
          data = {
            userStats: await (service as any).getUserStats(tenantId),
            messageStats: dateRange 
              ? await (service as any).getMessageStats(tenantId, dateRange.start, dateRange.end)
              : []
          };
          break;

        case 'tiktok':
          data = {
            campaigns: await (service as any).getCampaigns(tenantId, dateRange),
            insights: await (service as any).getInsights(tenantId, dateRange)
          };
          break;

        case 'shopee':
          data = {
            orders: await (service as any).getOrders(tenantId, dateRange),
            products: await (service as any).getProducts(tenantId),
            shopMetrics: await (service as any).getShopMetrics(tenantId)
          };
          break;

        default:
          throw new Error(`Unknown platform: ${platform}`);
      }

      // Store sync history
      await this.storeSyncHistory(tenantId, platform, data);

      return {
        platform,
        success: true,
        data,
        timestamp: new Date()
      };
    } catch (error) {
      console.error(`Sync failed for ${platform}:`, error);
      return {
        platform,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date()
      };
    }
  }

  async refreshToken(platform: string, tenantId: string): Promise<string> {
    try {
      const service = this.platforms[platform as keyof typeof this.platforms];
      if (!service) {
        throw new Error(`Platform ${platform} not supported`);
      }

      return await service.refreshToken(tenantId);
    } catch (error) {
      console.error(`Token refresh failed for ${platform}:`, error);
      throw error;
    }
  }

  async getOAuthUrl(platform: string, config: any, redirectUri: string, state: string): Promise<string> {
    try {
      const service = this.platforms[platform as keyof typeof this.platforms];
      if (!service) {
        throw new Error(`Platform ${platform} not supported`);
      }

      switch (platform) {
        case 'facebook':
          return (service as any).getAuthUrl(config.appId, redirectUri, state);
        
        case 'googleads':
          return (service as any).getAuthUrl(config.clientId, redirectUri, state);
        
        case 'line':
          return (service as any).getAuthUrl(config.channelId, redirectUri, state);
        
        case 'tiktok':
          return (service as any).getAuthUrl(config.appId, redirectUri, state);
        
        case 'shopee':
          return (service as any).getAuthUrl(config.partnerId, redirectUri, state);
        
        default:
          throw new Error(`OAuth not implemented for platform: ${platform}`);
      }
    } catch (error) {
      console.error(`OAuth URL generation failed for ${platform}:`, error);
      throw error;
    }
  }

  async exchangeCodeForToken(platform: string, code: string, config: any, redirectUri?: string): Promise<any> {
    try {
      const service = this.platforms[platform as keyof typeof this.platforms];
      if (!service) {
        throw new Error(`Platform ${platform} not supported`);
      }

      switch (platform) {
        case 'facebook':
          return (service as any).exchangeCodeForToken(code, config.appId, config.appSecret, redirectUri!);
        
        case 'googleads':
          return (service as any).exchangeCodeForToken(code, config.clientId, config.clientSecret, redirectUri!);
        
        case 'line':
          return (service as any).exchangeCodeForToken(code, config.channelId, config.channelSecret, redirectUri!);
        
        case 'tiktok':
          return (service as any).exchangeCodeForToken(code, config.appId, config.appSecret);
        
        case 'shopee':
          return (service as any).exchangeCodeForToken(code, config.shopId, config.partnerId, config.partnerKey);
        
        default:
          throw new Error(`Token exchange not implemented for platform: ${platform}`);
      }
    } catch (error) {
      console.error(`Token exchange failed for ${platform}:`, error);
      throw error;
    }
  }

  async processWebhook(platform: string, event: WebhookEvent): Promise<void> {
    try {
      // Validate webhook signature if provided
      if (event.signature) {
        const isValid = await this.validateWebhookSignature(platform, event);
        if (!isValid) {
          throw new Error('Invalid webhook signature');
        }
      }

      // Store webhook event
      await this.storeWebhookEvent(platform, event);

      // Process platform-specific webhook logic
      switch (platform) {
        case 'facebook':
          await this.processFacebookWebhook(event);
          break;
        
        case 'line':
          await this.processLINEWebhook(event);
          break;
        
        case 'tiktok':
          await this.processTikTokWebhook(event);
          break;
        
        case 'shopee':
          await this.processShopeeWebhook(event);
          break;
        
        default:
          console.log(`Webhook processing not implemented for platform: ${platform}`);
      }
    } catch (error) {
      console.error(`Webhook processing failed for ${platform}:`, error);
      throw error;
    }
  }

  private async validateWebhookSignature(platform: string, event: WebhookEvent): Promise<boolean> {
    try {
      switch (platform) {
        case 'line':
          const integration = await prisma.integration.findFirst({
            where: { provider: 'line', isActive: true }
          });
          if (integration) {
            const credentials = integration.config as any;
            return lineService.validateSignature(
              JSON.stringify(event.data),
              event.signature!,
              credentials.channelSecret
            );
          }
          return false;
        
        default:
          return true; // No validation for other platforms
      }
    } catch (error) {
      console.error(`Webhook signature validation failed for ${platform}:`, error);
      return false;
    }
  }

  private async storeSyncHistory(tenantId: string, platform: string, data: any): Promise<void> {
    try {
      await prisma.syncHistory.create({
        data: {
          tenantId,
          platform,
          status: 'success',
          data: JSON.stringify(data),
          syncedAt: new Date()
        }
      });
    } catch (error) {
      console.error('Failed to store sync history:', error);
    }
  }

  private async storeWebhookEvent(tenantId: string, event: any): Promise<void> {
    try {
      await prisma.webhookEvent.create({
        data: {
          tenantId,
          platform: event.platform,
          type: event.type,
          data: JSON.stringify(event.data),
          signature: event.signature,
          receivedAt: event.timestamp
        }
      });
    } catch (error) {
      console.error('Failed to store webhook event:', error);
    }
  }

  private async processFacebookWebhook(event: WebhookEvent): Promise<void> {
    // Implement Facebook webhook processing logic
    console.log('Processing Facebook webhook:', event.type, event.data);
  }

  private async processLINEWebhook(event: WebhookEvent): Promise<void> {
    // Implement LINE webhook processing logic
    console.log('Processing LINE webhook:', event.type, event.data);
  }

  private async processTikTokWebhook(event: WebhookEvent): Promise<void> {
    // Implement TikTok webhook processing logic
    console.log('Processing TikTok webhook:', event.type, event.data);
  }

  private async processShopeeWebhook(event: WebhookEvent): Promise<void> {
    // Implement Shopee webhook processing logic
    console.log('Processing Shopee webhook:', event.type, event.data);
  }

  async getPlatformMetrics(tenantId: string, platform: string, dateRange?: { start: string; end: string }): Promise<any> {
    try {
      const service = this.platforms[platform as keyof typeof this.platforms];
      if (!service) {
        throw new Error(`Platform ${platform} not supported`);
      }

      switch (platform) {
        case 'facebook':
          return {
            campaigns: await (service as any).getCampaigns(tenantId, dateRange),
            insights: await (service as any).getInsights(tenantId, undefined, dateRange)
          };
        
        case 'googleads':
          return {
            campaigns: await (service as any).getCampaigns(tenantId, dateRange),
            insights: await (service as any).getInsights(tenantId, dateRange)
          };
        
        case 'line':
          return {
            userStats: await (service as any).getUserStats(tenantId),
            messageStats: dateRange 
              ? await (service as any).getMessageStats(tenantId, dateRange.start, dateRange.end)
              : []
          };
        
        case 'tiktok':
          return {
            campaigns: await (service as any).getCampaigns(tenantId, dateRange),
            insights: await (service as any).getInsights(tenantId, dateRange)
          };
        
        case 'shopee':
          return {
            orders: await (service as any).getOrders(tenantId, dateRange),
            products: await (service as any).getProducts(tenantId),
            shopMetrics: await (service as any).getShopMetrics(tenantId)
          };
        
        default:
          throw new Error(`Metrics not implemented for platform: ${platform}`);
      }
    } catch (error) {
      console.error(`Failed to get metrics for ${platform}:`, error);
      throw error;
    }
  }
}

export const integrationService = new IntegrationService();
