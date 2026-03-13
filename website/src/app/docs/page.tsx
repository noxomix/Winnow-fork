import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "API Reference - Winnow",
  description: "Winnow API documentation and endpoint reference.",
};

const endpoints = [
  {
    method: "POST",
    path: "/v1/compress",
    description:
      "Compress a single input string, reducing token count while preserving meaning.",
    body: [
      {
        field: "input",
        type: "string",
        required: true,
        desc: "The text to compress.",
      },
      {
        field: "question",
        type: "string",
        required: false,
        desc: "Optional question to guide RAG-mode compression.",
      },
      {
        field: "compression_ratio",
        type: "float",
        required: false,
        desc: "Target compression ratio 0.1–0.9. Default: 0.5",
      },
      {
        field: "protected_strings",
        type: "string[]",
        required: false,
        desc: "Strings that must not be removed. Default: []",
      },
      {
        field: "rag_mode",
        type: "boolean",
        required: false,
        desc: "Enable RAG-optimized compression. Default: false",
      },
      {
        field: "diff",
        type: "boolean",
        required: false,
        desc: "Return a diff showing removed tokens. Default: false",
      },
      {
        field: "price_per_million_tokens",
        type: "float",
        required: false,
        desc: "Token price for savings estimate. Default: 0",
      },
    ],
    response: `{
  "output": "...",
  "original_tokens": 420,
  "compressed_tokens": 210,
  "ratio": 2.0,
  "diff": null,
  "estimated_savings_usd": null
}`,
  },
  {
    method: "POST",
    path: "/v1/compress/batch",
    description: "Compress multiple inputs in a single request.",
    body: [
      {
        field: "inputs",
        type: "string[]",
        required: true,
        desc: "Array of text strings to compress.",
      },
      {
        field: "question",
        type: "string",
        required: false,
        desc: "Optional question to guide RAG-mode compression for all inputs.",
      },
      {
        field: "compression_ratio",
        type: "float",
        required: false,
        desc: "Target compression ratio 0.1–0.9. Default: 0.5",
      },
      {
        field: "protected_strings",
        type: "string[]",
        required: false,
        desc: "Strings that must not be removed. Default: []",
      },
      {
        field: "rag_mode",
        type: "boolean",
        required: false,
        desc: "Enable RAG-optimized compression. Default: false",
      },
      {
        field: "diff",
        type: "boolean",
        required: false,
        desc: "Return a diff showing removed tokens. Default: false",
      },
      {
        field: "price_per_million_tokens",
        type: "float",
        required: false,
        desc: "Token price for savings estimate. Default: 0",
      },
    ],
    response: `{
  "results": [
    { "output": "...", "original_tokens": 420, "compressed_tokens": 210, "ratio": 2.0, "diff": null, "estimated_savings_usd": null },
    { "output": "...", "original_tokens": 380, "compressed_tokens": 190, "ratio": 2.0, "diff": null, "estimated_savings_usd": null }
  ],
  "count": 2
}`,
  },
  {
    method: "POST",
    path: "/v1/chat/completions",
    description:
      "OpenAI-compatible proxy. Automatically compresses user messages before forwarding to OpenAI. Requires an OpenAI API key via the Authorization header.",
    body: [
      {
        field: "model",
        type: "string",
        required: true,
        desc: "The OpenAI model to forward the request to.",
      },
      {
        field: "messages",
        type: "object[]",
        required: true,
        desc: "Standard OpenAI messages array (role + content).",
      },
      {
        field: "question",
        type: "string",
        required: false,
        desc: "Optional question to guide RAG-mode compression for user messages.",
      },
      {
        field: "compression_ratio",
        type: "float",
        required: false,
        desc: "Compression ratio for user messages. Default: 0.5",
      },
      {
        field: "protected_strings",
        type: "string[]",
        required: false,
        desc: "Strings to preserve during compression. Default: []",
      },
      {
        field: "rag_mode",
        type: "boolean",
        required: false,
        desc: "Enable RAG-optimized compression. Default: false",
      },
    ],
    response: `{
  "id": "chatcmpl-...",
  "object": "chat.completion",
  "choices": [
    {
      "message": { "role": "assistant", "content": "..." },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 210,
    "completion_tokens": 42,
    "total_tokens": 252
  }
}`,
  },
  {
    method: "GET",
    path: "/health",
    description: "Health check. Returns server status.",
    body: [],
    response: `{
  "status": "ok"
}`,
  },
];

export default function DocsPage() {
  return (
    <>
      <Nav />
      <main className="mt-[49px]">
        {/* Title */}
        <div className="border-b border-border px-4 py-8 sm:py-12">
          <h1 className="text-[clamp(2rem,6vw,6rem)] font-bold uppercase leading-[0.9] tracking-[-0.04em]">
            API
            <br />
            Reference
          </h1>
        </div>

        {/* Subtitle */}
        <div className="grid grid-cols-1 border-b border-border sm:grid-cols-12">
          <div className="border-b border-border p-4 sm:col-span-8 sm:border-b-0 sm:border-r">
            <p className="text-xs font-medium uppercase leading-relaxed text-muted">
              Base URL: http://localhost:8000 · Self-hosted, no API key
              required.
            </p>
          </div>
          <div className="flex items-end p-4 font-mono text-xs text-dim sm:col-span-4">
            {endpoints.length} ENDPOINTS
          </div>
        </div>

        {/* Endpoints */}
        {endpoints.map((ep, i) => (
          <div key={i}>
            {/* Endpoint header */}
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <span
                className={`px-2 py-0.5 font-mono text-[10px] font-bold ${
                  ep.method === "POST"
                    ? "bg-foreground text-background"
                    : "bg-dim text-background"
                }`}
              >
                {ep.method}
              </span>
              <code className="font-mono text-sm">{ep.path}</code>
            </div>

            {/* Endpoint content */}
            <div className="border-b border-border p-4">
              <p className="mb-4 text-xs uppercase text-muted">
                {ep.description}
              </p>

              {ep.body.length > 0 && (
                <>
                  <div className="mb-2 text-[10px] font-bold tracking-widest text-muted">
                    REQUEST BODY
                  </div>
                  <div className="mb-4 w-full overflow-x-auto border border-border">
                    <table className="w-full text-xs uppercase">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="p-2 text-left font-bold text-muted">
                            FIELD
                          </th>
                          <th className="p-2 text-left font-bold text-muted">
                            TYPE
                          </th>
                          <th className="p-2 text-left font-bold text-muted">
                            REQ
                          </th>
                          <th className="p-2 text-left font-bold text-muted">
                            DESCRIPTION
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {ep.body.map((p, j) => (
                          <tr key={j} className="border-b border-border">
                            <td className="p-2 font-mono">{p.field}</td>
                            <td className="p-2 font-mono text-dim">{p.type}</td>
                            <td className="p-2">{p.required ? "YES" : "NO"}</td>
                            <td className="p-2 text-muted">{p.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              <div className="mb-2 text-[10px] font-bold tracking-widest text-muted">
                RESPONSE
              </div>
              <pre className="overflow-x-auto border border-border p-4 font-mono text-xs text-muted">
                {ep.response}
              </pre>
            </div>
          </div>
        ))}
      </main>
      <Footer />
    </>
  );
}
