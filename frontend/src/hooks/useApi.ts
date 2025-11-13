import { useState, useEffect } from 'react';
import { getMockMetrics, getMockCampaigns, generateMockData } from '../services/api';
import { Metric, Campaign } from '../types/api';

export const useMetrics = (filters?: {
  startDate?: string;
  endDate?: string;
  platform?: string;
}) => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getMockMetrics(filters);
      setMetrics(response.metrics);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch metrics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, [JSON.stringify(filters)]);

  return { metrics, loading, error, refetch: fetchMetrics };
};

export const useCampaigns = (platform?: string) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getMockCampaigns(platform);
      setCampaigns(response.campaigns);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch campaigns');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [platform]);

  return { campaigns, loading, error, refetch: fetchCampaigns };
};

export const useMockData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateData = async (providers: string[] = ['ga4', 'facebook'], lookbackDays: number = 30) => {
    setLoading(true);
    setError(null);
    try {
      const response = await generateMockData(providers, lookbackDays);
      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to generate mock data');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { generateData, loading, error };
};
