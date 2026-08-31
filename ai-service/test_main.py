from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_evaluate_returns_structured_score():
    payload = {
        "code": "def add(a, b): return a + b",
        "language": "python",
        "test_results": "All 3 tests passed"
    }
    response = client.post("/evaluate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "logic" in data
    assert "style" in data
    assert "practices" in data
    assert "total" in data