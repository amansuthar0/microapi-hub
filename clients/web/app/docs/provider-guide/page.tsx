export default function ProviderGuide() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold">Provider Guide</h1>
      <p className="text-neutral-400">Expose endpoints with x402 requirements and serve resources after payment.</p>
      <div className="space-y-4 text-neutral-300">
        <div>
          <h2 className="text-xl font-semibold">Discovery</h2>
          <pre className="bg-black/60 border border-white/10 p-4 rounded text-sm overflow-x-auto">{`GET /.well-known/x402 -> {
  "accepts": [
    {
      "route": "/api/data",
      "requirements": {
        "method": "GET",
        "network": "solana-devnet",
        "asset": "SOL",
        "maxAmountRequired": "5000"
      }
    }
  ]
}`}</pre>
        </div>
        <div>
          <h2 className="text-xl font-semibold">402 Response</h2>
          <pre className="bg-black/60 border border-white/10 p-4 rounded text-sm overflow-x-auto">{`HTTP/1.1 402 Payment Required
X-PAYMENT-REQUIREMENTS: <base64 json>
`}</pre>
        </div>
      </div>
    </main>
  );
}


