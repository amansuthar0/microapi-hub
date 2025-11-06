"use client";
import { useState } from 'react';
import { Button } from './ui/Button';
import Link from 'next/link';
import { WalletButton } from './wallet/WalletButton';
import { ThemeToggle } from './ui/ThemeToggle';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/transactions', label: 'Transactions' },
  { href: '/receipt', label: 'Receipt' },
  { href: '/docs', label: 'Docs' },
  { href: '/api', label: 'API Docs' },
];

export function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur border-b border-white/10 bg-surface-200/40">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        {/* Brand / logo */}
        <Link className="font-semibold tracking-wide text-white text-lg" href="/">MicroAPI Hub</Link>
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-4 text-sm text-neutral-300">
          {navLinks.map((l) => (
            <Link href={l.href} key={l.label} className={`hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 rounded px-2 py-1`}>{l.label}</Link>
          ))}
          <div className="relative group">
            <button className="px-2 py-1 rounded hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40">Docs ▾</button>
            <div className="absolute hidden group-hover:block top-full left-0 mt-2 bg-slate-900 border border-white/10 rounded shadow-lg min-w-[220px]">
              <div className="p-2 flex flex-col text-neutral-300">
                <Link className="px-3 py-2 rounded hover:bg-white/5" href="/docs/getting-started">Getting Started</Link>
                <Link className="px-3 py-2 rounded hover:bg-white/5" href="/docs/installation">Installation</Link>
                <Link className="px-3 py-2 rounded hover:bg-white/5" href="/docs/configuration">Configuration</Link>
                <Link className="px-3 py-2 rounded hover:bg-white/5" href="/docs/solana-setup">Solana Setup</Link>
                <Link className="px-3 py-2 rounded hover:bg-white/5" href="/docs/provider-guide">Provider Guide</Link>
                <Link className="px-3 py-2 rounded hover:bg-white/5" href="/docs/client-guide">Client Guide</Link>
                <Link className="px-3 py-2 rounded hover:bg-white/5" href="/docs/api-reference">API Reference</Link>
                <Link className="px-3 py-2 rounded hover:bg-white/5" href="/docs/troubleshooting">Troubleshooting</Link>
                <Link className="px-3 py-2 rounded hover:bg-white/5" href="/docs?ref=solana">Solana Reference</Link>
              </div>
            </div>
          </div>
          <div className="ml-2">
            <ThemeToggle />
          </div>
          <div className="ml-2">
            <WalletButton />
          </div>
        </nav>
        {/* Hamburger menu for mobile */}
        <button aria-label="Open menu" className="md:hidden text-white p-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40" onClick={() => setDrawerOpen(true)}>
          <svg width="26" height="26" fill="none" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
        {/* Mobile drawer */}
        {drawerOpen && (
          <div className="fixed md:hidden inset-0 z-50 bg-black/60 flex">
            <nav className="bg-slate-950 w-64 min-h-full p-6 flex flex-col gap-4 animate-slide-in">
              <button aria-label="Close menu" className="self-end text-white p-2" onClick={() => setDrawerOpen(false)}>
                <svg width="26" height="26" fill="none" viewBox="0 0 24 24"><path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
              <Link href="/" className="font-semibold text-xl text-brand mb-4" onClick={() => setDrawerOpen(false)}>MicroAPI Hub</Link>
              {navLinks.map((l) => (
                <Link href={l.href} key={l.label} onClick={() => setDrawerOpen(false)} className={`block px-2 py-2 rounded hover:bg-brand/10 ${l.label === 'API Docs' ? 'font-semibold text-brand' : 'text-white'}`}>{l.label}</Link>
              ))}
              <div className="pt-2 border-t border-white/10 mt-2" />
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wide text-neutral-500 px-2">Docs</span>
                <Link href="/docs/getting-started" onClick={() => setDrawerOpen(false)} className="block px-2 py-2 rounded hover:bg-white/5 text-neutral-300">Getting Started</Link>
                <Link href="/docs/installation" onClick={() => setDrawerOpen(false)} className="block px-2 py-2 rounded hover:bg-white/5 text-neutral-300">Installation</Link>
                <Link href="/docs/configuration" onClick={() => setDrawerOpen(false)} className="block px-2 py-2 rounded hover:bg-white/5 text-neutral-300">Configuration</Link>
                <Link href="/docs/solana-setup" onClick={() => setDrawerOpen(false)} className="block px-2 py-2 rounded hover:bg-white/5 text-neutral-300">Solana Setup</Link>
                <Link href="/docs/provider-guide" onClick={() => setDrawerOpen(false)} className="block px-2 py-2 rounded hover:bg-white/5 text-neutral-300">Provider Guide</Link>
                <Link href="/docs/client-guide" onClick={() => setDrawerOpen(false)} className="block px-2 py-2 rounded hover:bg-white/5 text-neutral-300">Client Guide</Link>
                <Link href="/docs/api-reference" onClick={() => setDrawerOpen(false)} className="block px-2 py-2 rounded hover:bg-white/5 text-neutral-300">API Reference</Link>
                <Link href="/docs/troubleshooting" onClick={() => setDrawerOpen(false)} className="block px-2 py-2 rounded hover:bg-white/5 text-neutral-300">Troubleshooting</Link>
                <Link href="/docs?ref=solana" onClick={() => setDrawerOpen(false)} className="block px-2 py-2 rounded hover:bg-white/5 text-neutral-300">Solana Reference</Link>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <ThemeToggle />
                <WalletButton />
              </div>
            </nav>
            <div className="flex-grow" onClick={() => setDrawerOpen(false)} />
          </div>
        )}
      </div>
    </header>
  );
}


