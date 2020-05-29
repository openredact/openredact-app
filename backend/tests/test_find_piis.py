from pathlib import Path


def test_finding_piis(client):
    test_file_path = Path(__file__).parent / "data" / "test.txt"
    response = client.post("/api/find-piis", files={"file": open(test_file_path, "rb")})
    assert response.status_code == 200

    piis = response.json()["piis"]
    assert len(piis) == 1
    assert all(
        item in piis[0].items()
        for item in {"startChar": 0, "endChar": 11, "tag": "STATE", "text": "Deutschland", "startTok": 0, "endTok": 1}.items()
    )

    tokens = response.json()["tokens"]
    assert len(tokens) == 2
    assert all(item in tokens[1].items() for item in {"text": ".", "hasWs": False, "startChar": 11, "endChar": 12}.items())


def test_unsupported_format(client):
    test_file_path = Path(__file__).parent / "data" / "foo.bar"
    response = client.post("/api/find-piis", files={"file": open(test_file_path, "rb")})
    assert response.status_code == 400
