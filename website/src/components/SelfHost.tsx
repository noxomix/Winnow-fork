"use client";

import { useState } from "react";

const dockerCmd = "docker run -p 8000:8000 itsaryanchauhan/winnow";

export default function SelfHost() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(dockerCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section>
      {/* CTA */}
      <div className="flex flex-col items-center justify-center border-b border-border px-4 py-10 text-center sm:py-16">
        <h2 className="text-[clamp(2rem,6vw,6rem)] font-bold uppercase leading-[0.9] tracking-[-0.04em]">
          Self-Host
          <br />
          In Seconds
        </h2>
        <p className="mt-4 text-xs font-bold uppercase tracking-widest text-muted">
          One command · No cloud · No API key
        </p>
      </div>

      {/* Terminal command */}
      <div className="grid grid-cols-1 border-b border-border sm:grid-cols-12">
        <div className="flex items-center justify-between border-b border-border p-4 font-mono sm:col-span-9 sm:border-b-0 sm:border-r">
          <code className="text-sm">
            <span className="text-dim">$ </span>
            {dockerCmd}
          </code>
          <button
            onClick={handleCopy}
            className="ml-4 shrink-0 text-[10px] font-bold tracking-wide text-muted hover:text-foreground hover:line-through"
          >
            {copied ? "COPIED" : "COPY"}
          </button>
        </div>
        <div className="flex flex-col justify-center p-4 font-mono text-xs text-muted sm:col-span-3">
          <div>→ localhost:8000</div>
          <div>→ /health</div>
          <div>→ /compress</div>
        </div>
      </div>
    </section>
  );
}
