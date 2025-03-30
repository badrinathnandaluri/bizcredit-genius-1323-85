
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RiskAssessment, RiskFactor } from '@/types';
import { Progress } from '@/components/ui/progress';

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
        <CardTitle className="text-xl">AI Risk Assessment</CardTitle>
        <CardDescription className="text-white/80">
          Based on your financial data and business profile
        </CardDescription>
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
            {assessment.score >= 80 && "Excellent risk profile"}
            {assessment.score >= 60 && assessment.score < 80 && "Good risk profile"}
            {assessment.score < 60 && "Higher risk profile"}
          </p>
        </div>

        <div>
          <h4 className="font-medium mb-2">Key Risk Factors</h4>
          <div className="space-y-3">
            {assessment.factors.map((factor, index) => (
              <RiskFactorItem key={index} factor={factor} />
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium mb-2">Recommendation</h4>
          <div className="p-3 bg-blue-50 text-blue-800 rounded-md text-sm">
            {assessment.recommendation}
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Maximum Amount</p>
              <p className="font-bold text-lg">${assessment.maxLoanAmount.toLocaleString()}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Suggested Interest Rate</p>
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
      <Progress value={impactPercentage} className="h-1.5" indicatorClassName={impactColor} />
      <p className="text-xs text-muted-foreground">{factor.description}</p>
    </div>
  );
};

export default RiskAssessmentDisplay;
