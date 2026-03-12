"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function HowItWorks() {
  const { ref, isVisible } = useScrollReveal();
  const steps = [
    {
      num: "01",
      title: "RETRIEVE",
      desc: "Your vector DB returns raw document chunks. Verbose, overlapping, and expensive.",
    },
    {
      num: "02",
      title: "COMPRESS",
      desc: "Winnow runs token-level compression guided by your query. Relevant tokens survive. Filler is removed.",
    },
    {
      num: "03",
      title: "GENERATE",
      desc: "Your LLM receives a ~50% shorter prompt. Same answer. Half the cost.",
    },
  ];

  return (
    <section
      ref={ref}
      className={`scroll-reveal ${isVisible ? "visible" : ""}`}
    >
      {/* Section label */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-xs font-bold uppercase tracking-wide">
          How It Works
        </span>
        <span className="font-mono text-xs text-muted">[3 STEPS]</span>
      </div>

      {/* 3-column grid */}
      <div className="grid grid-cols-1 border-b border-border sm:grid-cols-3">
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex min-h-[250px] flex-col justify-between border-b border-r border-border p-4 sm:border-b-0"
          >
            <div>
              <span className="mb-6 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background">
                {step.num}
              </span>
              <h3 className="mb-3 text-lg font-bold tracking-tight">
                {step.title}
              </h3>
            </div>
            <p className="text-xs font-medium uppercase leading-relaxed text-muted">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
