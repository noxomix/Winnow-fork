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
          <Image src="../logo.svg" alt="Winnow" width={24} height={24} />
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
            href="https://www.producthunt.com/products/winnow-3?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-winnow-3"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block transition-all hover:opacity-80"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Winnow - Keep the signal. Drop the noise. | Product Hunt"
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1097533&amp;theme=light&amp;t=1773428656356"
              className="h-[30px] w-auto grayscale contrast-125 transition-all duration-300 hover:grayscale-0"
              width="250"
              height="54"
            />
          </a>
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
            {
              label: "PRODUCT HUNT",
              href: "https://www.producthunt.com/products/winnow-3?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-winnow-3",
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
