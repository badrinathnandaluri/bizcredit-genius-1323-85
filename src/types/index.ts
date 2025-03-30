export interface User {
  id: string;
  name: string;
  email: string;
  business: Business;
  role: 'user' | 'admin';
  dataCollection?: DataCollection;
  creditAssessment?: CreditAssessment;
}

export interface Business {
  name: string;
  industry: string;
  yearEstablished: number;
  employeeCount: number;
  annualRevenue?: number;
  address?: string;
  taxId?: string;
}

export interface DataCollection {
  billsUploaded: boolean;
  transactionsConnected: boolean;
  walletConnected: boolean;
  completedAt?: string;
}

export interface CreditAssessment {
  eligible: boolean;
  maxLoanAmount: number;
  riskScore: number;
  interestRate: number;
  completedAt: string;
}

export interface Loan {
  id: string;
  userId: string;
  amount: number;
  term: number; // in months
  interestRate: number;
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'completed';
  riskScore?: number;
  createdAt: string;
  approvedAt?: string;
  nextPaymentDate?: string;
  nextPaymentAmount?: number;
  remainingAmount?: number;
}

export interface LoanApplication {
  businessId: string;
  requestedAmount: number;
  purpose: string;
  term: number; // in months
  businessBank?: string;
  documents?: string[];
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'payment' | 'fee';
  description: string;
  date: string;
}

export interface RiskAssessment {
  score: number;
  factors: RiskFactor[];
  recommendation: string;
  maxLoanAmount: number;
  suggestedInterestRate: number;
}

export interface RiskFactor {
  name: string;
  impact: number; // -1 to 1, negative is bad, positive is good
  description: string;
}

export interface DashboardStats {
  activeLoanCount: number;
  totalLoaned: number;
  availableCredit: number;
  creditUtilization: number;
}
