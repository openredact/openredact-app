def test_score_computation(client):
    response = client.post(
        "/api/score", json={"computedAnnotations": [], "goldAnnotations": [{"start": 0, "end": 1, "tag": "PER"}]}
    )
    assert response.status_code == 200
    assert response.json()["total"]["f1"] == 0.0
