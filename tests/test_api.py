import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_compress_returns_200():
    response = client.post("/v1/compress", json={
        "input": "The quick brown fox jumps over the lazy dog. " * 20,
        "compression_ratio": 0.5
    })
    assert response.status_code == 200

def test_compress_response_shape():
    response = client.post("/v1/compress", json={
        "input": "The quick brown fox jumps over the lazy dog. " * 20,
        "compression_ratio": 0.5
    })
    data = response.json()
    assert "output" in data
    assert "original_tokens" in data
    assert "compressed_tokens" in data
    assert "ratio" in data

def test_protected_strings_in_output():
    response = client.post("/v1/compress", json={
        "input": "The quick brown fox jumps over the lazy dog. " * 20,
        "compression_ratio": 0.2,
        "protected_strings": ["fox"]
    })
    assert "fox" in response.json()["output"]

def test_diff_returned_when_requested():
    response = client.post("/v1/compress", json={
        "input": "The quick brown fox jumps over the lazy dog. " * 10,
        "compression_ratio": 0.5,
        "diff": True
    })
    assert response.json()["diff"] is not None

def test_cost_savings_returned():
    response = client.post("/v1/compress", json={
        "input": "The quick brown fox jumps over the lazy dog. " * 20,
        "compression_ratio": 0.5,
        "price_per_million_tokens": 3.0
    })
    assert response.json()["estimated_savings_usd"] is not None

def test_invalid_ratio_returns_422():
    response = client.post("/v1/compress", json={
        "input": "Some text here",
        "compression_ratio": 1.5
    })
    assert response.status_code == 422

def test_batch_returns_correct_count():
    response = client.post("/v1/compress/batch", json={
        "inputs": [
            "The quick brown fox jumps over the lazy dog. " * 10,
            "Another long document with lots of repeated filler content. " * 10
        ],
        "compression_ratio": 0.5
    })
    data = response.json()
    assert data["count"] == 2
    assert len(data["results"]) == 2

def test_batch_each_result_has_output():
    response = client.post("/v1/compress/batch", json={
        "inputs": [
            "The quick brown fox jumps over the lazy dog. " * 10,
            "Another long document with lots of repeated filler content. " * 10
        ],
        "compression_ratio": 0.5
    })
    for result in response.json()["results"]:
        assert "output" in result
        assert "original_tokens" in result
