import pytest
from app.compressor import compress

def test_basic_compression():
    text = "The quick brown fox jumps over the lazy dog. " * 20
    result = compress(text, ratio=0.5, protected=[], rag_mode=False, include_diff=False)
    assert result["compressed_tokens"] < result["original_tokens"]
    assert len(result["output"]) > 0

def test_compression_reduces_tokens():
    text = "The quick brown fox jumps over the lazy dog. " * 20
    result_aggressive = compress(text, ratio=0.2, protected=[], rag_mode=False, include_diff=False)
    result_light = compress(text, ratio=0.8, protected=[], rag_mode=False, include_diff=False)
    assert result_aggressive["compressed_tokens"] < result_light["compressed_tokens"]

def test_protected_strings_preserved():
    text = "The quick brown fox jumps over the lazy dog. " * 20
    result = compress(text, ratio=0.2, protected=["fox", "lazy"], rag_mode=False, include_diff=False)
    assert "fox" in result["output"]
    assert "lazy" in result["output"]

def test_diff_is_returned_when_requested():
    text = "The quick brown fox jumps over the lazy dog. " * 10
    result = compress(text, ratio=0.5, protected=[], rag_mode=False, include_diff=True)
    assert result["diff"] is not None
    assert isinstance(result["diff"], list)
    assert "token" in result["diff"][0]
    assert "kept" in result["diff"][0]

def test_diff_is_null_when_not_requested():
    text = "The quick brown fox jumps over the lazy dog. " * 10
    result = compress(text, ratio=0.5, protected=[], rag_mode=False, include_diff=False)
    assert result["diff"] is None

def test_rag_mode_returns_output():
    text = "Question: What is the fox doing?\n\nDocument 1: " + "The quick brown fox jumps over the lazy dog. " * 10
    result = compress(text, ratio=0.5, protected=[], rag_mode=True, include_diff=False)
    assert result["compressed_tokens"] < result["original_tokens"]

def test_ratio_is_float():
    text = "The quick brown fox jumps over the lazy dog. " * 10
    result = compress(text, ratio=0.5, protected=[], rag_mode=False, include_diff=False)
    assert isinstance(result["ratio"], float)

def test_response_has_all_fields():
    text = "The quick brown fox jumps over the lazy dog. " * 10
    result = compress(text, ratio=0.5, protected=[], rag_mode=False, include_diff=False)
    assert "output" in result
    assert "original_tokens" in result
    assert "compressed_tokens" in result
    assert "ratio" in result
