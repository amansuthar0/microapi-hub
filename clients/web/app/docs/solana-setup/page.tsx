export default function SolanaSetup() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold">Solana Setup</h1>
      <div className="space-y-4 text-neutral-300">
        <div>
          <h2 className="text-xl font-semibold">Networks & RPC</h2>
          <ul className="list-disc pl-6">
            <li>Devnet RPC: https://api.devnet.solana.com</li>
            <li>Mainnet RPC (example): https://api.mainnet-beta.solana.com</li>
            <li>Testnet RPC: https://api.testnet.solana.com</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Wallet</h2>
          <p>Use Phantom or Solflare in the browser. Airdrop SOL on devnet with Solana CLI:</p>
          <pre className="bg-black/60 border border-white/10 p-4 rounded text-sm overflow-x-auto">{`solana config set --url https://api.devnet.solana.com
solana airdrop 2`}</pre>
        </div>
      </div>
    </main>
  );
}


