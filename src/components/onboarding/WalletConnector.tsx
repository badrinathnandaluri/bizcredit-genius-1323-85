
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Wallet, CheckCircle } from 'lucide-react';

interface WalletConnectorProps {
  onComplete: () => void;
}

const WalletConnector: React.FC<WalletConnectorProps> = ({ onComplete }) => {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

  // Updated with Indian Digital Wallets
  const wallets = [
    { id: 'phonepe', name: 'PhonePe', logo: '💸' },
    { id: 'gpay', name: 'Google Pay', logo: '💳' },
    { id: 'paytm', name: 'Paytm', logo: '💰' },
    { id: 'paypal', name: 'PayPal', logo: '💲' },
    { id: 'amazonpay', name: 'Amazon Pay', logo: '💵' },
    { id: 'mobikwik', name: 'MobiKwik', logo: '💹' }
  ];

  const handleWalletSelect = (walletId: string) => {
    setSelectedWallet(walletId);
  };

  const handleConnect = async () => {
    if (!selectedWallet) return;
    
    setConnecting(true);
    try {
      // Simulate API call to connect to wallet
      await new Promise(resolve => setTimeout(resolve, 2000));
      onComplete();
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    } finally {
      setConnecting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Connect Your Digital Wallet</h3>
        <p className="text-sm text-muted-foreground">
          Connect your digital wallet to share payment history.
          We use secure APIs and never store your login credentials.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {wallets.map(wallet => (
          <Card 
            key={wallet.id} 
            className={`cursor-pointer hover:border-bizblue-400 transition-colors shadow-md hover:shadow-lg ${
              selectedWallet === wallet.id ? 'border-2 border-bizblue-500 bg-gradient-to-br from-blue-50 to-white' : 'bg-white'
            }`}
            onClick={() => handleWalletSelect(wallet.id)}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <div className="text-2xl mb-2">{wallet.logo}</div>
              <div className="text-sm font-medium">{wallet.name}</div>
              {selectedWallet === wallet.id && (
                <CheckCircle className="h-4 w-4 text-green-500 mt-2" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col space-y-2">
        <Button
          onClick={handleConnect}
          className="professional-gradient hover:from-bizblue-800 hover:to-bizblue-700 mt-2 shadow-md"
          disabled={!selectedWallet || connecting}
        >
          {connecting ? (
            <>Connecting to Wallet...</>
          ) : (
            <>
              <Wallet className="mr-2 h-4 w-4" />
              Connect Digital Wallet
            </>
          )}
        </Button>
        <p className="text-xs text-gray-500 text-center">
          By connecting your digital wallet, you're allowing read-only access to your transaction history.
        </p>
      </div>
    </div>
  );
};

export default WalletConnector;
