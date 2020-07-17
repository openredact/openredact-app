def test_get_supported_recognizers(client):
    response = client.get("/api/recognizers")
    assert response.status_code == 200
    assert "EmailRecognizer" in response.json()
