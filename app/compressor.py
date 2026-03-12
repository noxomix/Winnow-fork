import torch
from llmlingua import PromptCompressor

_compressor = None

def get_device():
    if torch.cuda.is_available():
        return "cuda"
    elif hasattr(torch.backends, "mps") and torch.backends.mps.is_available():
        return "mps"
    else:
        return "cpu"

def get_compressor():
    global _compressor
    if _compressor is None:
        _compressor = PromptCompressor(
            model_name="microsoft/llmlingua-2-xlm-roberta-large-meetingbank",
            use_llmlingua2=True,
            device_map=get_device(),
            model_config={"cache_dir": "/tmp/winnow_cache"}
        )
    return _compressor

def compress(text: str, ratio: float, protected: list, rag_mode: bool, include_diff: bool):
    comp = get_compressor()

    kwargs = dict(rate=ratio, force_tokens=protected)

    if rag_mode:
        kwargs.update(rank_method="longllmlingua",
                      condition_in_question="after_condition",
                      reorder_context="sort")

    result = comp.compress_prompt(
        text if isinstance(text, list) else [text],
        **kwargs
    )

    diff = None
    if include_diff:
        original_words = set(text.split())
        compressed_words = set(result["compressed_prompt"].split())
        diff = [
            {"token": w, "kept": w in compressed_words}
            for w in text.split()
        ]

    return {
        "output": result["compressed_prompt"],
        "original_tokens": result["origin_tokens"],
        "compressed_tokens": result["compressed_tokens"],
        "ratio": float(str(result["ratio"]).replace("x", "")),
        "diff": diff
    }
