import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "How It Works - Winnow",
  description:
    "A plain English explanation of how Winnow compresses RAG context.",
};

export default function HowItWorksPage() {
  return (
    <>
      <Nav />
      <main className="mt-[49px]">
        {/* Title */}
        <div className="border-b border-border px-4 py-8 sm:py-12">
          <h1 className="text-[clamp(2rem,6vw,6rem)] font-bold uppercase leading-[0.9] tracking-[-0.04em]">
            How Winnow
            <br />
            Works
          </h1>
        </div>

        {/* Intro */}
        <div className="grid grid-cols-1 border-b border-border sm:grid-cols-12">
          <div className="border-b border-border p-4 sm:col-span-8 sm:border-b-0 sm:border-r">
            <p className="max-w-[60ch] text-xs font-medium uppercase leading-relaxed text-muted">
              A plain English explanation of what happens when Winnow compresses
              your RAG context.
            </p>
          </div>
          <div className="flex items-end p-4 font-mono text-xs text-dim sm:col-span-4">
            3 STEPS · 85MS
          </div>
        </div>

        {/* The Problem */}
        <div className="grid grid-cols-1 border-b border-border sm:grid-cols-12">
          <div className="border-b border-border p-4 sm:col-span-4 sm:border-b-0 sm:border-r sm:py-8">
            <span className="mb-4 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background">
              !
            </span>
            <h2 className="text-lg font-bold uppercase">The Problem</h2>
          </div>
          <div className="p-4 sm:col-span-8 sm:py-8">
            <p className="max-w-[60ch] text-sm leading-relaxed text-muted">
              RAG pipelines retrieve document chunks and stuff them into LLM
              prompts. But those chunks are verbose - filler text, boilerplate,
              redundant sentences. More tokens means higher cost, slower
              responses, and sometimes worse answers because the model has to
              sift through noise to find the signal.
            </p>
          </div>
        </div>

        {/* Step 1 */}
        <div className="grid grid-cols-1 border-b border-border sm:grid-cols-12">
          <div className="border-b border-border p-4 sm:col-span-4 sm:border-b-0 sm:border-r sm:py-8">
            <span className="mb-4 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background">
              01
            </span>
            <h2 className="text-lg font-bold uppercase">Retrieve</h2>
          </div>
          <div className="p-4 sm:col-span-8 sm:py-8">
            <p className="mb-4 max-w-[60ch] text-sm leading-relaxed text-muted">
              Your vector DB returns raw document chunks. Those chunks are
              verbose, overlapping, and expensive. Winnow doesn&apos;t replace
              your retrieval pipeline - it sits between your retriever and your
              LLM.
            </p>
            <div className="inline-block border border-border p-3 font-mono text-xs text-muted">
              VECTOR DB → RETRIEVER →{" "}
              <span className="font-bold text-foreground">WINNOW</span> → LLM
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="grid grid-cols-1 border-b border-border sm:grid-cols-12">
          <div className="border-b border-border p-4 sm:col-span-4 sm:border-b-0 sm:border-r sm:py-8">
            <span className="mb-4 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background">
              02
            </span>
            <h2 className="text-lg font-bold uppercase">Compress</h2>
          </div>
          <div className="p-4 sm:col-span-8 sm:py-8">
            <p className="mb-4 max-w-[60ch] text-sm leading-relaxed text-muted">
              Winnow runs LLMLingua-2 token-level compression guided by your
              query. Relevant tokens survive. Filler is removed.
            </p>
            <div className="grid grid-cols-3 border border-border font-mono text-xs">
              {[
                { num: "01", label: "TOKEN SCORING" },
                { num: "02", label: "PROTECTED WORDS" },
                { num: "03", label: "RATIO PRUNING" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="border-b border-r border-border p-3 last:border-r-0 sm:border-b-0"
                >
                  <span className="text-dim">{item.num}</span>
                  <div className="mt-1 text-muted">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="grid grid-cols-1 border-b border-border sm:grid-cols-12">
          <div className="border-b border-border p-4 sm:col-span-4 sm:border-b-0 sm:border-r sm:py-8">
            <span className="mb-4 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background">
              03
            </span>
            <h2 className="text-lg font-bold uppercase">Generate</h2>
          </div>
          <div className="p-4 sm:col-span-8 sm:py-8">
            <p className="mb-6 max-w-[60ch] text-sm leading-relaxed text-muted">
              Your LLM receives a ~50% shorter prompt. Same answer. Half the
              cost.
            </p>
            <div className="grid grid-cols-3 border border-border">
              {[
                { value: "~50%", label: "FEWER TOKENS" },
                { value: "~50%", label: "LOWER CONTEXT COST" },
                { value: "<3PT", label: "F1 DROP" },
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
        </div>

        {/* What Winnow is not */}
        <div className="grid grid-cols-1 border-b border-border sm:grid-cols-12">
          <div className="border-b border-border p-4 sm:col-span-4 sm:border-b-0 sm:border-r sm:py-8">
            <span className="mb-4 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background">
              ✕
            </span>
            <h2 className="text-lg font-bold uppercase">
              What Winnow
              <br />
              Is Not
            </h2>
          </div>
          <div className="p-4 sm:col-span-8 sm:py-8">
            <div className="space-y-2 font-mono text-xs uppercase text-muted">
              <div>✕ Not a summarizer - doesn&apos;t generate new text</div>
              <div>
                ✕ Not an embedding model - doesn&apos;t change retrieval
              </div>
              <div>✕ Not a reranker - preserves order, just removes tokens</div>
              <div className="text-foreground">
                ✓ Compression middleware that removes low-value tokens
              </div>
            </div>
          </div>
        </div>

        {/* Quick start */}
        <div className="flex flex-col items-center justify-center border-b border-border px-4 py-12 text-center">
          <h2 className="mb-4 text-xl font-bold uppercase tracking-tight">
            Ready to try it?
          </h2>
          <div className="border border-border px-4 py-3 font-mono text-sm">
            <span className="text-dim">$ </span>docker run -p 8000:8000
            itsaryanchauhan/winnow
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
