"use client";

import { useState } from "react";

const placeholder =
  "The retrieval augmented generation pipeline essentially works by fetching relevant document chunks from a large vector database and then basically feeding them directly into the LLM context window for processing.";

export default function TryIt() {
  const [input, setInput] = useState(placeholder);
  const [ratio, setRatio] = useState(0.5);
  const [result, setResult] = useState<{
    output: string;
    original_tokens: number;
    compressed_tokens: number;
    ratio: number;
    diff: string | null;
    estimated_savings_usd: number | null;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCompress = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/compress`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            input: input,
            compression_ratio: ratio,
          }),
        },
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setResult(data);
    } catch {
      setError(
        "Failed to reach the API. The HuggingFace Space may be waking up - try again in a moment.",
      );
    } finally {
      setLoading(false);
    }
  };

  const reduction = result
    ? Math.round(
        ((result.original_tokens - result.compressed_tokens) /
          result.original_tokens) *
          100,
      )
    : 0;

  return (
    <section id="try">
      {/* Section label */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-xs font-bold uppercase tracking-wide">
          Try It Live
        </span>
        <span className="font-mono text-xs text-muted">[API]</span>
      </div>

      <div className="border-b border-border p-4 sm:p-8">
        {/* Input area */}
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
            Context
          </span>
          <span className="font-mono text-[10px] text-dim">
            PASTE YOUR TEXT
          </span>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          className="mb-6 w-full resize-y border border-border bg-surface p-3 font-mono text-xs leading-relaxed text-foreground outline-none focus:border-foreground"
          placeholder="Paste your RAG context here..."
        />

        {/* Ratio */}
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
              Compression Ratio
            </span>
            <span className="font-mono text-xs font-bold tabular-nums">
              {ratio}
            </span>
          </div>
          <input
            type="range"
            min="0.1"
            max="0.9"
            step="0.1"
            value={ratio}
            onChange={(e) => setRatio(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Compress button */}
        <button
          onClick={handleCompress}
          disabled={loading || !input.trim()}
          className="w-full border border-border bg-foreground px-6 py-3 font-mono text-xs font-bold tracking-widest text-background transition-opacity hover:opacity-90 disabled:opacity-40 sm:w-auto"
        >
          {loading ? "COMPRESSING..." : "COMPRESS"}
        </button>

        {/* Error */}
        {error && (
          <div className="mt-4 border border-border p-3 font-mono text-xs text-muted">
            {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
                Compressed Output
              </span>
              <span className="font-mono text-[10px] text-dim">
                {result.compressed_tokens}/{result.original_tokens} TOKENS · -
                {reduction}%
              </span>
            </div>
            <div className="border border-border p-3 font-mono text-sm leading-relaxed text-foreground">
              {result.output}
            </div>

            {/* Stats */}
            <div className="mt-4 grid grid-cols-3 border border-border">
              {[
                {
                  value: result.original_tokens.toString(),
                  label: "TOKENS IN",
                },
                {
                  value: result.compressed_tokens.toString(),
                  label: "TOKENS OUT",
                },
                { value: `-${reduction}%`, label: "REDUCTION" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="border-r border-border p-3 text-center last:border-r-0"
                >
                  <div className="font-mono text-lg font-bold">{s.value}</div>
                  <div className="text-[10px] tracking-widest text-muted">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer note */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2 font-mono text-[10px] text-dim">
        <span>POWERED BY HUGGING FACE SPACES</span>
        <a
          href="https://itsaryanchauhan-winnow.hf.space/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-foreground hover:line-through"
        >
          API DOCS →
        </a>
      </div>
    </section>
  );
}
