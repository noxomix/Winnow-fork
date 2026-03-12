"use client";

import { useState, useRef, useCallback } from "react";

const sampleText = [
  { word: "The", keep: false },
  { word: "retrieval", keep: true },
  { word: "augmented", keep: true },
  { word: "generation", keep: true },
  { word: "pipeline", keep: true },
  { word: "essentially", keep: false },
  { word: "works", keep: false },
  { word: "by", keep: false },
  { word: "fetching", keep: true },
  { word: "relevant", keep: true },
  { word: "document", keep: true },
  { word: "chunks", keep: true },
  { word: "from", keep: false },
  { word: "a", keep: false },
  { word: "large", keep: false },
  { word: "vector", keep: true },
  { word: "database", keep: true },
  { word: "and", keep: false },
  { word: "then", keep: false },
  { word: "basically", keep: false },
  { word: "feeding", keep: true },
  { word: "them", keep: false },
  { word: "directly", keep: false },
  { word: "into", keep: false },
  { word: "the", keep: false },
  { word: "LLM", keep: true },
  { word: "context", keep: true },
  { word: "window", keep: true },
  { word: "for", keep: false },
  { word: "processing", keep: true },
];

const removeWords = sampleText
  .map((w, i) => ({ ...w, i }))
  .filter((w) => !w.keep);

export default function Hero() {
  const [phase, setPhase] = useState<"full" | "compressing" | "compressed">(
    "full",
  );
  const [removedIndices, setRemovedIndices] = useState<Set<number>>(new Set());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleCompress = useCallback(() => {
    if (phase === "compressing") return;

    if (phase === "compressed") {
      setPhase("full");
      setRemovedIndices(new Set());
      return;
    }

    setPhase("compressing");
    let idx = 0;

    intervalRef.current = setInterval(() => {
      if (idx < removeWords.length) {
        const wordIndex = removeWords[idx].i;
        setRemovedIndices((prev) => new Set([...prev, wordIndex]));
        idx++;
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setPhase("compressed");
      }
    }, 100);
  }, [phase]);

  const keptCount = sampleText.filter((w) => w.keep).length;
  const currentRemoved = removedIndices.size;
  const currentTokens = sampleText.length - currentRemoved;
  const pct = Math.round((currentRemoved / sampleText.length) * 100);

  return (
    <section className="mt-[49px]">
      {/* Giant title */}
      <div className="border-b border-border px-4 py-10 sm:py-16">
        <h1 className="text-[clamp(2.5rem,9vw,9rem)] font-bold uppercase leading-[0.9] tracking-[-0.04em]">
          Keep the
          <br />
          signal.
        </h1>
        <p className="mt-4 text-[clamp(1rem,3vw,2rem)] font-bold uppercase leading-[0.9] tracking-[-0.02em] text-muted">
          Drop the noise.
        </p>
      </div>

      {/* Description grid */}
      <div className="grid grid-cols-1 border-b border-border sm:grid-cols-12">
        <div className="border-b border-border p-4 sm:col-span-8 sm:border-b-0 sm:border-r">
          <p className="max-w-[48ch] text-[15px] font-medium uppercase leading-relaxed text-muted">
            Open-source middleware that compresses RAG context before it hits
            the LLM - cutting token costs by ~50% with {"<"}3% accuracy loss.
          </p>
        </div>
        <div className="flex items-end p-4 font-mono text-xs text-dim sm:col-span-4">
          V0.1.1 · LLMLINGUA-2 · MIT
        </div>
      </div>

      {/* Live compression animation */}
      <div className="border-b border-border">
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <span className="font-mono text-[10px] font-bold tracking-widest text-muted">
            {phase === "full"
              ? "RAW CONTEXT"
              : phase === "compressing"
                ? "COMPRESSING..."
                : "COMPRESSED"}
          </span>
          <span className="font-mono text-[10px] text-dim">
            {currentTokens}/{sampleText.length} TOKENS ·{" "}
            {pct > 0 ? `-${pct}%` : "0%"}
          </span>
        </div>
        <div className="flex min-h-[120px] flex-wrap items-start gap-1 px-4 py-6 sm:min-h-[100px] sm:px-6">
          {sampleText.map((w, i) => {
            const removed = removedIndices.has(i);
            return (
              <span
                key={i}
                className="inline-block font-mono text-sm transition-all duration-300"
                style={{
                  opacity: removed ? 0 : 1,
                  transform: removed ? "scale(0.7)" : "scale(1)",
                  width: removed ? 0 : "auto",
                  paddingLeft: removed ? 0 : "4px",
                  paddingRight: removed ? 0 : "4px",
                  overflow: "hidden",
                  fontWeight: w.keep ? 700 : 400,
                  color: w.keep ? "#000" : "#999",
                }}
              >
                {w.word}
              </span>
            );
          })}
        </div>
        <div className="flex items-center justify-between border-t border-border px-4 py-2">
          <span className="font-mono text-[10px] text-dim">
            SIGNAL: {keptCount} TOKENS PRESERVED · NOISE:{" "}
            {sampleText.length - keptCount} TOKENS REMOVED
          </span>
          <button
            onClick={handleCompress}
            disabled={phase === "compressing"}
            className="border border-border px-4 py-1.5 font-mono text-[10px] font-bold tracking-widest transition-colors hover:bg-foreground hover:text-background disabled:opacity-40"
          >
            {phase === "compressed" ? "RESET" : "COMPRESS"}
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 border-b border-border sm:grid-cols-4">
        {[
          { pill: "01", value: "~50%", label: "TOKEN REDUCTION" },
          { pill: "02", value: "<3pt", label: "F1 SCORE DROP" },
          { pill: "03", value: "85ms", label: "AVG LATENCY" },
          { pill: "04", value: "0", label: "CODE CHANGES W/ OPENAI SDK" },
        ].map((stat, i) => (
          <div
            key={i}
            className="flex h-[150px] flex-col justify-between border-b border-r border-border p-3 sm:border-b-0"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background">
              {stat.pill}
            </span>
            <div>
              <div className="font-mono text-3xl font-light">{stat.value}</div>
              <small className="text-[10px] font-bold tracking-widest text-muted">
                {stat.label}
              </small>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
