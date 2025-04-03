
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface FeatureImportance {
  feature: string;
  importance: number;
  category: string;
}

const ModelFeatureImportance: React.FC = () => {
  // Sample feature importance data (would come from the ML model in production)
  const featureData: FeatureImportance[] = [
    { feature: "Payment History", importance: 0.28, category: "Bills" },
    { feature: "Cash Flow", importance: 0.23, category: "Bank" },
    { feature: "Income Stability", importance: 0.18, category: "Bank" },
    { feature: "Transaction Volume", importance: 0.12, category: "Wallet" },
    { feature: "Bill Amount Ratio", importance: 0.10, category: "Bills" },
    { feature: "Payment Frequency", importance: 0.09, category: "Wallet" },
  ];
  
  // Format data for the chart
  const chartData = featureData.map(item => ({
    name: item.feature,
    value: item.importance * 100, // Convert to percentage
    category: item.category
  }));
  
  // Color mapping for different data categories
  const getCategoryColor = (category: string) => {
    switch(category) {
      case "Bills": return "#4f46e5";
      case "Bank": return "#059669";
      case "Wallet": return "#d97706";
      default: return "#6b7280";
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">ML Model Feature Importance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">
          This shows how each data feature influences your credit assessment score
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis type="number" tickFormatter={(value) => `${value}%`} />
              <YAxis type="category" dataKey="name" width={120} />
              <Tooltip
                formatter={(value: number) => [`${value.toFixed(1)}%`, 'Importance']}
                labelFormatter={(value) => `Feature: ${value}`}
              />
              <Bar 
                dataKey="value" 
                name="Importance" 
                fill={(data) => getCategoryColor(data.category)}
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 flex justify-center gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#4f46e5] mr-1"></div>
            <span className="text-xs">Utility Bills</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#059669] mr-1"></div>
            <span className="text-xs">Bank Transactions</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#d97706] mr-1"></div>
            <span className="text-xs">Wallet Activity</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelFeatureImportance;
