import React, { useState } from 'react';
import { useMetrics, useCampaigns, useMockData } from '../hooks/useApi';
import { MetricsLineChart, MetricsBarChart, PlatformPieChart } from './Charts';
import { MetricsTable, CampaignsTable } from './Tables';
import { 
  ChartBarIcon, 
  TableCellsIcon, 
  ArrowPathIcon,
  PlusCircleIcon 
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'charts' | 'tables'>('charts');
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  const [platform, setPlatform] = useState('');

  const { metrics, loading: metricsLoading, error: metricsError, refetch: refetchMetrics } = useMetrics({
    startDate: dateRange.startDate || undefined,
    endDate: dateRange.endDate || undefined,
    platform: platform || undefined,
  });

  const { campaigns, loading: campaignsLoading, error: campaignsError, refetch: refetchCampaigns } = useCampaigns(platform);
  const { generateData, loading: generateLoading } = useMockData();

  const handleGenerateData = async () => {
    try {
      await generateData(['ga4', 'facebook'], 30);
      refetchMetrics();
      refetchCampaigns();
    } catch (error) {
      console.error('Failed to generate mock data:', error);
    }
  };

  const handleRefresh = () => {
    refetchMetrics();
    refetchCampaigns();
  };

  if (metricsLoading || campaignsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (metricsError || campaignsError) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        <p className="font-medium">Error loading data</p>
        <p className="text-sm">{metricsError || campaignsError}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">RGA Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">Real-time Analytics Dashboard</p>
            </div>
            <div className="flex space-x-3">
              <Link 
                to="/integrations"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                Integrations
              </Link>
              <button
                onClick={handleGenerateData}
                disabled={generateLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50"
              >
                <PlusCircleIcon className="h-4 w-4 mr-2" />
                {generateLoading ? 'Generating...' : 'Generate Mock Data'}
              </button>
              <button
                onClick={handleRefresh}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <ArrowPathIcon className="h-4 w-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Platforms</option>
                <option value="ga4">GA4</option>
                <option value="facebook">Facebook</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('charts')}
              className={`${
                activeTab === 'charts'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center py-2 px-1 border-b-2 font-medium text-sm`}
            >
              <ChartBarIcon className="h-5 w-5 mr-2" />
              Charts
            </button>
            <button
              onClick={() => setActiveTab('tables')}
              className={`${
                activeTab === 'tables'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex items-center py-2 px-1 border-b-2 font-medium text-sm`}
            >
              <TableCellsIcon className="h-5 w-5 mr-2" />
              Tables
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {activeTab === 'charts' ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MetricsLineChart metrics={metrics} metric="organicTraffic" title="Organic Traffic" color="#3b82f6" />
              <MetricsBarChart metrics={metrics} metric="revenue" title="Revenue" color="#10b981" />
              <MetricsLineChart metrics={metrics} metric="clicks" title="Clicks" color="#f59e0b" />
              <MetricsBarChart metrics={metrics} metric="conversions" title="Conversions" color="#ef4444" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PlatformPieChart metrics={metrics} title="Revenue by Platform" />
              <MetricsLineChart metrics={metrics} metric="bounceRate" title="Bounce Rate (%)" color="#8b5cf6" />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <CampaignsTable campaigns={campaigns} />
            <MetricsTable metrics={metrics} />
          </div>
        )}
      </div>
    </div>
  );
};
