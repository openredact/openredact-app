def test_get_tags(client):
    response = client.get("/api/tags")
    assert response.status_code == 200
    assert "PER" in response.json()
