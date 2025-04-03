
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { CreditCard, Wallet2, TrendingUp, AlertTriangle } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import RecentApplications from '@/components/dashboard/RecentApplications';
import CreditUtilization from '@/components/dashboard/CreditUtilization';
import RepaymentSchedule from '@/components/dashboard/RepaymentSchedule';
import ActiveLoans from '@/components/loan/ActiveLoans';
import { mockDashboardStats, getUserLoans, getUserTransactions } from '@/services/mockData';
import { Loan } from '@/types';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [loans, setLoans] = React.useState<Loan[]>([]);
  
  React.useEffect(() => {
    if (user) {
      const userLoans = getUserLoans(user.id);
      setLoans(userLoans);
    }
  }, [user]);

  // Get an active loan for demo purposes
  const activeLoan = loans.find(loan => loan.status === 'active');

  // Upcoming payments data (normally would come from an API)
  const upcomingPayments = activeLoan ? [
    {
      amount: activeLoan.nextPaymentAmount || 0,
      date: activeLoan.nextPaymentDate || '',
      status: 'upcoming' as const,
      loanId: activeLoan.id
    }
  ] : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your business financing and loan status
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Active Loans"
          value={mockDashboardStats.activeLoanCount.toString()}
          icon={<CreditCard className="h-5 w-5" />}
          trend={{ value: 0, isPositive: true }}
        />
        <StatCard 
          title="Total Funded"
          value={`₹${mockDashboardStats.totalLoaned.toLocaleString()}`}
          icon={<Wallet2 className="h-5 w-5" />}
          trend={{ value: 12, isPositive: true }}
          description="Total capital funded to date"
        />
        <StatCard 
          title="Available Credit"
          value={`₹${mockDashboardStats.availableCredit.toLocaleString()}`}
          icon={<TrendingUp className="h-5 w-5" />}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard 
          title="Credit Utilization"
          value={`${mockDashboardStats.creditUtilization}%`}
          icon={<AlertTriangle className="h-5 w-5" />}
          trend={{ value: 2, isPositive: false }}
          description="Percentage of credit line used"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ActiveLoans loans={loans} />
        
        <div className="space-y-6">
          <CreditUtilization 
            availableCredit={mockDashboardStats.availableCredit}
            totalCredit={mockDashboardStats.totalLoaned + mockDashboardStats.availableCredit}
            utilizationPercentage={mockDashboardStats.creditUtilization}
          />
          
          <RepaymentSchedule upcomingPayments={upcomingPayments} />
        </div>
      </div>

      {/* Recent Applications */}
      <div>
        <RecentApplications />
      </div>
    </div>
  );
};

export default Dashboard;

