import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Benchmarks - Winnow",
  description: "Winnow compression benchmark results on SQuAD.",
};

export default function BenchmarksPage() {
  return (
    <>
      <Nav />
      <main className="mt-[49px]">
        {/* Title */}
        <div className="border-b border-border px-4 py-8 sm:py-12">
          <h1 className="text-[clamp(2rem,6vw,6rem)] font-bold uppercase leading-[0.9] tracking-[-0.04em]">
            Benchmark
            <br />
            Results
          </h1>
        </div>

        {/* Description */}
        <div className="grid grid-cols-1 border-b border-border sm:grid-cols-12">
          <div className="border-b border-border p-4 sm:col-span-8 sm:border-b-0 sm:border-r">
            <p className="text-xs font-medium uppercase leading-relaxed text-muted">
              SQuAD with LLMLingua-2 compression.
            </p>
          </div>
          <div className="flex items-end p-4 font-mono text-xs text-dim sm:col-span-4">
            BASELINE F1: 78.4
          </div>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-2 border-b border-border sm:grid-cols-4">
          {[
            { pill: "01", value: "420", label: "AVG TOKENS (IN)" },
            { pill: "02", value: "210", label: "AVG TOKENS (OUT)" },
            { pill: "03", value: "78.4", label: "F1 BASELINE" },
            { pill: "04", value: "76.1", label: "F1 @ RATIO=0.5" },
          ].map((s, i) => (
            <div
              key={i}
              className="flex h-[120px] flex-col justify-between border-b border-r border-border p-3 sm:border-b-0"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background">
                {s.pill}
              </span>
              <div>
                <div className="font-mono text-2xl">{s.value}</div>
                <small className="text-[10px] tracking-widest text-muted">
                  {s.label}
                </small>
              </div>
            </div>
          ))}
        </div>

        {/* Preset results */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <span className="text-xs font-bold uppercase tracking-wide">
            Preset Results
          </span>
          <span className="font-mono text-xs text-dim">3 PRESETS</span>
        </div>

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

        {/* Methodology note */}
        <div className="border-b border-border px-4 py-3 font-mono text-[10px] text-dim">
          METHODOLOGY: SQUAD · LLMLINGUA-2 · BASELINE F1: 78.4 · AVG LATENCY
          ~85MS
        </div>
      </main>
      <Footer />
    </>
  );
}
