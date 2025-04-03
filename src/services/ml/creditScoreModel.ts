
import { toast } from '@/hooks/use-toast';

// Types for our ML model inputs
export interface BankTransaction {
  date: string;
  amount: number;
  description: string;
  type: 'deposit' | 'withdrawal';
  balance?: number;
}

export interface UtilityBill {
  provider: string;
  amount: number;
  dueDate: string;
  paymentDate?: string;
  isPaid: boolean;
}

export interface WalletTransaction {
  date: string;
  amount: number;
  type: 'payment' | 'transfer' | 'receive';
  vendor?: string;
  category?: string;
}

// ML Model output
export interface CreditAssessmentResult {
  riskScore: number;
  maxLoanAmount: number;
  interestRate: number;
  factors: {
    name: string;
    impact: number;
    description: string;
  }[];
  recommendation: string;
}

// Parse CSV data for bank transactions
export const parseBankTransactions = (csvContent: string): BankTransaction[] => {
  try {
    // Basic CSV parsing (for demo purposes)
    const lines = csvContent.trim().split('\n');
    const headers = lines[0].split(',');
    
    return lines.slice(1).map(line => {
      const values = line.split(',');
      return {
        date: values[0],
        amount: parseFloat(values[1]),
        description: values[2],
        type: parseFloat(values[1]) > 0 ? 'deposit' : 'withdrawal',
      };
    });
  } catch (error) {
    console.error('Error parsing bank transactions:', error);
    return [];
  }
};

// Parse CSV data for utility bills
export const parseUtilityBills = (csvContent: string): UtilityBill[] => {
  try {
    const lines = csvContent.trim().split('\n');
    const headers = lines[0].split(',');
    
    return lines.slice(1).map(line => {
      const values = line.split(',');
      return {
        provider: values[0],
        amount: parseFloat(values[1]),
        dueDate: values[2],
        paymentDate: values[3] || undefined,
        isPaid: values[4]?.toLowerCase() === 'true',
      };
    });
  } catch (error) {
    console.error('Error parsing utility bills:', error);
    return [];
  }
};

// Simulated ML features extraction
const extractFeatures = (
  bankTransactions: BankTransaction[],
  utilityBills: UtilityBill[],
  walletTransactions: WalletTransaction[]
) => {
  // These would be real ML features in a production system
  
  // Bank account features
  const totalDeposits = bankTransactions
    .filter(t => t.type === 'deposit')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalWithdrawals = bankTransactions
    .filter(t => t.type === 'withdrawal')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  
  const cashflow = totalDeposits - totalWithdrawals;
  
  // Calculate volatility (standard deviation of transaction amounts)
  const amounts = bankTransactions.map(t => t.amount);
  const avgAmount = amounts.reduce((sum, a) => sum + a, 0) / amounts.length;
  const variance = amounts.reduce((sum, a) => sum + Math.pow(a - avgAmount, 2), 0) / amounts.length;
  const volatility = Math.sqrt(variance);
  
  // Utility bill payment behavior
  const billsCount = utilityBills.length;
  const paidBills = utilityBills.filter(b => b.isPaid).length;
  const paymentRate = billsCount > 0 ? paidBills / billsCount : 0;
  
  // Wallet transaction features
  const walletActivity = walletTransactions.length;
  const avgWalletTxn = walletTransactions.length > 0 
    ? walletTransactions.reduce((sum, t) => sum + t.amount, 0) / walletTransactions.length 
    : 0;
  
  return {
    cashflow,
    volatility,
    paymentRate,
    totalDeposits,
    totalWithdrawals,
    walletActivity,
    avgWalletTxn,
  };
};

// Simulated ML model prediction
// In a real application, this would use TensorFlow.js or a similar library
export const predictCreditScore = async (
  bankTransactions: BankTransaction[],
  utilityBills: UtilityBill[],
  walletTransactions: WalletTransaction[]
): Promise<CreditAssessmentResult> => {
  // Extract features from data
  const features = extractFeatures(bankTransactions, utilityBills, walletTransactions);
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Calculate risk score (0-100, higher is better)
  const baseScore = 50;
  
  // Positive factors increase the score
  let score = baseScore;
  
  // Cash flow impact (positive cash flow is good)
  const cashFlowImpact = features.cashflow > 0 ? Math.min(features.cashflow / 1000, 20) : Math.max(features.cashflow / 1000, -20);
  score += cashFlowImpact;
  
  // Payment history impact
  const paymentHistoryImpact = (features.paymentRate - 0.5) * 30;
  score += paymentHistoryImpact;
  
  // Volatility impact (lower volatility is better)
  const volatilityImpact = -Math.min(features.volatility / 500, 15);
  score += volatilityImpact;
  
  // Wallet activity impact (moderate activity is good)
  const walletActivityImpact = Math.min(features.walletActivity / 10, 10);
  score += walletActivityImpact;
  
  // Clamp score between 0 and 100
  score = Math.max(0, Math.min(100, score));
  
  // Calculate max loan amount based on score and cash flow
  const maxLoanAmount = Math.round((score / 100) * features.cashflow * 12);
  
  // Calculate suggested interest rate (lower score = higher rate)
  const baseRate = 8;
  const interestRate = baseRate + (100 - score) / 10;
  
  // Prepare the factors that contributed to the score
  const factors = [
    {
      name: "Cash Flow",
      impact: cashFlowImpact / 20, // Normalize to -1 to 1 range
      description: cashFlowImpact > 0 
        ? "Positive cash flow demonstrates ability to repay debt" 
        : "Negative cash flow may indicate financial difficulty"
    },
    {
      name: "Bill Payment History",
      impact: paymentHistoryImpact / 30,
      description: paymentHistoryImpact > 0 
        ? "Consistent bill payment history shows reliability" 
        : "Inconsistent bill payments may indicate financial stress"
    },
    {
      name: "Financial Stability",
      impact: -volatilityImpact / 15,
      description: volatilityImpact > 0 
        ? "Stable transaction patterns suggest reliable income" 
        : "High transaction volatility may indicate irregular income"
    },
    {
      name: "Digital Wallet Usage",
      impact: walletActivityImpact / 10,
      description: "Active digital wallet usage demonstrates financial engagement"
    }
  ];
  
  // Generate recommendation based on score
  let recommendation = "";
  if (score >= 80) {
    recommendation = "Excellent risk profile. Eligible for premium credit terms and maximum loan amount.";
  } else if (score >= 60) {
    recommendation = "Good risk profile. Eligible for standard credit terms with favorable interest rates.";
  } else if (score >= 40) {
    recommendation = "Moderate risk profile. Eligible for limited credit with higher interest rates.";
  } else {
    recommendation = "Higher risk profile. Consider improving payment history and increasing cash flow before applying.";
  }
  
  return {
    riskScore: Math.round(score),
    maxLoanAmount: Math.max(5000, maxLoanAmount),
    interestRate: parseFloat(interestRate.toFixed(2)),
    factors,
    recommendation
  };
};

// Main function to process all files and generate credit assessment
export const processCreditAssessment = async (
  files: File[],
  bankConnected: boolean,
  walletConnected: boolean
): Promise<CreditAssessmentResult> => {
  try {
    // Parse uploaded files
    const fileDataPromises = files.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsText(file);
      });
    });
    
    // Wait for all files to be read
    const fileContents = await Promise.all(fileDataPromises);
    
    // For demonstration purposes, assume first file is bank data, rest are utility bills
    const bankData = fileContents.length > 0 ? parseBankTransactions(fileContents[0]) : [];
    
    const utilityBillsData = fileContents.slice(1).flatMap(content => 
      parseUtilityBills(content)
    );
    
    // Generate synthetic wallet data if connected
    const walletData: WalletTransaction[] = walletConnected ? [
      { date: "2025-01-15", amount: 120, type: "payment", vendor: "Amazon" },
      { date: "2025-01-22", amount: 35, type: "payment", vendor: "Uber" },
      { date: "2025-02-01", amount: 500, type: "receive", vendor: "Venmo" },
      { date: "2025-02-15", amount: 65, type: "payment", vendor: "Walmart" },
      { date: "2025-03-01", amount: 250, type: "transfer", vendor: "Checking Account" },
    ] : [];
    
    // Generate synthetic bank data if connected and no files provided
    const syntheticBankData: BankTransaction[] = bankConnected && bankData.length === 0 ? [
      { date: "2025-01-01", amount: 5000, description: "Salary Deposit", type: "deposit" },
      { date: "2025-01-05", amount: -1200, description: "Rent Payment", type: "withdrawal" },
      { date: "2025-01-15", amount: -500, description: "Credit Card Payment", type: "withdrawal" },
      { date: "2025-02-01", amount: 5000, description: "Salary Deposit", type: "deposit" },
      { date: "2025-02-05", amount: -1200, description: "Rent Payment", type: "withdrawal" },
      { date: "2025-03-01", amount: 5000, description: "Salary Deposit", type: "deposit" },
      { date: "2025-03-05", amount: -1200, description: "Rent Payment", type: "withdrawal" },
    ] : bankData;
    
    // Run prediction model
    return await predictCreditScore(
      syntheticBankData, 
      utilityBillsData,
      walletData
    );
    
  } catch (error) {
    console.error("Error in credit assessment:", error);
    toast({
      title: "Error processing data",
      description: "There was a problem analyzing your financial data. Please try again.",
      variant: "destructive"
    });
    
    // Return fallback assessment in case of error
    return {
      riskScore: 50,
      maxLoanAmount: 10000,
      interestRate: 10.5,
      factors: [
        {
          name: "Data Processing Error",
          impact: -0.5,
          description: "Unable to properly analyze your financial data"
        }
      ],
      recommendation: "Please ensure your data is formatted correctly and try again."
    };
  }
};
