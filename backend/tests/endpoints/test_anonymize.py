def test_empty(client):
    response = client.post("/api/anonymize", json={"piis": [], "config": {"mechanismsByTag": {}}})
    assert response.status_code == 200
    assert response.json()["anonymizedPiis"] == []


def test_anonymized_by_default(client):
    response = client.post(
        "/api/anonymize",
        json={
            "piis": [{"tag": "PER", "text": "Smith", "id": "1"}],
            "config": {"defaultMechanism": {"mechanism": "suppression", "config": {}}, "mechanismsByTag": {}},
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
                "defaultMechanism": {"mechanism": "suppression", "config": {}},
                "mechanismsByTag": {"PER": {"mechanism": "generalization", "config": {"replacement": "person"}}},
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


def test_laplace_noise_date(client):
    response = client.post(
        "/api/anonymize",
        json={
            "piis": [{"tag": "DATE", "text": "24.12.2020", "id": "1"}],
            "config": {
                "defaultMechanism": {"mechanism": "suppression", "config": {}},
                "mechanismsByTag": {
                    "DATE": {
                        "mechanism": "laplaceNoise",
                        "config": {"epsilon": 0.00001, "sensitivity": 10000, "encoder": "datetime"},
                    }
                },
            },
        },
    )
    assert response.status_code == 200
    print("Anonymized date:", response.json()["anonymizedPiis"][0]["text"])


def test_laplace_noise_number(client):
    response = client.post(
        "/api/anonymize",
        json={
            "piis": [{"tag": "NUMBER", "text": "7,2 kg", "id": "1"}],
            "config": {
                "defaultMechanism": {"mechanism": "suppression", "config": {}},
                "mechanismsByTag": {
                    "NUMBER": {
                        "mechanism": "laplaceNoise",
                        "config": {"epsilon": 0.1, "sensitivity": 1, "encoder": "delimitedNumber"},
                    }
                },
            },
        },
    )
    assert response.status_code == 200
    print("Anonymized date:", response.json()["anonymizedPiis"][0]["text"])


def test_laplace_noise_money(client):
    response = client.post(
        "/api/anonymize",
        json={
            "piis": [{"tag": "MONEY", "text": "7,20 €", "id": "1"}],
            "config": {
                "defaultMechanism": {"mechanism": "suppression", "config": {}},
                "mechanismsByTag": {
                    "MONEY": {
                        "mechanism": "laplaceNoise",
                        "config": {"epsilon": 0.1, "sensitivity": 1, "encoder": "delimitedNumber"},
                    }
                },
            },
        },
    )
    assert response.status_code == 200
    print("Anonymized date:", response.json()["anonymizedPiis"][0]["text"])


def test_laplace_noise_phone(client):
    response = client.post(
        "/api/anonymize",
        json={
            "piis": [{"tag": "PHONE", "text": "+49 1234 123 456", "id": "1"}],
            "config": {
                "defaultMechanism": {"mechanism": "suppression", "config": {}},
                "mechanismsByTag": {
                    "PHONE": {
                        "mechanism": "laplaceNoise",
                        "config": {"epsilon": 0.1, "sensitivity": 100000, "encoder": "delimitedNumber"},
                    }
                },
            },
        },
    )
    assert response.status_code == 200
    print("Anonymized date:", response.json()["anonymizedPiis"][0]["text"])
