import Link from "next/link";

export default function Footer() {
  return (
    <footer className="grid grid-cols-2 border-t border-border sm:grid-cols-4">
      <div className="border-b border-r border-border p-4 sm:h-[200px] sm:border-b-0">
        <div className="mb-4 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background">
            W
          </span>
          <span className="text-xs font-bold">WINNOW</span>
        </div>
        <div className="font-mono text-[10px] leading-relaxed text-dim">
          OPEN SOURCE
          <br />
          MIT LICENSE
          <br />
          2026
        </div>
      </div>

      <div className="border-b border-r border-border p-4 sm:h-[200px] sm:border-b-0">
        <div className="mb-4 text-[10px] font-bold tracking-widest text-muted">
          LINKS
        </div>
        <div className="flex flex-col gap-2">
          {[
            { label: "DOCS", href: "/docs" },
            { label: "BENCHMARKS", href: "/benchmarks" },
            { label: "HOW IT WORKS", href: "/how-it-works" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-xs text-muted hover:text-foreground hover:line-through"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="border-b border-r border-border p-4 sm:h-[200px] sm:border-b-0">
        <div className="mb-4 text-[10px] font-bold tracking-widest text-muted">
          RESOURCES
        </div>
        <div className="flex flex-col gap-2">
          <a
            href="https://github.com/itsaryanchauhan/Winnow"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted hover:text-foreground hover:line-through"
          >
            GITHUB
          </a>
          <a
            href="https://hub.docker.com/r/itsaryanchauhan/winnow"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted hover:text-foreground hover:line-through"
          >
            DOCKER HUB
          </a>
          <a
            href="https://itsaryanchauhan-winnow.hf.space/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted hover:text-foreground hover:line-through"
          >
            HF SPACE
          </a>
          <a
            href="https://github.com/itsaryanchauhan/Winnow/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted hover:text-foreground hover:line-through"
          >
            ISSUES
          </a>
          <a
            href="https://www.linkedin.com/company/winnow-compress/about/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted hover:text-foreground hover:line-through"
          >
            LINKEDIN
          </a>
        </div>
      </div>

      <div className="flex items-end border-b border-border p-4 sm:h-[200px] sm:border-b-0">
        <div className="font-mono text-[10px] text-dim">
          BUILT BY{" "}
          <a
            href="https://itsaryan.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:line-through"
          >
            ARYAN CHAUHAN
          </a>
          <br />
          <span className="text-[#16a34a]">●</span> ALL SYSTEMS NOMINAL
        </div>
      </div>
    </footer>
  );
}
