"use client";

import { useState } from "react";

type Tab = "PYTHON" | "LANGCHAIN" | "CURL";

const snippets: Record<Tab, string> = {
  PYTHON: `from winnow import compress

# Sentence-only compression
result = compress(input_text, compression_ratio=0.5)

# Question-guided compression (RAG-aware)
guided = compress(
    input_text,
    compression_ratio=0.5,
    rag_mode=True,
    question="What is the warranty period?"
)

print(result["output"])
print(result["original_tokens"])    # 420
print(result["compressed_tokens"])  # 210`,
  LANGCHAIN: `from winnow.langchain import WinnowCompressor

compressor = WinnowCompressor(ratio=0.5)
compressed_docs = compressor.compress_documents(docs, query)`,
  CURL: `curl -X POST http://localhost:8000/v1/compress \\
  -H "Content-Type: application/json" \\
  -d '{
    "input": "your retrieved chunks here",
    "compression_ratio": 0.5,
    "rag_mode": true,
    "question": "what is the capital of France?"
  }'`,
};

const tabs: Tab[] = ["PYTHON", "LANGCHAIN", "CURL"];

export default function CodeSnippets() {
  const [active, setActive] = useState<Tab>("PYTHON");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[active]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = snippets[active].split("\n");

  return (
    <section>
      {/* Section label */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-xs font-bold uppercase tracking-wide">
          Integration
        </span>
        <span className="font-mono text-xs text-muted">DROP-IN</span>
      </div>

      {/* Feature layout: text left, code right */}
      <div className="grid grid-cols-1 border-b border-border sm:grid-cols-12">
        {/* Text column */}
        <div className="flex flex-col justify-between border-b border-border p-4 sm:col-span-4 sm:border-b-0 sm:border-r sm:py-8">
          <div>
            <span className="mb-6 flex h-6 w-6 items-center justify-center rounded-full bg-foreground font-mono text-[10px] font-bold text-background">
              {"/"}
            </span>
            <h2 className="mb-3 text-xl font-bold uppercase tracking-tight">
              Add Winnow
              <br />
              in minutes
            </h2>
          </div>
          <p className="text-xs font-medium uppercase leading-relaxed text-muted">
            Python SDK, LangChain integration, raw HTTP, or OpenAI-compatible
            proxy - just swap your base URL. Zero config required.
          </p>
        </div>

        {/* Code column */}
        <div className="sm:col-span-8">
          {/* Tab bar */}
          <div className="flex items-center justify-between border-b border-border">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActive(tab)}
                  className={`border-r border-border px-4 py-3 font-mono text-xs font-bold tracking-wide transition-colors ${
                    active === tab
                      ? "bg-foreground text-background"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button
              onClick={handleCopy}
              className="px-4 font-mono text-[10px] font-bold tracking-wide text-muted hover:text-foreground hover:line-through"
            >
              {copied ? "COPIED" : "COPY"}
            </button>
          </div>

          {/* Code block */}
          <div className="flex min-h-[440px] bg-surface">
            <div className="shrink-0 select-none border-r border-border px-3 py-4 text-right font-mono text-xs text-dim">
              {lines.map((_, i) => (
                <div key={i} className="leading-6">
                  {i + 1}
                </div>
              ))}
            </div>
            <pre className="min-w-0 flex-1 overflow-x-auto p-4 font-mono text-xs leading-6 text-muted">
              <code>{snippets[active]}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
