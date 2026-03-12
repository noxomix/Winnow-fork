from app.compressor import compress
import json, os, time

# Generate enough base text to cover all sizes
base_text = " ".join(["This is a detailed sample document containing important contextual information for retrieval augmented generation pipelines used in production AI systems."] * 300)

# Real sizes including extreme test
sizes = [500, 1_000, 2_000, 5_000, 10_000]
results = []

print("=== Latency Benchmark ===\n")

print("Warming up model...")
_ = compress("warmup text " * 20, ratio=0.5, protected=[], rag_mode=False, include_diff=False)
print("Warmup done.\n")

for size in sizes:
    words = base_text.split()[:size]
    # Pad if not enough words
    while len(words) < size:
        words += base_text.split()[:size - len(words)]
    text = " ".join(words[:size])
    actual_tokens = len(text.split())

    latencies = []
    for run in range(3):
        start = time.time()
        result = compress(text, ratio=0.5, protected=[], rag_mode=False, include_diff=False)
        latencies.append((time.time() - start) * 1000)

    avg_latency = sum(latencies) / len(latencies)
    min_latency = min(latencies)
    reduction = round((1 - result["compressed_tokens"] / actual_tokens) * 100, 1)

    entry = {
        "target_tokens": size,
        "actual_tokens": actual_tokens,
        "compressed_tokens": result["compressed_tokens"],
        "avg_latency_ms": round(avg_latency, 1),
        "min_latency_ms": round(min_latency, 1),
        "token_reduction_pct": reduction
    }
    results.append(entry)
    print(f"{actual_tokens:>6} tokens → {result['compressed_tokens']:>5} tokens | {reduction}% reduction | avg {round(avg_latency,1)}ms | min {round(min_latency,1)}ms (post-warmup, 3 runs)")

os.makedirs("benchmarks/results", exist_ok=True)
with open("benchmarks/results/latency_results.json", "w") as f:
    json.dump(results, f, indent=2)

print("\nSaved to benchmarks/results/latency_results.json")
