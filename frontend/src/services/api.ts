import axios from 'axios';
import { Metric, Campaign, Integration, AuthResponse, WebhookEvent, OAuthStatus, SyncHistory } from '../types/api';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3001/api/v1';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('token');
  const tenantId = localStorage.getItem('tenantId');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (tenantId) {
    config.headers['X-Tenant-Id'] = tenantId;
  }
  return config;
});

// Auth
export const login = async (email: string, password: string, tenantId: string): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', { email, password, tenantId });
  const data = response.data;
  localStorage.setItem('token', data.token);
  localStorage.setItem('tenantId', tenantId);
  return data;
};

export const register = async (email: string, password: string, firstName: string, lastName: string, tenantId: string, role?: string): Promise<AuthResponse> => {
  const response = await api.post('/auth/register', { email, password, firstName, lastName, tenantId, role });
  const data = response.data;
  localStorage.setItem('token', data.token);
  localStorage.setItem('tenantId', tenantId);
  return data;
};

export const forgotPassword = async (email: string): Promise<any> => {
  const response = await api.post('/auth/forgot-password', { email });
  return response.data;
};

export const resetPassword = async (token: string, newPassword: string): Promise<any> => {
  const response = await api.post('/auth/reset-password', { token, newPassword });
  return response.data;
};

// Integrations
export const getIntegrations = async (): Promise<Integration[]> => {
  const response = await api.get('/integrations');
  return response.data.integrations;
};

export const getIntegration = async (id: string): Promise<Integration> => {
  const response = await api.get(`/integrations/${id}`);
  return response.data.integration;
};

export const createIntegration = async (integration: Partial<Integration>): Promise<Integration> => {
  const response = await api.post('/integrations', integration);
  return response.data.integration;
};

export const updateIntegration = async (id: string, integration: Partial<Integration>): Promise<Integration> => {
  const response = await api.put(`/integrations/${id}`, integration);
  return response.data.integration;
};

export const deleteIntegration = async (id: string): Promise<void> => {
  await api.delete(`/integrations/${id}`);
};

export const syncIntegration = async (id: string): Promise<any> => {
  const response = await api.post(`/integrations/${id}/sync`);
  return response.data;
};

export const testIntegration = async (id: string): Promise<any> => {
  const response = await api.post(`/integrations/${id}/test`);
  return response.data;
};

// OAuth
export const startOAuth = async (id: string, redirectUri: string): Promise<any> => {
  const response = await api.post(`/integrations/${id}/oauth/start`, { redirectUri });
  return response.data;
};

export const handleOAuthCallback = async (id: string, code: string, state: string): Promise<any> => {
  const response = await api.get(`/integrations/${id}/oauth/callback?code=${code}&state=${state}`);
  return response.data;
};

export const refreshOAuthToken = async (id: string): Promise<any> => {
  const response = await api.post(`/integrations/${id}/oauth/refresh`);
  return response.data;
};

export const getOAuthStatus = async (id: string): Promise<OAuthStatus> => {
  const response = await api.get(`/integrations/${id}/oauth/status`);
  return response.data;
};

export const revokeOAuthAccess = async (id: string): Promise<any> => {
  const response = await api.post(`/integrations/${id}/oauth/revoke`);
  return response.data;
};

// Data
export const getFacebookData = async (type: string, dateFrom?: string, dateTo?: string): Promise<any> => {
  const params = new URLSearchParams({ type });
  if (dateFrom) params.append('dateFrom', dateFrom);
  if (dateTo) params.append('dateTo', dateTo);
  const response = await api.get(`/data/facebook?${params}`);
  return response.data.data;
};

export const getGoogleAdsData = async (type: string, dateFrom?: string, dateTo?: string): Promise<any> => {
  const params = new URLSearchParams({ type });
  if (dateFrom) params.append('dateFrom', dateFrom);
  if (dateTo) params.append('dateTo', dateTo);
  const response = await api.get(`/data/googleads?${params}`);
  return response.data.data;
};

export const getLINEData = async (type: string, dateFrom?: string, dateTo?: string, userId?: string): Promise<any> => {
  const params = new URLSearchParams({ type });
  if (dateFrom) params.append('dateFrom', dateFrom);
  if (dateTo) params.append('dateTo', dateTo);
  if (userId) params.append('userId', userId);
  const response = await api.get(`/data/line?${params}`);
  return response.data.data;
};

export const getTikTokData = async (type: string, dateFrom?: string, dateTo?: string): Promise<any> => {
  const params = new URLSearchParams({ type });
  if (dateFrom) params.append('dateFrom', dateFrom);
  if (dateTo) params.append('dateTo', dateTo);
  const response = await api.get(`/data/tiktok?${params}`);
  return response.data.data;
};

export const getShopeeData = async (type: string, dateFrom?: string, dateTo?: string): Promise<any> => {
  const params = new URLSearchParams({ type });
  if (dateFrom) params.append('dateFrom', dateFrom);
  if (dateTo) params.append('dateTo', dateTo);
  const response = await api.get(`/data/shopee?${params}`);
  return response.data.data;
};

export const getAllData = async (dateFrom?: string, dateTo?: string): Promise<any> => {
  const params = new URLSearchParams();
  if (dateFrom) params.append('dateFrom', dateFrom);
  if (dateTo) params.append('dateTo', dateTo);
  const response = await api.get(`/data/all?${params}`);
  return response.data.data;
};

// Mock Data
export const generateMockData = async (providers: string[] = ['ga4', 'facebook'], lookbackDays: number = 30) => {
  const response = await api.post('/mock/generate', { providers, lookbackDays });
  return response.data;
};

export const getMockMetrics = async (filters?: {
  startDate?: string;
  endDate?: string;
  platform?: string;
}): Promise<{ metrics: Metric[] }> => {
  const response = await api.get('/mock/metrics', { params: filters });
  return response.data;
};

export const getMockCampaigns = async (platform?: string): Promise<{ campaigns: Campaign[] }> => {
  const response = await api.get('/mock/campaigns', { params: { platform } });
  return response.data;
};

// Webhook Events
export const getWebhookEvents = async (filters?: {
  platform?: string;
  type?: string;
  limit?: number;
  offset?: number;
}): Promise<{ events: WebhookEvent[]; total: number }> => {
  const response = await api.get('/webhooks/events', { params: filters });
  return response.data;
};

export const replayWebhookEvent = async (id: string): Promise<any> => {
  const response = await api.post(`/webhooks/events/${id}/replay`);
  return response.data;
};

export const deleteWebhookEvent = async (id: string): Promise<void> => {
  await api.delete(`/webhooks/events/${id}`);
};

export const validateWebhookSignature = async (platform: string, payload: any, signature: string): Promise<{ isValid: boolean }> => {
  const response = await api.post('/webhooks/validate', { platform, payload, signature });
  return response.data;
};

// Sync History
export const getSyncHistory = async (filters?: {
  platform?: string;
  status?: string;
  limit?: number;
  offset?: number;
}): Promise<{ histories: SyncHistory[]; total: number }> => {
  const response = await api.get('/integrations/sync-history', { params: filters });
  return response.data;
};

// Platform-specific OAuth URLs
export const getPlatformOAuthUrl = (platform: string, integrationId: string): string => {
  const baseUrl = window.location.origin;
  const redirectUri = `${baseUrl}/oauth/callback`;
  return `${API_BASE}/integrations/${integrationId}/oauth/start?redirectUri=${encodeURIComponent(redirectUri)}`;
};

// Google OAuth Functions
export const initiateGoogleAuth = (tenantId: string, returnUrl: string = '/dashboard'): string => {
  return `${API_BASE}/auth/google?tenantId=${encodeURIComponent(tenantId)}&returnUrl=${encodeURIComponent(returnUrl)}`;
};

export const exchangeGoogleToken = async (code: string, tenantId: string): Promise<any> => {
  const response = await api.post('/auth/google/token', { code, tenantId });
  return response.data;
};

export const refreshGoogleToken = async (refreshToken: string): Promise<any> => {
  const response = await api.post('/auth/google/refresh', { refreshToken });
  return response.data;
};

export const revokeGoogleAccess = async (): Promise<any> => {
  const response = await api.delete('/auth/google/revoke');
  return response.data;
};

export const getGoogleCalendarEvents = async (maxResults: number = 10): Promise<any> => {
  const response = await api.get(`/auth/google/calendar?maxResults=${maxResults}`);
  return response.data;
};

export const getGoogleDriveFiles = async (maxResults: number = 10): Promise<any> => {
  const response = await api.get(`/auth/google/drive?maxResults=${maxResults}`);
  return response.data;
};

export default api;
