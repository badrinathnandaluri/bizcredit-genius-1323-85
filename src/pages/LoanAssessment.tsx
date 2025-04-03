
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import RiskAssessmentDisplay from '@/components/loan/RiskAssessmentDisplay';
import ModelFeatureImportance from '@/components/analytics/ModelFeatureImportance';
import { CheckCircle2, Clock, Zap, Database, Brain } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const LoanAssessment: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const creditAssessment = user?.creditAssessment;
  
  // Convert credit assessment to risk assessment display format
  const riskAssessment = creditAssessment ? {
    score: creditAssessment.riskScore,
    maxLoanAmount: creditAssessment.maxLoanAmount,
    suggestedInterestRate: creditAssessment.interestRate,
    recommendation: creditAssessment.eligible 
      ? `Based on our LSTM analysis, you are eligible for a loan up to ₹${creditAssessment.maxLoanAmount.toLocaleString()}`
      : "Based on our LSTM analysis, we recommend improving your financial profile before applying for a loan",
    factors: [
      {
        name: "Payment History",
        impact: Math.random() * 2 - 1, // Simulated impact between -1 and 1
        description: "Based on utility bill payment dates relative to the 15th of each month"
      },
      {
        name: "Cash Flow Stability",
        impact: Math.random() * 2 - 1,
        description: "LSTM analysis of your banking transaction patterns and income consistency"
      },
      {
        name: "Digital Payment Behavior",
        impact: Math.random() * 2 - 1,
        description: "Sequential analysis of your e-wallet transaction frequency and timing"
      },
      {
        name: "Overall Financial Health",
        impact: Math.random() * 2 - 1,
        description: "Comprehensive LSTM assessment of your business's temporal financial patterns"
      }
    ]
  } : {
    score: 50,
    maxLoanAmount: 10000,
    suggestedInterestRate: 10.5,
    recommendation: "Please complete the onboarding process to get a personalized assessment",
    factors: []
  };
  
  // Calculate monthly payment based on max loan amount and interest rate
  const calculateMonthlyPayment = (amount: number, interestRate: number, term: number) => {
    const monthlyRate = interestRate / 100 / 12;
    const payments = term;
    const x = Math.pow(1 + monthlyRate, payments);
    return (amount * x * monthlyRate) / (x - 1);
  };
  
  const monthlyPayment = calculateMonthlyPayment(
    riskAssessment.maxLoanAmount,
    riskAssessment.suggestedInterestRate,
    12
  );
  
  const totalRepayment = monthlyPayment * 12;
  
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
          <Brain className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">ML Analysis Complete</h1>
        <p className="text-muted-foreground">
          Our LSTM and Reinforcement Learning models have analyzed your financial data 
          and generated your personalized credit assessment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">LSTM + RL Generated Loan Offer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-bizblue-50 p-4 rounded-lg text-center">
                <div className="text-4xl font-bold text-bizblue-700">
                  ₹{riskAssessment.maxLoanAmount.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground mt-1">RL-optimized maximum amount</div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Term Length</span>
                  <span className="font-medium">12 months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Risk-Adjusted Rate</span>
                  <span className="font-medium">{riskAssessment.suggestedInterestRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monthly Payment</span>
                  <span className="font-medium">₹{monthlyPayment.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Repayment</span>
                  <span className="font-medium">₹{totalRepayment.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              className="w-full bg-bizblue-600 hover:bg-bizblue-700"
              disabled={!creditAssessment?.eligible}
            >
              Accept Offer
            </Button>
            <Button variant="outline" className="w-full" onClick={() => navigate('/dashboard')}>
              Return to Dashboard
            </Button>
          </CardFooter>
        </Card>
        
        <RiskAssessmentDisplay assessment={riskAssessment} />
      </div>
      
      <ModelFeatureImportance />
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">ML Analysis Process</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-bizblue-100 p-1 rounded-full">
                <Database className="h-5 w-5 text-bizblue-600" />
              </div>
              <div>
                <p className="font-medium">Data Collection & Preprocessing</p>
                <p className="text-sm text-muted-foreground">Financial time-series data cleaned and normalized for LSTM input</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-bizblue-100 p-1 rounded-full">
                <Brain className="h-5 w-5 text-bizblue-600" />
              </div>
              <div>
                <p className="font-medium">LSTM Default Probability Prediction</p>
                <p className="text-sm text-muted-foreground">Sequential neural network analyzed temporal patterns in your financial behavior</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-bizblue-100 p-1 rounded-full">
                <Zap className="h-5 w-5 text-bizblue-600" />
              </div>
              <div>
                <p className="font-medium">Reinforcement Learning Optimization</p>
                <p className="text-sm text-muted-foreground">Deep Q-Learning algorithm determined optimal loan terms based on risk-reward balance</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className={`p-1 rounded-full ${creditAssessment?.eligible ? 'bg-amber-100' : 'bg-gray-100'}`}>
                <Clock className={`h-5 w-5 ${creditAssessment?.eligible ? 'text-amber-600' : 'text-gray-600'}`} />
              </div>
              <div>
                <p className="font-medium">Awaiting Your Decision</p>
                <p className="text-sm text-muted-foreground">{creditAssessment?.eligible ? 'Review and accept your ML-optimized loan offer' : 'Consider improving your financial profile before applying'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoanAssessment;
