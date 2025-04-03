
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RiskAssessment, RiskFactor } from '@/types';
import { Progress } from '@/components/ui/progress';
import { Brain, Zap, AlertTriangle } from 'lucide-react';

interface RiskAssessmentDisplayProps {
  assessment: RiskAssessment;
}

const RiskAssessmentDisplay: React.FC<RiskAssessmentDisplayProps> = ({ assessment }) => {
  // Helper function to get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  // Helper function to get progress color based on score
  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-bizblue-700 to-bizblue-900 text-white">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">AI Risk Assessment</CardTitle>
            <CardDescription className="text-white/80">
              LSTM + Reinforcement Learning Analysis
            </CardDescription>
          </div>
          <div className="bg-white/10 p-2 rounded-full">
            <Brain className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-4 bg-gray-100 rounded-full mb-4">
            <div className="text-3xl font-bold">
              <span className={getScoreColor(assessment.score)}>{assessment.score}</span>
              <span className="text-sm text-muted-foreground">/100</span>
            </div>
          </div>
          <h3 className="font-semibold text-lg">Credit Risk Score</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {assessment.score >= 80 && "Low default probability (LSTM prediction)"}
            {assessment.score >= 60 && assessment.score < 80 && "Moderate default probability (LSTM prediction)"}
            {assessment.score < 60 && "Higher default probability (LSTM prediction)"}
          </p>
        </div>

        <div className="bg-gray-50 p-3 rounded-md border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-bizblue-600" />
            <h4 className="font-medium text-sm">RL Model Optimization</h4>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground">Optimal Interest Rate</p>
              <p className="font-bold">{assessment.suggestedInterestRate}%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Maximum Amount</p>
              <p className="font-bold">${assessment.maxLoanAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">LSTM-Identified Risk Factors</h4>
          <div className="space-y-3">
            {assessment.factors.map((factor, index) => (
              <RiskFactorItem key={index} factor={factor} />
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
            <div>
              <h4 className="font-medium">AI Recommendation</h4>
              <div className="p-3 bg-blue-50 text-blue-800 rounded-md text-sm mt-2">
                {assessment.recommendation}
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">RL-Calculated Maximum</p>
              <p className="font-bold text-lg">${assessment.maxLoanAmount.toLocaleString()}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Risk-Adjusted Rate</p>
              <p className="font-bold text-lg">{assessment.suggestedInterestRate}%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface RiskFactorItemProps {
  factor: RiskFactor;
}

const RiskFactorItem: React.FC<RiskFactorItemProps> = ({ factor }) => {
  // Convert impact (-1 to 1) to a percentage (0 to 100)
  const impactPercentage = ((factor.impact + 1) / 2) * 100;
  
  // Determine color based on impact
  const impactColor = factor.impact > 0 ? "bg-green-500" : "bg-red-500";
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{factor.name}</span>
        <span className={factor.impact > 0 ? "text-green-600 text-xs" : "text-red-600 text-xs"}>
          {factor.impact > 0 ? "Positive" : "Negative"} Impact
        </span>
      </div>
      <div className="relative w-full h-1.5 bg-secondary rounded-full overflow-hidden">
        <div 
          className={`absolute top-0 left-0 h-full ${impactColor}`} 
          style={{ width: `${impactPercentage}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground">{factor.description}</p>
    </div>
  );
};

export default RiskAssessmentDisplay;
