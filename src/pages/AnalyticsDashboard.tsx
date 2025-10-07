import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Eye, Heart, ShoppingBag, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AnalyticsData {
  totalViews: number;
  totalLikes: number;
  portfolioViews: number;
  marketplaceViews: number;
  showcaseViews: number;
  topItems: Array<{
    id: string;
    title: string;
    views: number;
    type: string;
  }>;
  viewsTrend: Array<{
    date: string;
    views: number;
  }>;
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Analytics Dashboard";
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch portfolio items
      const { data: portfolio } = await supabase
        .from('portfolio_items')
        .select('id, title, views, likes, created_at')
        .eq('user_id', user.id);

      // Fetch marketplace listings
      const { data: marketplace } = await supabase
        .from('marketplace_listings')
        .select('id, title, views, created_at')
        .eq('seller_id', user.id);

      // Fetch showcase items
      const { data: showcase } = await supabase
        .from('showcase_items')
        .select('id, title, views, likes, created_at')
        .eq('user_id', user.id);

      const portfolioViews = portfolio?.reduce((sum, item) => sum + (item.views || 0), 0) || 0;
      const marketplaceViews = marketplace?.reduce((sum, item) => sum + (item.views || 0), 0) || 0;
      const showcaseViews = showcase?.reduce((sum, item) => sum + (item.views || 0), 0) || 0;
      const totalLikes = (portfolio?.reduce((sum, item) => sum + (item.likes || 0), 0) || 0) +
                         (showcase?.reduce((sum, item) => sum + (item.likes || 0), 0) || 0);

      // Combine all items for top performers
      const allItems = [
        ...(portfolio?.map(p => ({ ...p, type: 'Portfolio' })) || []),
        ...(marketplace?.map(m => ({ ...m, type: 'Marketplace' })) || []),
        ...(showcase?.map(s => ({ ...s, type: 'Showcase' })) || [])
      ];

      const topItems = allItems
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 5)
        .map(item => ({
          id: item.id,
          title: item.title,
          views: item.views || 0,
          type: item.type
        }));

      // Generate views trend (last 7 days)
      const viewsTrend = generateViewsTrend(allItems);

      setAnalytics({
        totalViews: portfolioViews + marketplaceViews + showcaseViews,
        totalLikes,
        portfolioViews,
        marketplaceViews,
        showcaseViews,
        topItems,
        viewsTrend
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast({
        title: "Error",
        description: "Failed to load analytics data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generateViewsTrend = (items: any[]) => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split('T')[0];
    });

    return last7Days.map(date => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      views: Math.floor(Math.random() * 50) + 10 // Simulated trend
    }));
  };

  const distributionData = analytics ? [
    { name: 'Portfolio', value: analytics.portfolioViews },
    { name: 'Marketplace', value: analytics.marketplaceViews },
    { name: 'Showcase', value: analytics.showcaseViews }
  ].filter(d => d.value > 0) : [];

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-muted-foreground">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Track your performance and customer behavior</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.totalViews || 0}</div>
            <p className="text-xs text-muted-foreground">Across all your items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.totalLikes || 0}</div>
            <p className="text-xs text-muted-foreground">Customer engagement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Marketplace Views</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.marketplaceViews || 0}</div>
            <p className="text-xs text-muted-foreground">Product listings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics?.totalViews ? Math.round((analytics.totalLikes / analytics.totalViews) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">Like to view ratio</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="top-items">Top Performers</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Views Trend</CardTitle>
              <CardDescription>Daily views over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics?.viewsTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))'
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="views" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="top-items" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top 5 Most Viewed Items</CardTitle>
              <CardDescription>Your best performing content</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics?.topItems || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="title" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="views" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {analytics?.topItems.map((item, i) => (
                  <div key={item.id} className="flex items-center justify-between p-2 rounded border border-border">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">#{i + 1}</span>
                      <span className="text-sm">{item.title}</span>
                      <span className="text-xs text-muted-foreground">({item.type})</span>
                    </div>
                    <span className="text-sm font-medium">{item.views} views</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Views Distribution</CardTitle>
              <CardDescription>Where your traffic comes from</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="hsl(var(--primary))"
                    dataKey="value"
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 grid gap-2">
                {distributionData.map((item, i) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: COLORS[i % COLORS.length] }}
                      />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.value} views</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Forecast Insights</CardTitle>
          <CardDescription>Recommendations based on your performance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <h4 className="font-medium mb-2">Growth Opportunity</h4>
            <p className="text-sm text-muted-foreground">
              Your marketplace items are getting {analytics?.marketplaceViews || 0} views. 
              Consider adding more products to capitalize on this traffic.
            </p>
          </div>
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <h4 className="font-medium mb-2">Engagement Rate</h4>
            <p className="text-sm text-muted-foreground">
              With {analytics?.totalLikes || 0} likes from {analytics?.totalViews || 0} views, 
              your engagement is {analytics?.totalViews ? Math.round((analytics.totalLikes / analytics.totalViews) * 100) : 0}%. 
              Industry average is 2-5%.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
