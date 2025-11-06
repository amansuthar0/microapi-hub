export default function Troubleshooting() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold">Troubleshooting</h1>
      <div className="space-y-3 text-neutral-300">
        <div>
          <h2 className="text-xl font-semibold">Transaction not found</h2>
          <p>Ensure you are querying the correct network (devnet vs mainnet). Try again after a few seconds.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">402 but payment fails</h2>
          <p>Check wallet balance, nonce expiration, and signature validity. Review facilitator logs.</p>
        </div>
      </div>
    </main>
  );
}


