"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background">
      <div className="flex h-[49px] items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-bold tracking-tight"
        >
          <Image src="/logo.svg" alt="Winnow" width={24} height={24} />
          <span className="text-base font-extrabold tracking-tight">
            WINNOW
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {[
            { label: "DOCS", href: "/docs" },
            { label: "BENCHMARKS", href: "/benchmarks" },
            { label: "HOW IT WORKS", href: "/how-it-works" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-bold tracking-wide text-muted transition-colors hover:text-foreground hover:line-through"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/company/winnow-compress/about/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-xs font-bold tracking-wide text-muted hover:text-foreground hover:line-through md:block"
          >
            LINKEDIN
          </a>
          <a
            href="https://github.com/itsaryanchauhan/Winnow"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-xs font-bold tracking-wide text-muted hover:text-foreground hover:line-through md:block"
          >
            GITHUB
          </a>
          <button
            className="text-lg font-bold md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? "✕" : "≡"}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          {[
            { label: "DOCS", href: "/docs" },
            { label: "BENCHMARKS", href: "/benchmarks" },
            { label: "HOW IT WORKS", href: "/how-it-works" },
            {
              label: "LINKEDIN",
              href: "https://www.linkedin.com/company/winnow-compress/about/",
            },
            {
              label: "GITHUB",
              href: "https://github.com/itsaryanchauhan/Winnow",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-2 text-xs font-bold tracking-wide text-muted hover:text-foreground"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
