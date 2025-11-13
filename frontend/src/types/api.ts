export interface Metric {
  id: string;
  tenantId: string;
  campaignId: string | null;
  date: string;
  hour: number | null;
  platform: string;
  source: string;
  impressions?: number;
  clicks?: number;
  conversions?: number;
  spend?: string | null;
  organicTraffic?: number;
  bounceRate?: string;
  avgSessionDuration?: number;
  revenue?: string;
  orders?: number;
  metadata?: any;
  createdAt: string;
  updatedAt: string;
  campaign?: {
    id: string;
    name: string;
    platform: string;
  };
}

export interface Campaign {
  id: string;
  tenantId: string;
  integrationId: string;
  externalId: string;
  name: string;
  platform: string;
  status: string;
  objective?: string;
  budget?: string;
  budgetType?: string;
  currency?: string;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
  metrics?: Metric[];
}

export interface Integration {
  id: string;
  tenantId: string;
  type: string;
  provider: string;
  name: string;
  credentials: any;
  config: any;
  status: string;
  isActive: boolean;
  lastSyncAt?: string;
  syncFrequencyMinutes: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    tenantId: string;
    role: string;
  };
}

export interface WebhookEvent {
  id: string;
  tenantId: string;
  platform: string;
  type: string;
  data: any;
  signature?: string;
  receivedAt: string;
}

export interface OAuthState {
  id: string;
  integrationId?: string;
  state: string;
  redirectUri: string;
  expiresAt: string;
}

export interface SyncHistory {
  id: string;
  tenantId: string;
  integrationId?: string;
  platform: string;
  status: string;
  data?: any;
  error?: string;
  syncedAt: string;
}

export interface OAuthStatus {
  isConnected: boolean;
  lastSync?: string;
  expiresAt?: string;
  canRefresh: boolean;
}
