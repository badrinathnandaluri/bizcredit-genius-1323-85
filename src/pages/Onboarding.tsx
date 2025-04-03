
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import BillUploader from '@/components/onboarding/BillUploader';
import TransactionConnector from '@/components/onboarding/TransactionConnector';
import WalletConnector from '@/components/onboarding/WalletConnector';
import { Progress } from '@/components/ui/progress';
import { Check, CreditCard, FileText, Wallet } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { processCreditAssessment } from '@/services/ml/creditScoreModel';

const Onboarding: React.FC = () => {
  const { user, updateUserData } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<string>('bills');
  const [progress, setProgress] = useState<number>(0);
  const [billsComplete, setBillsComplete] = useState<boolean>(false);
  const [transactionsComplete, setTransactionsComplete] = useState<boolean>(false);
  const [walletComplete, setWalletComplete] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const calculateProgress = () => {
    let completed = 0;
    if (billsComplete) completed++;
    if (transactionsComplete) completed++;
    if (walletComplete) completed++;
    return (completed / 3) * 100;
  };

  const handleBillsComplete = (files: File[]) => {
    setUploadedFiles(files);
    setBillsComplete(true);
    setProgress(calculateProgress());
    setStep('transactions');
    toast({
      title: "Utility bills uploaded",
      description: "Your bills have been successfully uploaded and will be analyzed."
    });
  };

  const handleTransactionsComplete = () => {
    setTransactionsComplete(true);
    setProgress(calculateProgress());
    setStep('wallet');
    toast({
      title: "Transactions connected",
      description: "Your transaction history has been successfully connected."
    });
  };

  const handleWalletComplete = () => {
    setWalletComplete(true);
    setProgress(calculateProgress());
    toast({
      title: "Digital wallet linked",
      description: "Your digital wallet has been successfully linked."
    });
  };

  const handleSubmit = async () => {
    setProcessing(true);
    try {
      toast({
        title: "Processing your data",
        description: "Our AI is analyzing your financial information..."
      });
      
      // Process data through our ML model
      const assessmentResult = await processCreditAssessment(
        uploadedFiles,
        transactionsComplete,
        walletComplete
      );
      
      // Update the user's data collection completion status
      if (user) {
        const dataCollection = {
          billsUploaded: billsComplete,
          transactionsConnected: transactionsComplete,
          walletConnected: walletComplete,
          completedAt: new Date().toISOString()
        };
        
        // Store the assessment results
        const creditAssessment = {
          eligible: assessmentResult.riskScore >= 40,
          maxLoanAmount: assessmentResult.maxLoanAmount,
          riskScore: assessmentResult.riskScore,
          interestRate: assessmentResult.interestRate,
          completedAt: new Date().toISOString()
        };

        // Update the user object in context/localStorage
        updateUserData({ 
          dataCollection,
          creditAssessment
        });
      }

      toast({
        title: "ML Analysis complete",
        description: "We've analyzed your financial data using our AI models. Redirecting to your assessment."
      });

      // Navigate to assessment to show the results
      navigate('/assessment');
    } catch (error) {
      console.error('Error during data processing:', error);
      toast({
        title: "Processing error",
        description: "There was an error analyzing your data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-gradient-to-r from-bizblue-700 to-bizblue-900 border-b p-4 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <a href="/" className="text-xl font-bold text-white">
                Loan<span className="text-amber-300">lytic</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmMGYwZjAiPjwvcmVjdD4KPC9zdmc+')]">
        <div className="w-full max-w-3xl">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold mb-2 text-bizblue-800">Complete Your Business Profile</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We need to collect some financial data to assess your eligibility for business credit.
              This helps our ML model provide you with the most accurate loan offers.
            </p>
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-gray-200 rounded-full" indicatorClassName="bg-gradient-to-r from-bizblue-500 to-bizblue-700" />
          </div>

          <Tabs value={step} onValueChange={setStep} className="w-full">
            <TabsList className="grid grid-cols-3 mb-4 bg-gray-100 p-1 rounded-lg shadow-inner">
              <TabsTrigger value="bills" disabled={processing} className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md">
                {billsComplete ? <Check size={16} className="text-green-500" /> : <FileText size={16} />}
                <span className="hidden sm:inline">Utility Bills</span>
              </TabsTrigger>
              <TabsTrigger value="transactions" disabled={processing} className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md">
                {transactionsComplete ? <Check size={16} className="text-green-500" /> : <CreditCard size={16} />}
                <span className="hidden sm:inline">Transactions</span>
              </TabsTrigger>
              <TabsTrigger value="wallet" disabled={processing} className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md">
                {walletComplete ? <Check size={16} className="text-green-500" /> : <Wallet size={16} />}
                <span className="hidden sm:inline">Digital Wallet</span>
              </TabsTrigger>
            </TabsList>

            <Card className="border-none shadow-lg bg-white bg-opacity-95 backdrop-blur-sm">
              <CardContent className="pt-6">
                <TabsContent value="bills">
                  <BillUploader onComplete={handleBillsComplete} />
                </TabsContent>
                <TabsContent value="transactions">
                  <TransactionConnector onComplete={handleTransactionsComplete} />
                </TabsContent>
                <TabsContent value="wallet">
                  <WalletConnector onComplete={handleWalletComplete} />
                </TabsContent>
              </CardContent>

              {billsComplete && transactionsComplete && walletComplete && (
                <CardFooter className="border-t pt-6">
                  <Button 
                    onClick={handleSubmit} 
                    className="w-full bg-gradient-to-r from-bizblue-600 to-bizblue-700 hover:from-bizblue-700 hover:to-bizblue-800 shadow-md"
                    disabled={processing}
                  >
                    {processing ? 'ML Model Processing Your Data...' : 'Run AI Analysis'}
                  </Button>
                </CardFooter>
              )}
            </Card>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Onboarding;
