/**
 * Wallet abstraction layer
 * Supports multiple wallet providers with auto-detection
 */
import { PublicKey, Transaction } from '@solana/web3.js';
import type { WalletAdapter } from '@solana/wallet-adapter-base';

export interface WalletProvider {
  name: string;
  adapter: WalletAdapter | null;
  connected: boolean;
  publicKey: PublicKey | null;
}

/**
 * Wallet abstraction manager
 */
export class WalletAbstraction {
  private wallets: Map<string, WalletProvider> = new Map();
  private currentWallet: WalletProvider | null = null;

  /**
   * Register a wallet adapter
   */
  registerWallet(name: string, adapter: WalletAdapter): void {
    this.wallets.set(name, {
      name,
      adapter,
      connected: adapter.connected,
      publicKey: adapter.publicKey
    });
  }

  /**
   * Auto-detect available wallets
   */
  async autoDetectWallets(): Promise<string[]> {
    const available: string[] = [];

    // Check for Phantom
    if (typeof window !== 'undefined' && (window as any).solana?.isPhantom) {
      available.push('phantom');
    }

    // Check for Backpack
    if (typeof window !== 'undefined' && (window as any).backpack) {
      available.push('backpack');
    }

    // Check for Solflare
    if (typeof window !== 'undefined' && (window as any).solflare) {
      available.push('solflare');
    }

    return available;
  }

  /**
   * Connect to a wallet
   */
  async connectWallet(name: string): Promise<void> {
    const wallet = this.wallets.get(name);
    if (!wallet || !wallet.adapter) {
      throw new Error(`Wallet ${name} not found`);
    }

    await wallet.adapter.connect();
    this.currentWallet = wallet;
  }

  /**
   * Disconnect current wallet
   */
  async disconnectWallet(): Promise<void> {
    if (this.currentWallet?.adapter) {
      await this.currentWallet.adapter.disconnect();
      this.currentWallet = null;
    }
  }

  /**
   * Get current wallet
   */
  getCurrentWallet(): WalletProvider | null {
    return this.currentWallet;
  }

  /**
   * Sign transaction with current wallet
   * Note: WalletAdapter doesn't have signTransaction, so this method is deprecated
   * Use the wallet adapter's sendTransaction or signMessage methods instead
   */
  async signTransaction(tx: Transaction): Promise<Transaction> {
    if (!this.currentWallet?.adapter) {
      throw new Error('No wallet connected');
    }

    // WalletAdapter doesn't have signTransaction - this is a placeholder
    // In practice, you should use sendTransaction or signMessage
    throw new Error('signTransaction is not available on WalletAdapter. Use sendTransaction or signMessage instead.');
  }

  /**
   * Get public key of current wallet
   */
  getPublicKey(): PublicKey | null {
    return this.currentWallet?.publicKey || null;
  }
}

/**
 * Session-based signing for repeated microtransactions
 * Implements EIP-3074-like flow for Solana
 */
export class SessionSigning {
  private sessionKey: { publicKey: PublicKey; privateKey: Uint8Array } | null = null;
  private expiry: number = 0;

  /**
   * Create a session key
   */
  async createSession(wallet: WalletAdapter, durationMs: number = 24 * 60 * 60 * 1000): Promise<PublicKey> {
    // Generate session keypair
    const { Keypair } = await import('@solana/web3.js');
    const sessionKeypair = Keypair.generate();

    // Sign session key with wallet (authorization)
    const message = Buffer.from(JSON.stringify({
      sessionKey: sessionKeypair.publicKey.toBase58(),
      expiry: Date.now() + durationMs,
      purpose: 'microapi-session'
    }));

    // TODO: Implement actual wallet signing of session key
    // For now, store session key (in production, this should be signed by wallet)
    this.sessionKey = {
      publicKey: sessionKeypair.publicKey,
      privateKey: sessionKeypair.secretKey
    };
    this.expiry = Date.now() + durationMs;

    return sessionKeypair.publicKey;
  }

  /**
   * Check if session is valid
   */
  isSessionValid(): boolean {
    return this.sessionKey !== null && Date.now() < this.expiry;
  }

  /**
   * Sign transaction with session key
   */
  async signTransaction(tx: Transaction): Promise<Transaction> {
    if (!this.sessionKey || !this.isSessionValid()) {
      throw new Error('Session expired or not initialized');
    }

    const { Keypair } = await import('@solana/web3.js');
    const keypair = Keypair.fromSecretKey(this.sessionKey.privateKey);
    tx.sign(keypair);
    return tx;
  }

  /**
   * Get session public key
   */
  getSessionPublicKey(): PublicKey | null {
    return this.sessionKey?.publicKey || null;
  }
}

