from app.compressor import compress
import json, os, time

sizes = [500, 1_000, 5_000, 10_000, 25_000]
base_text = "This is a sample document with detailed context for RAG pipelines. " * 500

results = []

print("=== Latency Benchmark ===")

for size in sizes:
    text = " ".join(base_text.split()[:size])
    actual_tokens = len(text.split())

    latencies = []
    for run in range(5):
        start = time.time()
        result = compress(text, ratio=0.5, protected=[], rag_mode=False, include_diff=False)
        latencies.append((time.time() - start) * 1000)

    avg_latency = sum(latencies) / len(latencies)
    min_latency = min(latencies)

    entry = {
        "target_tokens": size,
        "actual_tokens": actual_tokens,
        "compressed_tokens": result["compressed_tokens"],
        "avg_latency_ms": round(avg_latency, 1),
        "min_latency_ms": round(min_latency, 1),
        "token_reduction_pct": round((1 - result["compressed_tokens"] / actual_tokens) * 100, 1)
    }
    results.append(entry)
    print(f"{actual_tokens} tokens → {entry['compressed_tokens']} tokens | avg {entry['avg_latency_ms']}ms | min {entry['min_latency_ms']}ms")

os.makedirs("benchmarks/results", exist_ok=True)
with open("benchmarks/results/latency_results.json", "w") as f:
    json.dump(results, f, indent=2)

print("\nSaved to benchmarks/results/latency_results.json")
