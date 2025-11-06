import { Connection, clusterApiUrl, PublicKey, ParsedTransactionWithMeta } from '@solana/web3.js';
import { getNetwork, getRpcUrl, getExplorerClusterParam } from './config';

export interface TransactionDetails {
  signature: string;
  slot?: number;
  blockTime?: number;
  fee?: number;
  success: boolean;
  error?: any;
  network: string;
}

/**
 * Fetch Solana transaction details
 */
export async function getTransactionDetails(
  signature: string,
  network: string = getNetwork()
): Promise<TransactionDetails | null> {
  try {
    const net = network || getNetwork();
    const custom = getRpcUrl();
    const rpcUrl = custom || (net === 'devnet' 
      ? clusterApiUrl('devnet')
      : net === 'mainnet-beta'
      ? clusterApiUrl('mainnet-beta')
      : clusterApiUrl('testnet'));

    const connection = new Connection(rpcUrl, 'confirmed');
    
    const tx = await connection.getTransaction(signature, {
      maxSupportedTransactionVersion: 0
    });

    if (!tx) {
      return null;
    }

    return {
      signature,
      slot: tx.slot,
      blockTime: tx.blockTime ? tx.blockTime * 1000 : undefined,
      fee: tx.meta?.fee,
      success: tx.meta?.err === null,
      error: tx.meta?.err,
      network: net
    };
  } catch (error) {
    console.error('Error fetching transaction:', error);
    return null;
  }
}

/**
 * Get Solscan URL for transaction
 */
export function getSolscanUrl(signature: string, network: string = getNetwork()): string {
  const cluster = getExplorerClusterParam(network);
  return cluster ? `https://solscan.io/tx/${signature}?cluster=${cluster}` : `https://solscan.io/tx/${signature}`;
}

/**
 * Parse a basic transfer summary from a parsed transaction (SOL and simple SPL transfers)
 */
export async function parseTransferSummary(signature: string, network: string = getNetwork()): Promise<{ amount: string; asset: string } | null> {
  try {
    const net = network || getNetwork();
    const custom = getRpcUrl();
    const rpcUrl = custom || (net === 'devnet' 
      ? clusterApiUrl('devnet')
      : net === 'mainnet-beta'
      ? clusterApiUrl('mainnet-beta')
      : clusterApiUrl('testnet'));
    const connection = new Connection(rpcUrl, 'confirmed');
    const tx = await connection.getParsedTransaction(signature, { maxSupportedTransactionVersion: 0 });
    if (!tx || !tx.meta) return null;

    // Try SOL first
    if (typeof tx.meta.fee === 'number') {
      const pre = tx.meta.preBalances?.[0];
      const post = tx.meta.postBalances?.[0];
      if (typeof pre === 'number' && typeof post === 'number' && pre !== post) {
        const delta = Math.abs(post - pre).toString();
        return { amount: delta, asset: 'SOL' };
      }
    }

    // SPL token transfer (very basic heuristic)
    const preToken = tx.meta.preTokenBalances?.[0];
    const postToken = tx.meta.postTokenBalances?.[0];
    if (preToken && postToken && preToken.mint === postToken.mint) {
      const preUi = Number(preToken.uiTokenAmount.uiAmount || 0);
      const postUi = Number(postToken.uiTokenAmount.uiAmount || 0);
      const delta = Math.abs(postUi - preUi);
      const decimals = postToken.uiTokenAmount.decimals || 0;
      const atomic = Math.round(delta * Math.pow(10, decimals)).toString();
      return { amount: atomic, asset: postToken.mint };
    }

    return null;
  } catch {
    return null;
  }
}

