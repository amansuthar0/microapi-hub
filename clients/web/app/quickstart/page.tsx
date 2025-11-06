export default function Quickstart() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Quickstart</h1>
      <p className="text-neutral-400 mb-6">Get started in minutes with MicroAPI Hub.</p>
      <div className="space-y-4 text-neutral-300">
        <div>
          <h2 className="text-xl font-semibold">1) Install</h2>
          <pre className="bg-black/60 border border-white/10 p-4 rounded text-sm overflow-x-auto">{`pnpm install`}</pre>
        </div>
        <div>
          <h2 className="text-xl font-semibold">2) Configure</h2>
          <pre className="bg-black/60 border border-white/10 p-4 rounded text-sm overflow-x-auto">{`# clients/web/.env.local
NEXT_PUBLIC_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_PROVIDER_DISCOVERY_URL=http://localhost:8080/.well-known/x402`}</pre>
        </div>
        <div>
          <h2 className="text-xl font-semibold">3) Run</h2>
          <pre className="bg-black/60 border border-white/10 p-4 rounded text-sm overflow-x-auto">{`# Web client
cd clients/web
pnpm dev`}</pre>
        </div>
        <div>
          <h2 className="text-xl font-semibold">4) Use</h2>
          <ul className="list-disc pl-6">
            <li>Browse Docs: /docs</li>
            <li>API Reference: /docs/api-reference</li>
            <li>Transactions & Receipts: /transactions, /receipt</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
