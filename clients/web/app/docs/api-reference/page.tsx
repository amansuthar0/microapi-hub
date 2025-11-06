async function fetchDiscovery() {
  const url = process.env.NEXT_PUBLIC_PROVIDER_DISCOVERY_URL ?? 'http://localhost:8080/.well-known/x402';
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function ApiReference() {
  const discovery = await fetchDiscovery();
  const items: Array<{ route: string; requirements: any }> = discovery?.accepts ?? [];
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold">API Reference</h1>
      {items.length === 0 ? (
        <div className="text-neutral-400 border-l-4 border-brand/50 pl-4 py-4 rounded bg-slate-900">No endpoints exposed by provider.</div>
      ) : (
        <div className="space-y-8">
          {items.map((it) => (
            <div key={it.route} className="border rounded bg-slate-900 border-brand/10 p-6 space-y-2">
              <div>
                <span className="text-brand font-mono text-xs px-2 py-1 rounded bg-brand/20">{it.requirements.method ?? 'GET'}</span>
                <span className="font-semibold ml-2">{it.route}</span>
              </div>
              <div className="text-sm text-neutral-300">{it.requirements?.description ?? 'No description'}</div>
              <pre className="bg-black/60 border border-white/10 p-3 rounded text-xs overflow-x-auto">{`curl \
  -H "X-PAYMENT: <base64-encoded-payload>" \
  ${it.route.startsWith('http') ? it.route : `http://localhost:8080${it.route}`}
`}</pre>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}


