/**
 * Multi-wallet selector component
 */
'use client';

import { useState, useEffect } from 'react';
import { WalletAbstraction } from '../../lib/wallet-abstraction';
import { useWallet } from '@solana/wallet-adapter-react';

export function WalletSelector() {
  const { wallet, connect, disconnect, connected, publicKey } = useWallet();
  const [availableWallets, setAvailableWallets] = useState<string[]>([]);
  const [walletAbstraction] = useState(() => new WalletAbstraction());

  useEffect(() => {
    walletAbstraction.autoDetectWallets().then(setAvailableWallets);
  }, [walletAbstraction]);

  const handleConnect = async (walletName: string) => {
    try {
      await walletAbstraction.connectWallet(walletName);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <div className="wallet-selector">
      {availableWallets.map(name => (
        <button
          key={name}
          onClick={() => handleConnect(name)}
          className="wallet-button"
        >
          Connect {name}
        </button>
      ))}
    </div>
  );
}

