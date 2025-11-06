export function getNetwork(): 'devnet' | 'mainnet-beta' | 'testnet' {
  const envNet = (process.env.NEXT_PUBLIC_NETWORK || '').trim();
  if (envNet === 'mainnet' || envNet === 'mainnet-beta') return 'mainnet-beta';
  if (envNet === 'testnet') return 'testnet';
  return 'devnet';
}

export function getRpcUrl(): string | undefined {
  const rpc = (process.env.NEXT_PUBLIC_SOLANA_RPC_URL || '').trim();
  return rpc.length > 0 ? rpc : undefined;
}

export function getExplorerClusterParam(network?: string): string {
  const net = (network || getNetwork());
  if (net === 'devnet') return 'devnet';
  if (net === 'testnet') return 'testnet';
  return '';
}

