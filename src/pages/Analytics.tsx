
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { BarChart3, PieChart as PieChartIcon, TrendingUp } from 'lucide-react';
import ModelFeatureImportance from '@/components/analytics/ModelFeatureImportance';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// Mock data for charts
const monthlySpending = [
  { month: 'Jan', amount: 4000 },
  { month: 'Feb', amount: 3000 },
  { month: 'Mar', amount: 2000 },
  { month: 'Apr', amount: 2780 },
  { month: 'May', amount: 1890 },
  { month: 'Jun', amount: 2390 },
];

const expenseCategories = [
  { name: 'Utilities', value: 400 },
  { name: 'Rent', value: 1200 },
  { name: 'Supplies', value: 300 },
  { name: 'Marketing', value: 200 },
  { name: 'Salaries', value: 900 },
];

const cashFlowData = [
  { month: 'Jan', income: 5000, expenses: 4000 },
  { month: 'Feb', income: 4800, expenses: 3000 },
  { month: 'Mar', income: 5200, expenses: 2000 },
  { month: 'Apr', income: 5500, expenses: 2780 },
  { month: 'May', income: 4900, expenses: 1890 },
  { month: 'Jun', income: 6000, expenses: 2390 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Analytics: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Financial Analytics</h1>
        <p className="text-muted-foreground">
          Analyze your business performance and financial patterns
        </p>
      </div>

      <Tabs defaultValue="charts" className="w-full">
        <TabsList className="mb-4 bg-gray-100 p-1 rounded-lg shadow-inner">
          <TabsTrigger value="charts" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md">
            <BarChart3 size={16} />
            <span>Financial Charts</span>
          </TabsTrigger>
          <TabsTrigger value="ml-insights" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md">
            <TrendingUp size={16} />
            <span>ML Insights</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="charts">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Spending Chart */}
            <Card className="bg-white bg-opacity-95 backdrop-blur-sm shadow-md">
              <CardHeader className="pb-0">
                <CardTitle className="flex items-center text-lg font-medium">
                  <BarChart3 className="h-5 w-5 mr-2 text-bizblue-600" />
                  Monthly Spending
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlySpending}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="amount" fill="#0078c3" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Expense Categories Pie Chart */}
            <Card className="bg-white bg-opacity-95 backdrop-blur-sm shadow-md">
              <CardHeader className="pb-0">
                <CardTitle className="flex items-center text-lg font-medium">
                  <PieChartIcon className="h-5 w-5 mr-2 text-bizblue-600" />
                  Expense Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expenseCategories}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={90}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {expenseCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${value}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Cash Flow Trend Chart */}
            <Card className="col-span-1 lg:col-span-2 bg-white bg-opacity-95 backdrop-blur-sm shadow-md">
              <CardHeader className="pb-0">
                <CardTitle className="flex items-center text-lg font-medium">
                  <TrendingUp className="h-5 w-5 mr-2 text-bizblue-600" />
                  Cash Flow Trend
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={cashFlowData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${value}`} />
                      <Line 
                        type="monotone" 
                        dataKey="income" 
                        stroke="#00C49F" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="expenses" 
                        stroke="#FF8042" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="ml-insights">
          <div className="grid grid-cols-1 gap-6">
            {/* ML Feature Importance */}
            <Card className="bg-white bg-opacity-95 backdrop-blur-sm shadow-md">
              <CardHeader>
                <CardTitle>ML Model Feature Importance</CardTitle>
              </CardHeader>
              <CardContent>
                <ModelFeatureImportance />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
