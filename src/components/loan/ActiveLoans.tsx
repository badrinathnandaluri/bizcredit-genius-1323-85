
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Loan } from '@/types';
import { format } from 'date-fns';

interface ActiveLoansProps {
  loans: Loan[];
}

const ActiveLoans: React.FC<ActiveLoansProps> = ({ loans }) => {
  const activeLoans = loans.filter(loan => loan.status === 'active');
  
  if (activeLoans.length === 0) {
    return (
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Active Loans</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-6">
          <p className="text-muted-foreground">No active loans at the moment.</p>
          <Button className="mt-4 bg-bizblue-600 hover:bg-bizblue-700" onClick={() => window.location.href = "/apply"}>
            Apply for a Loan
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Active Loans</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {activeLoans.map((loan) => (
          <ActiveLoanCard key={loan.id} loan={loan} />
        ))}
      </CardContent>
    </Card>
  );
};

interface ActiveLoanCardProps {
  loan: Loan;
}

const ActiveLoanCard: React.FC<ActiveLoanCardProps> = ({ loan }) => {
  // Calculate loan progress (how much has been paid off)
  const totalLoanAmount = loan.amount;
  const remainingAmount = loan.remainingAmount || 0;
  const paidAmount = totalLoanAmount - remainingAmount;
  const progressPercentage = (paidAmount / totalLoanAmount) * 100;

  return (
    <div className="border rounded-lg p-4">
      <div className="flex flex-wrap md:flex-nowrap justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-medium">₹{loan.amount.toLocaleString()}</h3>
            <Badge className="bg-bizblue-500 hover:bg-bizblue-600">
              {loan.term} months
            </Badge>
          </div>
          
          <div className="text-xs text-muted-foreground mt-1">
            Approved on {format(new Date(loan.approvedAt || ''), 'MMM dd, yyyy')}
          </div>
          
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span>Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>
        
        <div className="flex flex-col space-y-3 sm:items-end">
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Next Payment</div>
            <div className="font-medium">₹{loan.nextPaymentAmount?.toLocaleString()}</div>
            <div className="text-xs">
              Due {loan.nextPaymentDate ? format(new Date(loan.nextPaymentDate), 'MMM dd, yyyy') : 'N/A'}
            </div>
          </div>
          
          <Button className="bg-bizblue-600 hover:bg-bizblue-700 w-full sm:w-auto">
            Make Payment
          </Button>
        </div>
      </div>
      
      <div className="mt-4 flex flex-wrap justify-between gap-2 text-sm">
        <div>
          <div className="text-muted-foreground text-xs">Interest Rate</div>
          <div>{loan.interestRate}%</div>
        </div>
        <div>
          <div className="text-muted-foreground text-xs">Remaining Principal</div>
          <div>₹{loan.remainingAmount?.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-muted-foreground text-xs">Loan ID</div>
          <div>#{loan.id}</div>
        </div>
      </div>
    </div>
  );
};

export default ActiveLoans;
