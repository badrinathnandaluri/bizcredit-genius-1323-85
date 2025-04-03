
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, CheckCircle } from 'lucide-react';

interface TransactionConnectorProps {
  onComplete: () => void;
}

const TransactionConnector: React.FC<TransactionConnectorProps> = ({ onComplete }) => {
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

  // Updated with Indian Banks
  const banks = [
    { id: 'sbi', name: 'State Bank of India', logo: '🏦' },
    { id: 'icici', name: 'ICICI Bank', logo: '🏦' },
    { id: 'hdfc', name: 'HDFC Bank', logo: '🏦' },
    { id: 'pnb', name: 'Punjab National Bank', logo: '🏦' },
    { id: 'axis', name: 'Axis Bank', logo: '🏦' },
    { id: 'central_bank', name: 'Central Bank of India', logo: '🏦' }
  ];

  const handleBankSelect = (bankId: string) => {
    setSelectedBank(bankId);
  };

  const handleConnect = async () => {
    if (!selectedBank) return;
    
    setConnecting(true);
    try {
      // Simulate API call to connect to bank
      await new Promise(resolve => setTimeout(resolve, 2000));
      onComplete();
    } catch (error) {
      console.error('Error connecting to bank:', error);
    } finally {
      setConnecting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Connect Your Bank Account</h3>
        <p className="text-sm text-muted-foreground">
          Connect your business bank account to share transaction history.
          We use secure banking APIs and never store your login credentials.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {banks.map(bank => (
          <Card 
            key={bank.id} 
            className={`cursor-pointer hover:border-bizblue-400 transition-colors shadow-md hover:shadow-lg ${
              selectedBank === bank.id ? 'border-2 border-bizblue-500 bg-gradient-to-br from-blue-50 to-white' : 'bg-white'
            }`}
            onClick={() => handleBankSelect(bank.id)}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <div className="text-2xl mb-2">{bank.logo}</div>
              <div className="text-sm font-medium">{bank.name}</div>
              {selectedBank === bank.id && (
                <CheckCircle className="h-4 w-4 text-green-500 mt-2" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col space-y-2">
        <Button
          onClick={handleConnect}
          className="bg-gradient-to-r from-bizblue-600 to-bizblue-700 hover:from-bizblue-700 hover:to-bizblue-800 mt-2 shadow-md"
          disabled={!selectedBank || connecting}
        >
          {connecting ? (
            <>Connecting to Bank...</>
          ) : (
            <>
              <CreditCard className="mr-2 h-4 w-4" />
              Connect Bank Account
            </>
          )}
        </Button>
        <p className="text-xs text-gray-500 text-center">
          By connecting your account, you're allowing read-only access to your transaction history.
        </p>
      </div>
    </div>
  );
};

export default TransactionConnector;
