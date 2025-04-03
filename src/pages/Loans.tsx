
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { CreditCard, Check, Clock, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Loan } from '@/types';
import { getUserLoans } from '@/services/mockData';

const Loans: React.FC = () => {
  const { user } = useAuth();
  const [loans, setLoans] = useState<Loan[]>([]);
  
  useEffect(() => {
    if (user) {
      const userLoans = getUserLoans(user.id);
      setLoans(userLoans);
    }
  }, [user]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'active':
        return <Check className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'rejected':
        return <AlertTriangle className="h-4 w-4" />;
      case 'completed':
        return <Check className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Loans</h1>
        <p className="text-muted-foreground">
          Manage your active and past loan applications
        </p>
      </div>

      {loans.length === 0 ? (
        <Card className="bg-white bg-opacity-90 backdrop-blur-sm shadow-md">
          <CardContent className="p-8 flex flex-col items-center justify-center">
            <div className="p-4 rounded-full bg-gray-100 mb-4">
              <CreditCard className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-medium mb-2">No loans yet</h3>
            <p className="text-center text-muted-foreground mb-4">
              You haven't applied for any loans yet. Start your first loan application to get funding for your business.
            </p>
            <Button className="bg-gradient-to-r from-bizblue-600 to-bizblue-700" onClick={() => window.location.href = '/apply'}>
              Apply for Loan
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {loans.map((loan) => (
            <Card key={loan.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white bg-opacity-95 backdrop-blur-sm border border-gray-100">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-white pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-semibold text-bizblue-900">
                      {loan.purpose}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <span>Loan ID: {loan.id.slice(0, 8)}</span>
                      <span className="mx-1">•</span>
                      <span>{new Date(loan.applicationDate).toLocaleDateString()}</span>
                    </CardDescription>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${getStatusColor(loan.status)} flex items-center gap-1 py-1 px-2 capitalize`}
                  >
                    {getStatusIcon(loan.status)}
                    {loan.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4 pt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Loan Amount</p>
                    <p className="text-lg font-semibold">${loan.amount.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Interest Rate</p>
                    <p className="text-lg font-semibold">{loan.interestRate}%</p>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-500">Term Progress</span>
                    <span className="text-sm font-medium">
                      {loan.termPaid}/{loan.term} months
                    </span>
                  </div>
                  <Progress value={(loan.termPaid / loan.term) * 100} className="h-2" />
                </div>
                
                {loan.status === 'active' && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Next Payment</p>
                    <div className="flex justify-between items-center">
                      <p className="font-medium">${loan.nextPaymentAmount?.toLocaleString() || '0'}</p>
                      <p className="text-sm text-gray-500">{loan.nextPaymentDate || 'N/A'}</p>
                    </div>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="bg-gradient-to-r from-white to-gray-50 pt-4 border-t">
                <Button variant="outline" className="w-full hover:bg-bizblue-50 hover:text-bizblue-700 border-bizblue-200">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Loans;
