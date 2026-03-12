"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Benchmarks() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      className={`scroll-reveal ${isVisible ? "visible" : ""}`}
    >
      {/* Section label */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-xs font-bold uppercase tracking-wide">
          Benchmark Results
        </span>
        <span className="font-mono text-xs text-muted">
          SQUAD · LLMLINGUA-2
        </span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 border-b border-border sm:grid-cols-4">
        {[
          { value: "420", label: "AVG TOKENS (IN)" },
          { value: "210", label: "AVG TOKENS (OUT)" },
          { value: "~50%", label: "REDUCTION" },
          { value: "~85ms", label: "LATENCY" },
        ].map((s, i) => (
          <div
            key={i}
            className="border-b border-r border-border p-3 sm:border-b-0"
          >
            <div className="font-mono text-2xl">{s.value}</div>
            <small className="text-[10px] font-bold tracking-widest text-muted">
              {s.label}
            </small>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto border-b border-border">
        <table className="w-full font-mono text-xs uppercase">
          <thead>
            <tr className="border-b border-border">
              {[
                "PRESET",
                "TOKENS IN",
                "TOKENS OUT",
                "REDUCTION",
                "F1 SCORE",
                "F1 DROP",
              ].map((h, i) => (
                <th
                  key={h}
                  className={`p-3 font-bold tracking-widest text-muted ${i === 0 ? "text-left" : "text-right"}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              {
                preset: "AGGRESSIVE (0.3)",
                tIn: "420",
                tOut: "147",
                red: "~65%",
                f1: "73.4",
                drop: "5.0 PT",
              },
              {
                preset: "BALANCED (0.5)",
                tIn: "420",
                tOut: "210",
                red: "~50%",
                f1: "76.1",
                drop: "2.3 PT",
              },
              {
                preset: "LIGHT (0.7)",
                tIn: "420",
                tOut: "294",
                red: "~30%",
                f1: "77.6",
                drop: "<1 PT",
              },
            ].map((row, i) => (
              <tr
                key={i}
                className="border-b border-border transition-colors hover:bg-surface"
              >
                <td className="p-3 text-left">{row.preset}</td>
                <td className="p-3 text-right text-muted">{row.tIn}</td>
                <td className="p-3 text-right">{row.tOut}</td>
                <td className="p-3 text-right">{row.red}</td>
                <td className="p-3 text-right text-muted">{row.f1}</td>
                <td className="p-3 text-right text-muted">{row.drop}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer bar */}
      <div className="flex items-center justify-between border-b border-border px-3 py-2 font-mono text-[10px] text-dim">
        <span>WINNOW V0.1.1 · LLMLINGUA-2</span>
        <a
          href="/benchmarks"
          className="transition-colors hover:text-foreground hover:line-through"
        >
          FULL RESULTS →
        </a>
      </div>
    </section>
  );
}
