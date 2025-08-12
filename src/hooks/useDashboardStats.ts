
import { useQuery } from '@tanstack/react-query';

export interface DashboardStat {
  title: string;
  value: string;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon: any;
  color: string;
}

// Production-safe: no mock data generation. Provide an empty default and rely on real sources when available.
const fetchDashboardStats = async (): Promise<Omit<DashboardStat, 'title' | 'icon' | 'color'>[]> => {
  // TODO: Replace with a real API/source when ready. Returning empty ensures no fake data appears.
  return [];
};

export const useDashboardStats = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats,
    refetchInterval: false,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  return {
    stats: data || [],
    isLoading,
    error,
    refetch,
    useMockData: false,
  };
};
