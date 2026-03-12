"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const tokenData = [
  { text: "Could", importance: 10 },
  { text: "you", importance: 5 },
  { text: "please", importance: 0 },
  { text: "tell", importance: 15 },
  { text: "me", importance: 5 },
  { text: "what", importance: 20 },
  { text: "is", importance: 20 },
  { text: "the", importance: 10 },
  { text: "absolute", importance: 25 },
  { text: "best", importance: 60 },
  { text: "way", importance: 40 },
  { text: "to", importance: 10 },
  { text: "actually", importance: 5 },
  { text: "implement", importance: 80 },
  { text: "a", importance: 10 },
  { text: "binary", importance: 100 },
  { text: "search", importance: 100 },
  { text: "tree", importance: 100 },
  { text: "in", importance: 30 },
  { text: "the", importance: 10 },
  { text: "Python", importance: 100 },
  { text: "programming", importance: 40 },
  { text: "language", importance: 30 },
  { text: "right", importance: 15 },
  { text: "now?", importance: 15 },
];

export default function LiveDemo() {
  const [aggressiveness, setAggressiveness] = useState(0);
  const { ref, isVisible } = useScrollReveal();

  const surviving = tokenData.filter((t) => t.importance >= aggressiveness);
  const survivingCount = surviving.length;
  const savedPct = Math.round(
    ((tokenData.length - survivingCount) / tokenData.length) * 100,
  );

  return (
    <section
      id="demo"
      ref={ref}
      className={`scroll-reveal ${isVisible ? "visible" : ""}`}
    >
      {/* Section label bar */}
      <div className="sticky top-[49px] z-10 flex items-center justify-between border-b border-border bg-background px-4 py-3">
        <span className="text-xs font-bold uppercase tracking-wide">
          Token Compression
        </span>
        <span className="font-mono text-xs text-muted">[INTERACTIVE]</span>
      </div>

      <div className="border-b border-border p-4 sm:p-8">
        {/* Raw input */}
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
            Raw Input
          </span>
          <span className="font-mono text-[10px] text-dim">
            {tokenData.length} TOKENS
          </span>
        </div>
        <div className="mb-8 flex flex-wrap gap-1">
          {tokenData.map((t, i) => {
            const survived = t.importance >= aggressiveness;
            const isKey = t.importance >= 60;

            return (
              <span
                key={i}
                className={`inline-block border px-2 py-1 font-mono text-xs transition-all duration-200 ${
                  survived
                    ? isKey
                      ? "border-foreground/30 font-bold text-foreground"
                      : "border-border text-muted"
                    : "border-transparent text-dim/40 line-through"
                }`}
              >
                {t.text}
              </span>
            );
          })}
        </div>

        {/* Compressed output */}
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
            Compressed Output
          </span>
          <span className="font-mono text-[10px] text-dim">
            {survivingCount} TOKENS · -{savedPct}%
          </span>
        </div>
        <div className="mb-8 border border-border p-3 font-mono text-sm text-foreground">
          {surviving.map((t) => t.text).join(" ") || (
            <span className="text-dim">All tokens removed.</span>
          )}
        </div>

        {/* Slider */}
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
            Aggressiveness
          </span>
          <span className="font-mono text-sm font-bold tabular-nums">
            {aggressiveness}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={aggressiveness}
          onChange={(e) => setAggressiveness(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
    </section>
  );
}
