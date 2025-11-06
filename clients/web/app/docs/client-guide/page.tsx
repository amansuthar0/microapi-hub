export default function ClientGuide() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold">Client Guide</h1>
      <div className="space-y-4 text-neutral-300">
        <div>
          <h2 className="text-xl font-semibold">cURL</h2>
          <pre className="bg-black/60 border border-white/10 p-4 rounded text-sm overflow-x-auto">{`curl -i http://localhost:8080/api/data
# receive 402 with X-PAYMENT-REQUIREMENTS
# construct X-PAYMENT header and retry
curl -H "X-PAYMENT: <base64>" http://localhost:8080/api/data`}</pre>
        </div>
        <div>
          <h2 className="text-xl font-semibold">TypeScript</h2>
          <pre className="bg-black/60 border border-white/10 p-4 rounded text-sm overflow-x-auto">{`// Use x402-fetch (see x402/typescript)
// fetchWithPayment(url, { wallet }) -> Response`}</pre>
        </div>
      </div>
    </main>
  );
}


