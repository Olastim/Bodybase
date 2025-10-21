'use client';

import { useUser } from '@/firebase';
import { useWallet } from '@/hooks/use-wallet';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const { wallet, isWalletLoading } = useWallet();
  const { toast } = useToast();
  const firestore = useFirestore();
  const [username, setUsername] = useState('');
  
  useEffect(() => {
    if (user) {
      const fetchUsername = async () => {
        const userDocRef = doc(firestore, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUsername(userDoc.data().username);
        }
      };
      fetchUsername();
    }
  }, [user, firestore]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard!',
    });
  };

  if (isUserLoading || isWalletLoading) {
    return (
       <div>
        <h1 className="text-3xl font-bold font-headline">Profile</h1>
        <p className="text-muted-foreground">Loading your profile...</p>
      </div>
    )
  }

  if (!user || !wallet) {
    return (
       <div>
        <h1 className="text-3xl font-bold font-headline">Profile</h1>
        <p className="text-muted-foreground">Please log in to view your profile.</p>
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
            <Label>Username</Label>
            <p className="text-lg font-mono p-3 bg-muted rounded-md">{username}</p>
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
             <p className="text-lg font-mono p-3 bg-muted rounded-md">{user.email}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="walletAddress">Wallet Address</Label>
            <div className="flex items-center gap-2">
              <Input id="walletAddress" value={wallet.address} readOnly className="font-mono"/>
              <Button variant="ghost" size="icon" onClick={() => handleCopy(wallet.address)}>
                <Copy className="h-5 w-5" />
              </Button>
            </div>
             <p className="text-xs text-muted-foreground">This is your unique address on the Base network.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
