
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockLoans } from '@/services/mockData';
import { format } from 'date-fns';

const RecentApplications: React.FC = () => {
  // Get the most recent applications based on createAt date
  const recentApplications = [...mockLoans]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Recent Loan Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentApplications.map((loan) => (
            <div key={loan.id} className="flex items-center justify-between">
              <div className="flex items-start flex-col sm:flex-row sm:items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-bizblue-100 flex items-center justify-center text-bizblue-600 font-bold text-sm">
                  {loan.id.slice(-2).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium">
                    ${loan.amount.toLocaleString()} / {loan.term} months
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(loan.createdAt), 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
              
              <Badge 
                variant={
                  loan.status === 'approved' ? 'default' :
                  loan.status === 'active' ? 'default' :
                  loan.status === 'rejected' ? 'destructive' : 
                  'secondary'
                }
                className={
                  loan.status === 'approved' ? 'bg-green-500 hover:bg-green-600' :
                  loan.status === 'active' ? 'bg-bizblue-500 hover:bg-bizblue-600' :
                  undefined
                }
              >
                {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentApplications;
