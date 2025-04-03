
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
      const amount = parseFloat(values[1] || "0");
      return {
        date: values[0] || new Date().toISOString().split('T')[0],
        amount: isNaN(amount) ? 0 : amount,
        description: values[2] || "Transaction",
        type: amount > 0 ? 'deposit' : 'withdrawal',
      };
    });
  } catch (error) {
    console.error('Error parsing bank transactions:', error);
    // Return sample data if parsing fails
    return generateSampleBankTransactions();
  }
};

// Generate sample bank transactions if parsing fails
const generateSampleBankTransactions = (): BankTransaction[] => {
  const today = new Date();
  return [
    { 
      date: new Date(today.setDate(today.getDate() - 30)).toISOString().split('T')[0], 
      amount: 5000, 
      description: "Salary", 
      type: "deposit" 
    },
    { 
      date: new Date(today.setDate(today.getDate() - 25)).toISOString().split('T')[0], 
      amount: -1200, 
      description: "Rent", 
      type: "withdrawal" 
    },
    { 
      date: new Date(today.setDate(today.getDate() - 15)).toISOString().split('T')[0], 
      amount: -500, 
      description: "Utilities", 
      type: "withdrawal" 
    },
    { 
      date: new Date(today.setDate(today.getDate() - 2)).toISOString().split('T')[0], 
      amount: 100, 
      description: "Refund", 
      type: "deposit" 
    }
  ];
};

// Parse CSV data for utility bills
export const parseUtilityBills = (csvContent: string): UtilityBill[] => {
  try {
    const lines = csvContent.trim().split('\n');
    const headers = lines[0].split(',');
    
    return lines.slice(1).map(line => {
      const values = line.split(',');
      const amount = parseFloat(values[1] || "0");
      return {
        provider: values[0] || "Utility Provider",
        amount: isNaN(amount) ? 0 : amount,
        dueDate: values[2] || new Date().toISOString().split('T')[0],
        paymentDate: values[3] || undefined,
        isPaid: values[4]?.toLowerCase() === 'true',
      };
    });
  } catch (error) {
    console.error('Error parsing utility bills:', error);
    // Return sample data if parsing fails
    return generateSampleUtilityBills();
  }
};

// Generate sample utility bills if parsing fails
const generateSampleUtilityBills = (): UtilityBill[] => {
  const today = new Date();
  return [
    { 
      provider: "Electricity Board", 
      amount: 120, 
      dueDate: new Date(today.setDate(today.getDate() - 15)).toISOString().split('T')[0], 
      paymentDate: new Date(today.setDate(today.getDate() - 13)).toISOString().split('T')[0], 
      isPaid: true 
    },
    { 
      provider: "Water Supply", 
      amount: 80, 
      dueDate: new Date(today.setDate(today.getDate() - 10)).toISOString().split('T')[0], 
      paymentDate: new Date(today.setDate(today.getDate() - 8)).toISOString().split('T')[0], 
      isPaid: true 
    }
  ];
};

// LSTM model for sequence prediction (simplified simulation)
const lstmPredict = (data: number[]): number => {
  // Simplified LSTM simulation using weighted average
  const weights = data.map((_, i) => Math.exp(i / data.length));
  const weightedSum = data.reduce((acc, val, i) => acc + val * weights[i], 0);
  const weightSum = weights.reduce((a, b) => a + b, 0);
  return weightedSum / weightSum;
};

// Reinforcement Learning for optimizing loan terms (simplified simulation)
const rlOptimize = (defaultProb: number, cashFlow: number): { amount: number; rate: number } => {
  const maxAmount = cashFlow * 12; // One year of cash flow
  const baseRate = 8; // Base interest rate
  
  // Risk adjustment based on default probability
  const riskPremium = (1 - defaultProb) * 10;
  const optimalAmount = maxAmount * defaultProb;
  const optimalRate = baseRate + riskPremium;
  
  return {
    amount: Math.max(5000, optimalAmount), // Minimum loan amount of 5000 rupees
    rate: Math.min(20, Math.max(8, optimalRate)) // Rate between 8% and 20%
  };
};

// Simulated ML model prediction
export const predictCreditScore = async (
  bankTransactions: BankTransaction[],
  utilityBills: UtilityBill[],
  walletTransactions: WalletTransaction[]
): Promise<CreditAssessmentResult> => {
  // Extract features from data
  const cashFlows = bankTransactions.map(t => t.amount);
  const avgCashFlow = cashFlows.reduce((a, b) => a + b, 0) / cashFlows.length || 0;
  
  // LSTM prediction for default probability
  const defaultProb = 1 - (lstmPredict(cashFlows.map(cf => cf > 0 ? 1 : 0)) || 0.5);
  
  // Calculate base risk score (0-100)
  let score = Math.max(0, Math.min(100, (1 - defaultProb) * 100));
  
  // RL optimization for loan terms
  const { amount: maxLoanAmount, rate: interestRate } = rlOptimize(defaultProb, avgCashFlow);
  
  // Calculate factor impacts
  const factors = [
    {
      name: "Payment History",
      impact: utilityBills.filter(b => b.isPaid).length / utilityBills.length || 0,
      description: "Based on utility bill payment history"
    },
    {
      name: "Cash Flow Stability",
      impact: lstmPredict(cashFlows.map(cf => Math.abs(cf))) / (Math.max(...cashFlows) || 1),
      description: "LSTM analysis of your banking transaction patterns"
    },
    {
      name: "Income Consistency",
      impact: bankTransactions.filter(t => t.type === 'deposit').length / bankTransactions.length || 0,
      description: "Based on regular income deposits"
    },
    {
      name: "Financial Behavior",
      impact: (walletTransactions.length > 0 ? 0.7 : 0),
      description: "Digital payment activity and patterns"
    }
  ];
  
  // Generate recommendation
  let recommendation = "";
  if (score >= 80) {
    recommendation = "Excellent financial profile. Eligible for premium loan terms.";
  } else if (score >= 60) {
    recommendation = "Good financial profile. Eligible for standard loan terms.";
  } else if (score >= 40) {
    recommendation = "Fair financial profile. Limited loan options available.";
  } else {
    recommendation = "Consider improving your payment history and cash flow before applying.";
  }
  
  return {
    riskScore: Math.round(score),
    maxLoanAmount: Math.round(maxLoanAmount),
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
        reader.onload = (e) => resolve(e.target?.result as string || '');
        reader.readAsText(file);
      });
    });
    
    // Wait for all files to be read
    const fileContents = await Promise.all(fileDataPromises);
    
    // Parse bank transactions and utility bills
    const bankData = fileContents.length > 0 ? parseBankTransactions(fileContents[0]) : [];
    const utilityBillsData = fileContents.slice(1).flatMap(content => parseUtilityBills(content));
    
    // Generate synthetic data if needed
    const finalBankData = bankData.length > 0 ? bankData : generateSampleBankTransactions();
    const finalUtilityData = utilityBillsData.length > 0 ? utilityBillsData : generateSampleUtilityBills();
    
    // Generate synthetic wallet data
    const walletData: WalletTransaction[] = walletConnected ? [
      { date: "2024-03-15", amount: 120, type: "payment", vendor: "PhonePe" },
      { date: "2024-03-22", amount: 35, type: "payment", vendor: "GPay" },
      { date: "2024-04-01", amount: 500, type: "receive", vendor: "PayTM" }
    ] : [];
    
    // Run prediction model
    return await predictCreditScore(
      finalBankData,
      finalUtilityData,
      walletData
    );
    
  } catch (error) {
    console.error("Error in credit assessment:", error);
    toast({
      title: "Error processing data",
      description: "There was a problem analyzing your financial data. Please try again.",
      variant: "destructive"
    });
    
    // Return fallback assessment
    return {
      riskScore: 60,
      maxLoanAmount: 10000,
      interestRate: 12.5,
      factors: [
        {
          name: "Basic Assessment",
          impact: 0.6,
          description: "Based on limited available data"
        }
      ],
      recommendation: "Please ensure all required financial data is provided for a complete assessment."
    };
  }
};
