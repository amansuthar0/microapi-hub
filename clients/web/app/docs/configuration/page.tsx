export default function Configuration() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold">Configuration</h1>
      <p className="text-neutral-400">Environment variables to customize networks and endpoints.</p>
      <div className="space-y-4 text-neutral-300">
        <div>
          <h2 className="text-xl font-semibold">Web App</h2>
          <pre className="bg-black/60 border border-white/10 p-4 rounded text-sm overflow-x-auto">{`# clients/web/.env.local
NEXT_PUBLIC_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_PROVIDER_DISCOVERY_URL=http://localhost:8080/.well-known/x402`}</pre>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Sample .env.local</h2>
          <pre className="bg-black/60 border border-white/10 p-4 rounded text-sm overflow-x-auto">{`# Network: devnet | mainnet-beta | testnet
NEXT_PUBLIC_NETWORK=devnet

# Optional custom RPC (overrides default cluster API)
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com

# Provider discovery URL for API reference
NEXT_PUBLIC_PROVIDER_DISCOVERY_URL=http://localhost:8080/.well-known/x402`}</pre>
        </div>
      </div>
    </main>
  );
}


