export default function GettingStarted() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold">Getting Started</h1>
      <p className="text-neutral-400">MicroAPI Hub implements the x402 payment protocol on Solana, enabling paid API access with on-chain receipts.</p>
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">What is x402?</h2>
        <p className="text-neutral-300">x402 is an open standard (inspired by HTTP 402 Payment Required) for pay-per-use APIs. Clients receive pricing requirements, complete a blockchain payment, and get access with verifiable receipts.</p>
      </div>
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Architecture</h2>
        <ul className="list-disc pl-6 text-neutral-300">
          <li>Facilitator: verifies and settles payments on Solana</li>
          <li>Provider API: serves resources using x402 requirements/responses</li>
          <li>Web UI: discovery, pay, receipts, docs</li>
        </ul>
      </div>
    </main>
  );
}


