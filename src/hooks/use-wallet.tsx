'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { ethers } from 'ethers';
import { useUser } from '@/firebase';

interface WalletContextType {
  wallet: ethers.Wallet | null;
  isWalletLoading: boolean;
  loadWallet: (uid: string, password?: string) => Promise<boolean>;
  logoutWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const { user, isUserLoading } = useUser();
  const [wallet, setWallet] = useState<ethers.Wallet | null>(null);
  const [isWalletLoading, setIsWalletLoading] = useState(true);

  const loadWallet = useCallback(async (uid: string, password?: string) => {
    setIsWalletLoading(true);
    try {
      const encryptedJson = localStorage.getItem(`wallet_${uid}`);
      if (encryptedJson && password) {
        const decryptedWallet = await ethers.Wallet.fromEncryptedJson(encryptedJson, password);
        // We need to connect the wallet to a provider to send transactions,
        // but for now, we just need the wallet instance for the address.
        // In a real app, you'd connect to a Base provider here.
        setWallet(decryptedWallet);
        setIsWalletLoading(false);
        return true;
      }
      setIsWalletLoading(false);
      return false;
    } catch (error) {
      console.error("Failed to load wallet:", error);
      setWallet(null);
      setIsWalletLoading(false);
      return false;
    }
  }, []);

  const logoutWallet = useCallback(() => {
    setWallet(null);
    // Note: We don't remove the wallet from localStorage on logout
    // so the user can log back in.
  }, []);

  // When auth state changes
  React.useEffect(() => {
    if (!isUserLoading) {
      if (user) {
        // User is logged in, but we need the password to load the wallet.
        // This will be handled during the login flow.
        // For session persistence, we might need a different strategy,
        // perhaps storing a session key, but for now, we require login.
        setIsWalletLoading(false); 
      } else {
        // User logged out
        logoutWallet();
        setIsWalletLoading(false);
      }
    }
  }, [user, isUserLoading, logoutWallet]);

  return (
    <WalletContext.Provider value={{ wallet, isWalletLoading, loadWallet, logoutWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
