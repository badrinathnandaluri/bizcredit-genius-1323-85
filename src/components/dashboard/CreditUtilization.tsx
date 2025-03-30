
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface CreditUtilizationProps {
  availableCredit: number;
  totalCredit: number;
  utilizationPercentage: number;
}

const CreditUtilization: React.FC<CreditUtilizationProps> = ({
  availableCredit,
  totalCredit,
  utilizationPercentage
}) => {
  // Determine the color based on utilization percentage
  let progressColor;
  if (utilizationPercentage < 30) {
    progressColor = 'bg-green-500';
  } else if (utilizationPercentage < 70) {
    progressColor = 'bg-yellow-500';
  } else {
    progressColor = 'bg-red-500';
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Credit Utilization</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span>${availableCredit.toLocaleString()} Available</span>
            <span>${totalCredit.toLocaleString()} Total Credit</span>
          </div>
          
          <Progress 
            value={utilizationPercentage} 
            className="h-2" 
            indicatorClassName={progressColor}
          />
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-muted-foreground">Current Utilization</p>
              <p className="text-lg font-bold">{utilizationPercentage}%</p>
            </div>
            
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Available to Withdraw</p>
              <p className="text-lg font-bold">${availableCredit.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditUtilization;
