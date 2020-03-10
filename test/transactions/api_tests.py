import json

from django.test import Client

client = Client()


def test_returns_dummy_data():
    request_params = {
        "from": "2020-03-01",
        "to": "2020-03-31"
    }
    response = client.get('/api/transactions', request_params)
    assert response.status_code == 200
    body = response.content.decode('utf-8')
    response_json = json.loads(body)
    assert len(response_json['transactions']) == 4
