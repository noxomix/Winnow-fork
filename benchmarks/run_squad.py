from datasets import load_dataset
from app.compressor import compress
import json, os, time

print("Loading SQuAD 2.0 dataset...")
dataset = load_dataset("rajpurkar/squad_v2", split="validation[:150]")

baseline_tokens = []
compressed_tokens = []
answerable_correct = 0
total_answerable = 0

for item in dataset:
    context = item["context"]
    answers = item["answers"]["text"]

    # Baseline token count
    baseline_tokens.append(len(context.split()))

    # Compress with RAG mode + question awareness
    input_text = f"Question: {item['question']}\n\nDocument: {context}"
    result = compress(input_text, ratio=0.5, protected=[], rag_mode=True, include_diff=False)
    compressed_tokens.append(result["compressed_tokens"])

    # Check if expected answer still appears in compressed output
    if len(answers) > 0:
        total_answerable += 1
        if any(ans.lower() in result["output"].lower() for ans in answers):
            answerable_correct += 1

avg_baseline = sum(baseline_tokens) / len(baseline_tokens)
avg_compressed = sum(compressed_tokens) / len(compressed_tokens)
token_reduction = 1 - (avg_compressed / avg_baseline)
answer_retention = (answerable_correct / total_answerable * 100) if total_answerable > 0 else 0

summary = {
    "dataset": "SQuAD 2.0",
    "samples": len(dataset),
    "avg_baseline_tokens": round(avg_baseline, 1),
    "avg_compressed_tokens": round(avg_compressed, 1),
    "token_reduction_pct": round(token_reduction * 100, 1),
    "answer_retention_pct": round(answer_retention, 1),
    "answerable_samples": total_answerable
}

print("\n=== SQuAD 2.0 Results ===")
for k, v in summary.items():
    print(f"{k}: {v}")

os.makedirs("benchmarks/results", exist_ok=True)
with open("benchmarks/results/squad_results.json", "w") as f:
    json.dump(summary, f, indent=2)

print("\nSaved to benchmarks/results/squad_results.json")
