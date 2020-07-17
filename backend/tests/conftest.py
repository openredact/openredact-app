from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from app.main import app


@pytest.fixture(scope="session")
def client():
    return TestClient(app)


@pytest.fixture
def test_data():
    return Path(__file__).parent / "data"
