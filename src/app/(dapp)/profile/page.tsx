'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useWallets } from '@privy-io/wagmi';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { toast } = useToast();
  const router = useRouter();
  const { ready, authenticated, user } = usePrivy();
  const { wallets } = useWallets();

  const smartWallet = wallets.find((wallet) => wallet.connectorType === 'privy');

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

  if (!ready || (ready && !authenticated)) {
    return (
       <div>
        <h1 className="text-3xl font-bold font-headline">Profile</h1>
        <p className="text-muted-foreground">Loading your profile...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline">Profile</h1>
      
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Your BodyBase Identity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
           <div className="space-y-2">
            <Label>Email</Label>
             <p className="text-lg font-mono p-3 bg-muted rounded-md">{user?.email?.address}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="walletAddress">Smart Wallet Address</Label>
            {smartWallet ? (
              <>
                <div className="flex items-center gap-2">
                  <Input id="walletAddress" value={smartWallet.address} readOnly className="font-mono"/>
                  <Button variant="ghost" size="icon" onClick={() => handleCopy(smartWallet.address)}>
                    <Copy className="h-5 w-5" />
                  </Button>
                </div>
                 <p className="text-xs text-muted-foreground">This is your smart wallet address on the Base network.</p>
              </>
            ) : (
               <p className="text-lg font-mono p-3 bg-muted rounded-md">Creating your smart wallet...</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
