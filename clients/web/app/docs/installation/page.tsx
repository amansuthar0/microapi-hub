export default function Installation() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold">Installation</h1>
      <div className="space-y-4 text-neutral-300">
        <div>
          <h2 className="text-xl font-semibold">Prerequisites</h2>
          <ul className="list-disc pl-6">
            <li>Node 20+, pnpm 8+</li>
            <li>Solana CLI (optional for local ops)</li>
            <li>Docker (optional)</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Clone & Install</h2>
          <pre className="bg-black/60 border border-white/10 p-4 rounded text-sm overflow-x-auto">{`git clone https://github.com/0xsupremedev/microapi-hub
cd microapi-hub
pnpm install`}</pre>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Run</h2>
          <pre className="bg-black/60 border border-white/10 p-4 rounded text-sm overflow-x-auto">{`# Web client
cd clients/web
pnpm dev

# Services (facilitator/provider)
cd ../../services/facilitator && pnpm dev
cd ../provider-api && pnpm dev`}</pre>
        </div>
      </div>
    </main>
  );
}


