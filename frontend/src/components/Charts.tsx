import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Metric } from '../types/api';
import { format } from 'date-fns';

interface MetricsChartProps {
  metrics: Metric[];
  metric: keyof Metric;
  title: string;
  color?: string;
}

export const MetricsLineChart: React.FC<MetricsChartProps> = ({ metrics, metric, title, color = '#3b82f6' }) => {
  const data = metrics
    .filter(m => m[metric] !== undefined && m[metric] !== null)
    .map(m => ({
      date: format(new Date(m.date), 'MMM dd'),
      value: typeof m[metric] === 'string' ? parseFloat(m[metric]!) : m[metric],
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke={color} name={title} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const MetricsBarChart: React.FC<MetricsChartProps> = ({ metrics, metric, title, color = '#10b981' }) => {
  const data = metrics
    .filter(m => m[metric] !== undefined && m[metric] !== null)
    .map(m => ({
      date: format(new Date(m.date), 'MMM dd'),
      value: typeof m[metric] === 'string' ? parseFloat(m[metric]!) : m[metric],
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill={color} name={title} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

interface PlatformPieChartProps {
  metrics: Metric[];
  title: string;
}

export const PlatformPieChart: React.FC<PlatformPieChartProps> = ({ metrics, title }) => {
  const platformData = metrics.reduce((acc, metric) => {
    const platform = metric.platform;
    const revenue = typeof metric.revenue === 'string' ? parseFloat(metric.revenue) : (metric.revenue || 0);
    acc[platform] = (acc[platform] || 0) + revenue;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(platformData).map(([platform, revenue]) => ({
    name: platform.toUpperCase(),
    value: revenue,
  }));

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `฿${value.toFixed(2)}`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
