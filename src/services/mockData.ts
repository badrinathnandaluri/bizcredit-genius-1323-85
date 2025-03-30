
import { Loan, Transaction, RiskAssessment, DashboardStats } from '../types';

// Mock loans data
export const mockLoans: Loan[] = [
  {
    id: 'loan-1',
    userId: '1',
    amount: 25000,
    term: 12,
    interestRate: 8.5,
    status: 'active',
    riskScore: 76,
    createdAt: '2023-11-15T14:30:00Z',
    approvedAt: '2023-11-16T10:22:00Z',
    nextPaymentDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    nextPaymentAmount: 2208.33,
    remainingAmount: 16875.00,
  },
  {
    id: 'loan-2',
    userId: '1',
    amount: 15000,
    term: 6,
    interestRate: 7.2,
    status: 'completed',
    riskScore: 82,
    createdAt: '2023-06-10T09:15:00Z',
    approvedAt: '2023-06-11T14:20:00Z',
    remainingAmount: 0,
  },
  {
    id: 'loan-3',
    userId: '3',
    amount: 50000,
    term: 24,
    interestRate: 9.1,
    status: 'active',
    riskScore: 68,
    createdAt: '2023-10-05T11:45:00Z',
    approvedAt: '2023-10-06T16:30:00Z',
    nextPaymentDate: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    nextPaymentAmount: 2291.67,
    remainingAmount: 41250.00,
  },
  {
    id: 'loan-4',
    userId: '4',
    amount: 35000,
    term: 18,
    interestRate: 8.8,
    status: 'pending',
    riskScore: 72,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'loan-5',
    userId: '1',
    amount: 18000,
    term: 12,
    interestRate: 7.9,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }
];

// Mock transactions
export const mockTransactions: Transaction[] = [
  {
    id: 'txn-1',
    userId: '1',
    amount: 25000,
    type: 'deposit',
    description: 'Loan disbursement',
    date: '2023-11-16T10:30:00Z'
  },
  {
    id: 'txn-2',
    userId: '1',
    amount: 2208.33,
    type: 'payment',
    description: 'Loan payment',
    date: '2023-12-16T14:25:00Z'
  },
  {
    id: 'txn-3',
    userId: '1',
    amount: 2208.33,
    type: 'payment',
    description: 'Loan payment',
    date: '2024-01-16T09:15:00Z'
  },
  {
    id: 'txn-4',
    userId: '1',
    amount: 2208.33,
    type: 'payment',
    description: 'Loan payment',
    date: '2024-02-16T11:45:00Z'
  },
  {
    id: 'txn-5',
    userId: '1',
    amount: 2208.33,
    type: 'payment',
    description: 'Loan payment',
    date: '2024-03-16T16:20:00Z'
  },
  {
    id: 'txn-6',
    userId: '1',
    amount: 15,
    type: 'fee',
    description: 'Late payment fee',
    date: '2024-03-18T10:10:00Z'
  }
];

// Mock risk assessment
export const mockRiskAssessment: RiskAssessment = {
  score: 76,
  factors: [
    {
      name: 'Business age',
      impact: 0.7,
      description: 'Business has been operating for 8+ years'
    },
    {
      name: 'Cash flow stability',
      impact: 0.5,
      description: 'Consistent monthly income with minor fluctuations'
    },
    {
      name: 'Credit history',
      impact: 0.6,
      description: 'Good payment history with few late payments'
    },
    {
      name: 'Industry risk',
      impact: -0.2,
      description: 'Technology sector facing increased competition'
    },
    {
      name: 'Debt-to-income ratio',
      impact: 0.4,
      description: 'Manageable debt levels relative to business income'
    }
  ],
  recommendation: 'Approve with standard interest rate',
  maxLoanAmount: 75000,
  suggestedInterestRate: 8.5
};

// Dashboard statistics
export const mockDashboardStats: DashboardStats = {
  activeLoanCount: 1,
  totalLoaned: 40000,
  availableCredit: 35000,
  creditUtilization: 53.33
};

// Get loans for a specific user
export const getUserLoans = (userId: string): Loan[] => {
  return mockLoans.filter(loan => loan.userId === userId);
};

// Get transactions for a specific user
export const getUserTransactions = (userId: string): Transaction[] => {
  return mockTransactions.filter(transaction => transaction.userId === userId);
};

// Generate risk assessment (would be AI-powered in a real app)
export const generateRiskAssessment = (): RiskAssessment => {
  // In a real app, this would call an AI model
  return mockRiskAssessment;
};

// Get all loans (admin only)
export const getAllLoans = (): Loan[] => {
  return mockLoans;
};
