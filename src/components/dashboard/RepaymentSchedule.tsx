
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

interface UpcomingPayment {
  amount: number;
  date: string;
  status: 'upcoming' | 'overdue';
  loanId: string;
}

interface RepaymentScheduleProps {
  upcomingPayments: UpcomingPayment[];
}

const RepaymentSchedule: React.FC<RepaymentScheduleProps> = ({ upcomingPayments }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Upcoming Payments</CardTitle>
      </CardHeader>
      <CardContent>
        {upcomingPayments.length > 0 ? (
          <div className="space-y-3">
            {upcomingPayments.map((payment, index) => (
              <PaymentItem key={index} payment={payment} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Clock className="h-12 w-12 text-muted-foreground opacity-50" />
            <p className="mt-4 text-sm text-muted-foreground">No upcoming payments scheduled</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface PaymentItemProps {
  payment: UpcomingPayment;
}

const PaymentItem: React.FC<PaymentItemProps> = ({ payment }) => {
  const daysDiff = Math.ceil((new Date(payment.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex justify-between items-start">
        <div className="flex items-start space-x-3">
          <div className={`p-2 rounded-full ${payment.status === 'overdue' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
            {payment.status === 'overdue' ? <Clock className="h-5 w-5" /> : <Calendar className="h-5 w-5" />}
          </div>
          
          <div>
            <p className="text-sm font-medium">
              {payment.status === 'overdue' ? 'Payment Overdue' : 'Upcoming Payment'}
            </p>
            <p className="text-xs text-muted-foreground">
              {format(new Date(payment.date), 'MMM dd, yyyy')}
              {daysDiff <= 10 && daysDiff > 0 && (
                <span className="ml-2 text-amber-600 font-medium">
                  (Due in {daysDiff} {daysDiff === 1 ? 'day' : 'days'})
                </span>
              )}
              {daysDiff <= 0 && (
                <span className="ml-2 text-red-600 font-medium">
                  (Overdue by {Math.abs(daysDiff)} {Math.abs(daysDiff) === 1 ? 'day' : 'days'})
                </span>
              )}
            </p>
          </div>
        </div>
        
        <div className="flex items-center">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-bold">{payment.amount.toLocaleString()}</span>
        </div>
      </div>
      
      <div className="mt-3 flex justify-between">
        <span className="text-xs text-muted-foreground">Loan #{payment.loanId}</span>
        
        {payment.status !== 'overdue' && (
          <button className="text-xs text-bizblue-600 hover:text-bizblue-800 font-medium">
            Pay Now
          </button>
        )}
        
        {payment.status === 'overdue' && (
          <button className="text-xs text-red-600 hover:text-red-800 font-medium">
            Resolve Now
          </button>
        )}
      </div>
    </div>
  );
};

export default RepaymentSchedule;
