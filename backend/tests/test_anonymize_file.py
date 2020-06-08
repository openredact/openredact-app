from pathlib import Path


def test_anonymization(client):
    test_file_path = Path(__file__).parent / "data" / "test.txt"
    response = client.post(
        "/api/anonymize",
        files={"file": open(test_file_path, "rb")},
        data={"anonymizations": '[{"startChar":0,"endChar":12,"text":"XXX"}]'},
    )
    assert response.status_code == 200
    assert response.content == b"XXX"


def test_without_anonymization(client):
    test_file_path = Path(__file__).parent / "data" / "test.txt"
    response = client.post("/api/anonymize", files={"file": open(test_file_path, "rb")}, data={"anonymizations": "[]"})
    assert response.status_code == 200
    assert response.content == b"Deutschland."
