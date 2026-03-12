run:
	uvicorn app.main:app --reload --port 8000

test:
	pytest tests/ -v

benchmark:
	python benchmarks/run_squad.py
	python benchmarks/run_latency.py

docker-build:
	docker build -t winnow .

docker-run:
	docker run -p 8000:8000 winnow
