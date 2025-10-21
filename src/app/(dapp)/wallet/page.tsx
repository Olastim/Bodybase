'use client';

import { usePrivy } from '@privy-io/react-auth';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Send, ArrowDownToLine } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { BaseIcon } from '@/components/icons';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function WalletPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { ready, authenticated, user } = usePrivy();
  
  const smartWallet = user?.linkedAccounts.find(
    (account) => account.type === 'smart_wallet'
  );

   useEffect(() => {
    if (ready && !authenticated) {
      router.push('/');
    }
  }, [ready, authenticated, router]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard!',
    });
  };

  if (!ready || !authenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline">My Wallet</h1>
      
      <Card className="glass-card max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Smart Wallet</span>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BaseIcon className="w-5 h-5"/>
                <span>Base Mainnet</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="walletAddress">Your Address</Label>
            {ready && smartWallet ? (
              <div className="flex items-center gap-2">
                <Input id="walletAddress" value={smartWallet.address} readOnly className="font-mono"/>
                <Button variant="ghost" size="icon" onClick={() => handleCopy(smartWallet.address)}>
                  <Copy className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <p className="text-lg font-mono p-3 bg-muted rounded-md animate-pulse">Loading wallet...</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Balance</Label>
            <div className="text-4xl font-bold font-mono p-3 bg-muted rounded-md flex items-center gap-4">
                <span>0.00</span>
                <span className="text-2xl text-muted-foreground">ETH</span>
            </div>
             <p className="text-xs text-muted-foreground">This is a placeholder balance.</p>
          </div>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-4">
            <Button size="lg" disabled>
                <Send className="mr-2 h-4 w-4" /> Send
            </Button>
            <Button size="lg" variant="secondary" disabled>
                <ArrowDownToLine className="mr-2 h-4 w-4" /> Receive
            </Button>
        </CardFooter>
      </Card>
       <Card className="glass-card max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground text-center">No transactions yet.</p>
        </CardContent>
      </Card>
    </div>
  );
}
