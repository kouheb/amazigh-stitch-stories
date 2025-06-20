
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

export interface DashboardStat {
  title: string;
  value: string;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon: any;
  color: string;
}

// Mock data generator for demonstration
const generateMockStats = (): Omit<DashboardStat, 'title' | 'icon' | 'color'>[] => {
  const baseStats = [
    { value: Math.floor(Math.random() * 2000 + 1000).toString() },
    { value: Math.floor(Math.random() * 150 + 50).toString() },
    { value: Math.floor(Math.random() * 30 + 5).toString() },
    { value: Math.floor(Math.random() * 20 + 1).toString() }
  ];

  return baseStats.map(stat => ({
    ...stat,
    change: `+${Math.floor(Math.random() * 20 + 1)}%`,
    changeType: Math.random() > 0.2 ? 'increase' : 'decrease' as const
  }));
};

// Simulated API call
const fetchDashboardStats = async (): Promise<Omit<DashboardStat, 'title' | 'icon' | 'color'>[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  
  // Simulate occasional errors (10% chance)
  if (Math.random() < 0.1) {
    throw new Error('Failed to fetch dashboard statistics');
  }
  
  return generateMockStats();
};

export const useDashboardStats = () => {
  const [mockData, setMockData] = useState(generateMockStats());

  // Update mock data every 30 seconds for demo purposes
  useEffect(() => {
    const interval = setInterval(() => {
      setMockData(generateMockStats());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // React Query for real data fetching
  const {
    data: realData,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    retry: 3,
    staleTime: 2 * 60 * 1000, // Consider data stale after 2 minutes
  });

  return {
    // Use real data if available, otherwise fall back to mock data
    stats: realData || mockData,
    isLoading,
    error,
    refetch,
    // For development, you can toggle between mock and real data
    useMockData: !realData
  };
};
