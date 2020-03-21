import datetime
import json

import pytest
from django.test import Client

from transactions.models import Jar, Transaction

client = Client()


@pytest.fixture
def setup_db(db):
    einkommen = Jar(name='Einkommen')
    einkommen.save()
    spass = Jar(name='Spaß')
    spass.save()
    Jar(name='Notwendigkeinten').save()
    Jar(name='Passives Einkommen').save()
    Transaction(uuid='374ed882-607e-4203-9c8c-380fe38c1a51', amount=2000, date=datetime.date(2020, 3, 15),
                jar=einkommen).save()
    Transaction(uuid='e268fdd9-aef4-4af9-9545-93758d486fa1', amount=100, date=datetime.date(2020, 3, 15),
                jar=spass).save()
    Transaction(uuid='f5a2da63-93b5-44be-b3aa-226259106128', amount=200, date=datetime.date(2020, 3, 15),
                jar=spass).save()
    Transaction(uuid='e247c198-07b5-4a1a-9a1e-72bf67b1ef0f', amount=15.45, date=datetime.date(2020, 3, 15),
                jar=spass).save()
    Transaction(uuid='68602918-9018-44df-b1fc-36e750c6000e', amount=5.45, date=datetime.date(2020, 2, 15),
                jar=spass).save()


@pytest.mark.usefixtures('setup_db')
def test_returns_saved_transactions(db):
    response_json = load_transactions()
    assert len(response_json['jars']) == 4
    assert 'Notwendigkeinten' in response_json['jars']

    uuids = [transaction['uuid'] for transaction in response_json['transactions']]
    assert len(response_json['transactions']) == 4
    assert '68602918-9018-44df-b1fc-36e750c6000e' not in uuids
    assert 'e247c198-07b5-4a1a-9a1e-72bf67b1ef0f' in uuids


def test_add_new_jar(db):
    body = {
        'jar': 'Drogen'
    }
    response = client.post('/api/jars', data=body, content_type='application/json')
    assert response.status_code == 200

    response_json = load_transactions()

    assert 'Drogen' in response_json['jars']


@pytest.mark.usefixtures('setup_db')
def test_add_new_transaction(db):
    body = {
        'uuid': '73a77c33-9947-4a7f-b933-205748bdeba3',
        'amount': 123,
        'jar': 'Spaß',
        'date': '2020-03-12'
    }

    response = client.post('/api/transactions', data=body, content_type='application/json')
    assert response.status_code == 200

    response_json = load_transactions()
    uuids = [transaction['uuid'] for transaction in response_json['transactions']]

    assert '73a77c33-9947-4a7f-b933-205748bdeba3' in uuids


@pytest.mark.usefixtures('setup_db')
def test_update_transaction(db):
    body = {
        'uuid': 'e268fdd9-aef4-4af9-9545-93758d486fa1',
        'amount': 123,
        'jar': 'Spaß',
        'date': '2020-03-12'
    }

    response = client.post('/api/transactions', data=body, content_type='application/json')
    assert response.status_code == 200

    response_json = load_transactions()
    uuids = [transaction['uuid'] for transaction in response_json['transactions']]

    assert len(uuids) == 4
    assert 'e268fdd9-aef4-4af9-9545-93758d486fa1' in uuids

    transaction = find_transaction_by_id('e268fdd9-aef4-4af9-9545-93758d486fa1', response_json['transactions'])
    assert transaction['amount'] == 123
    assert transaction['date'] == '2020-03-12'


def load_transactions():
    request_params = {
        "from": "2020-03-01",
        "to": "2020-03-31"
    }
    transactions_response = client.get('/api/transactions', request_params)
    response_body = transactions_response.content.decode('utf-8')
    response_json = json.loads(response_body)
    assert transactions_response.status_code == 200
    return response_json


def find_transaction_by_id(uuid, transactions):
    found = [transaction for transaction in transactions if uuid == transaction['uuid']]
    if not len(found) == 1:
        raise ValueError(f'Transaction not found for id {uuid}')
    return found[0]
