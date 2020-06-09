def test_empty(client):
    response = client.post("/api/anonymize", json={"piis": [], "config": {"mechanismsByTag": {}}})
    assert response.status_code == 200
    assert response.json()["anonymizedPiis"] == []


def test_anonymized_by_default(client):
    response = client.post(
        "/api/anonymize",
        json={
            "piis": [{"tag": "PER", "text": "Smith", "id": "1"}],
            "config": {"defaultMechanism": {"mechanism": "suppression"}, "mechanismsByTag": {}},
        },
    )
    assert response.status_code == 200
    assert response.json()["anonymizedPiis"] == [{"text": "XXXXX", "id": "1"}]


def test_anonymized_by_tag_mechanism(client):
    response = client.post(
        "/api/anonymize",
        json={
            "piis": [{"tag": "PER", "text": "Smith", "id": "1"}],
            "config": {
                "defaultMechanism": {"mechanism": "suppression"},
                "mechanismsByTag": {"PER": {"mechanism": "generalization", "replacement": "person"}},
            },
        },
    )
    assert response.status_code == 200
    assert response.json()["anonymizedPiis"] == [{"text": "person", "id": "1"}]


def test_unconfigured_tag(client):
    response = client.post(
        "/api/anonymize", json={"piis": [{"tag": "PER", "text": "Smith", "id": "1"}], "config": {"mechanismsByTag": {}}}
    )
    assert response.status_code == 400
