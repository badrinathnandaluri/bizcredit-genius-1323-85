
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FeatureImportance {
  feature: string;
  importance: number;
  category: string;
  description: string;
}

const ModelFeatureImportance: React.FC = () => {
  // LSTM model feature importance data (would come from the actual ML model in production)
  const lstmFeatureData: FeatureImportance[] = [
    { 
      feature: "Payment History", 
      importance: 0.28, 
      category: "Bills",
      description: "Analyzes if utility bill payments were made before the 15th of each month"
    },
    { 
      feature: "Cash Flow Stability", 
      importance: 0.23, 
      category: "Bank",
      description: "Measures consistency of income deposits over time using sequential analysis"
    },
    { 
      feature: "Income Consistency", 
      importance: 0.18, 
      category: "Bank",
      description: "LSTM tracks patterns in income frequency and amount variations"
    },
    { 
      feature: "Transaction Frequency", 
      importance: 0.12, 
      category: "Wallet",
      description: "Analyzes digital spending patterns and transaction cadence"
    },
    { 
      feature: "Bill-to-Income Ratio", 
      importance: 0.10, 
      category: "Bills",
      description: "Compares utility expense totals against monthly income"
    },
    { 
      feature: "Payment Timing", 
      importance: 0.09, 
      category: "Wallet",
      description: "LSTM analysis of payment scheduling behavior over time"
    },
  ];
  
  // Reinforcement Learning model feature importance data
  const rlFeatureData: FeatureImportance[] = [
    { 
      feature: "Default Probability", 
      importance: 0.32, 
      category: "Risk",
      description: "Output from LSTM model feeding into the RL reward function"
    },
    { 
      feature: "Market Interest Rate", 
      importance: 0.22, 
      category: "Market",
      description: "External factor affecting optimal loan terms"
    },
    { 
      feature: "Loan Amount Request", 
      importance: 0.18, 
      category: "User",
      description: "User's requested loan amount as input to Q-learning function"
    },
    { 
      feature: "Historical Repayment", 
      importance: 0.14, 
      category: "Risk",
      description: "Past loan performance data for policy optimization"
    },
    { 
      feature: "Business Growth Rate", 
      importance: 0.08, 
      category: "User",
      description: "Estimated from transaction volume increase over time"
    },
    { 
      feature: "Debt-Service Ratio", 
      importance: 0.06, 
      category: "Risk",
      description: "Ratio of debt payments to business income used in reward calculation"
    },
  ];
  
  // Format data for the charts
  const formatChartData = (data: FeatureImportance[]) => {
    return data.map(item => ({
      name: item.feature,
      value: item.importance * 100, // Convert to percentage
      category: item.category,
      description: item.description
    }));
  };
  
  const lstmChartData = formatChartData(lstmFeatureData);
  const rlChartData = formatChartData(rlFeatureData);
  
  // Color mapping for different data categories
  const getCategoryColor = (category: string) => {
    switch(category) {
      case "Bills": return "#4f46e5";
      case "Bank": return "#059669";
      case "Wallet": return "#d97706";
      case "Risk": return "#e11d48";
      case "Market": return "#8b5cf6";
      case "User": return "#0ea5e9";
      default: return "#6b7280";
    }
  };

  const renderTooltip = (props: any) => {
    const { active, payload } = props;
    
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      return (
        <div className="bg-white p-3 border rounded shadow-lg">
          <p className="font-medium text-sm">{data.name}</p>
          <p className="text-xs text-muted-foreground">{data.description}</p>
          <p className="text-sm font-bold mt-1">{`${data.value.toFixed(1)}%`}</p>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">ML Model Feature Importance</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="lstm">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="lstm">LSTM Probability of Default</TabsTrigger>
            <TabsTrigger value="rl">RL Credit Optimization</TabsTrigger>
          </TabsList>
          
          <TabsContent value="lstm">
            <div className="text-sm text-muted-foreground mb-4">
              Long Short-Term Memory (LSTM) model analyzes sequential financial data to predict default probability
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={lstmChartData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                  <YAxis type="category" dataKey="name" width={120} />
                  <Tooltip content={renderTooltip} />
                  <Bar 
                    dataKey="value" 
                    name="Importance"
                    fill="#4f46e5" 
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 flex flex-wrap justify-center gap-4">
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
          </TabsContent>
          
          <TabsContent value="rl">
            <div className="text-sm text-muted-foreground mb-4">
              Reinforcement Learning (RL) model optimizes loan terms based on risk and reward calculations
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={rlChartData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                  <YAxis type="category" dataKey="name" width={150} />
                  <Tooltip content={renderTooltip} />
                  <Bar 
                    dataKey="value" 
                    name="Importance"
                    fill="#e11d48"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#e11d48] mr-1"></div>
                <span className="text-xs">Risk Factors</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#8b5cf6] mr-1"></div>
                <span className="text-xs">Market Factors</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#0ea5e9] mr-1"></div>
                <span className="text-xs">User Factors</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
          <h4 className="text-sm font-medium mb-2">How the ML Models Work Together</h4>
          <p className="text-xs text-muted-foreground">
            The LSTM network processes time-series financial data to predict default probability, 
            which then feeds into the Reinforcement Learning model that optimizes loan terms 
            using Deep Q-Learning to balance risk and reward.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelFeatureImportance;
