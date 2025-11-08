'use client';

import { useState, useEffect } from 'react';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import { getSolscanUrl } from '../../lib/wallet';

interface TransactionStatusProps {
  signature: string;
  network?: string;
  onConfirmed?: () => void;
  onFailed?: () => void;
}

type Status = 'pending' | 'verifying' | 'confirmed' | 'failed';

export function TransactionStatus({ signature, network = 'devnet', onConfirmed, onFailed }: TransactionStatusProps) {
  const [status, setStatus] = useState<Status>('pending');
  const [confirmationStatus, setConfirmationStatus] = useState<string>('');

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const rpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl('devnet');
        const connection = new Connection(rpcUrl, 'confirmed');

        setStatus('verifying');
        setConfirmationStatus('Checking transaction...');

        // Poll for transaction status
        const maxAttempts = 30;
        let attempts = 0;

        const interval = setInterval(async () => {
          attempts++;
          try {
            const txStatus = await connection.getSignatureStatus(signature, {
              searchTransactionHistory: true,
            });

            if (txStatus.value) {
              const confirmation = txStatus.value.confirmationStatus;
              setConfirmationStatus(confirmation || 'pending');

              if (confirmation === 'confirmed' || confirmation === 'finalized') {
                setStatus('confirmed');
                clearInterval(interval);
                onConfirmed?.();
              } else if (txStatus.value.err) {
                setStatus('failed');
                setConfirmationStatus('Transaction failed');
                clearInterval(interval);
                onFailed?.();
              }
            }

            if (attempts >= maxAttempts) {
              setStatus('failed');
              setConfirmationStatus('Timeout waiting for confirmation');
              clearInterval(interval);
              onFailed?.();
            }
          } catch (error) {
            console.error('Error checking transaction status:', error);
            if (attempts >= maxAttempts) {
              setStatus('failed');
              clearInterval(interval);
              onFailed?.();
            }
          }
        }, 2000); // Check every 2 seconds

        return () => clearInterval(interval);
      } catch (error) {
        console.error('Error setting up status check:', error);
        setStatus('failed');
        onFailed?.();
      }
    };

    if (signature) {
      checkStatus();
    }
  }, [signature, network, onConfirmed, onFailed]);

  const getStatusColor = () => {
    switch (status) {
      case 'confirmed':
        return 'text-green-400';
      case 'failed':
        return 'text-red-400';
      case 'verifying':
        return 'text-brand';
      default:
        return 'text-yellow-400';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'confirmed':
        return '✓';
      case 'failed':
        return '✕';
      case 'verifying':
        return (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-brand"></div>
        );
      default:
        return '⏳';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className={getStatusColor()}>{getStatusIcon()}</span>
        <span className={`text-sm font-medium ${getStatusColor()}`}>
          {status === 'pending' && 'Pending'}
          {status === 'verifying' && 'Verifying...'}
          {status === 'confirmed' && 'Confirmed'}
          {status === 'failed' && 'Failed'}
        </span>
      </div>
      {confirmationStatus && (
        <p className="text-xs text-neutral-400">{confirmationStatus}</p>
      )}
      <a
        href={getSolscanUrl(signature, network)}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-brand hover:underline"
      >
        View on Solscan →
      </a>
    </div>
  );
}

