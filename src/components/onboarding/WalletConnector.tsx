
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

  const wallets = [
    { id: 'paypal', name: 'PayPal', logo: '💳' },
    { id: 'stripe', name: 'Stripe', logo: '💳' },
    { id: 'venmo', name: 'Venmo', logo: '💳' },
    { id: 'square', name: 'Square', logo: '💳' },
    { id: 'cashapp', name: 'Cash App', logo: '💳' },
    { id: 'apple_pay', name: 'Apple Pay', logo: '💳' }
  ];

  const handleWalletSelect = (walletId: string) => {
    setSelectedWallet(walletId);
  };

  const handleConnect = async () => {
    if (!selectedWallet) return;
    
    setConnecting(true);
    try {
      // Simulate API call to connect digital wallet
      await new Promise(resolve => setTimeout(resolve, 2000));
      onComplete();
    } catch (error) {
      console.error('Error connecting digital wallet:', error);
    } finally {
      setConnecting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Connect Your Digital Wallet</h3>
        <p className="text-sm text-muted-foreground">
          Connect your digital payment wallet to provide additional transaction data.
          This helps us better understand your business's cash flow patterns.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {wallets.map(wallet => (
          <Card 
            key={wallet.id} 
            className={`cursor-pointer hover:border-bizblue-400 transition-colors ${
              selectedWallet === wallet.id ? 'border-2 border-bizblue-500' : ''
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
          className="bg-bizblue-600 hover:bg-bizblue-700 mt-2"
          disabled={!selectedWallet || connecting}
        >
          {connecting ? (
            <>Connecting Wallet...</>
          ) : (
            <>
              <Wallet className="mr-2 h-4 w-4" />
              Connect Digital Wallet
            </>
          )}
        </Button>
        <p className="text-xs text-gray-500 text-center">
          We only collect transaction metadata, not your login credentials or personal information.
        </p>
      </div>
    </div>
  );
};

export default WalletConnector;
