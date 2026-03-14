run:
	uvicorn app.main:app --reload --port 8000

test:
	pytest tests/ -v

benchmark-squad:
	PYTHONPATH=. python benchmarks/run_squad.py

benchmark-latency:
	PYTHONPATH=. python benchmarks/run_latency.py

benchmark:
	PYTHONPATH=. python benchmarks/run_squad.py
	PYTHONPATH=. python benchmarks/run_latency.py

docker-build:
	docker build -t winnow .

docker-run:
	docker run -p 8000:7860 winnow

benchmark-gemini:
	PYTHONPATH=. python benchmarks/run_gemini_eval.py
