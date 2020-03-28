import datetime
import json

import pytest
from django.test import Client

from transactions.models import Transaction, OrderedJar

client = Client()


@pytest.fixture
def setup_db(db):
    einkommen = OrderedJar(name='Einkommen', uuid='15407508-1d87-46db-adf1-7a32c0999385', order=0, type='income')
    einkommen.save()
    spass = OrderedJar(name='Spaß', uuid='aa598ef0-6419-4506-b637-9b2c29e97cb6', order=1, type='expense')
    spass.save()
    OrderedJar(name='Notwendigkeiten', uuid='daf921e4-cfab-4ee6-a152-062817c3100f', order=2, type='expense').save()
    OrderedJar(name='Passives Einkommen', uuid='ae1ea2bc-05e8-4979-9830-597c4f79984c', order=3, type='expense').save()
    Transaction(uuid='374ed882-607e-4203-9c8c-380fe38c1a51', amount=2000, date=datetime.date(2020, 3, 15),
                orderedJar=einkommen).save()
    Transaction(uuid='e268fdd9-aef4-4af9-9545-93758d486fa1', amount=100, date=datetime.date(2020, 3, 15),
                orderedJar=spass).save()
    Transaction(uuid='f5a2da63-93b5-44be-b3aa-226259106128', amount=200, date=datetime.date(2020, 3, 15),
                orderedJar=spass).save()
    Transaction(uuid='e247c198-07b5-4a1a-9a1e-72bf67b1ef0f', amount=15.45, date=datetime.date(2020, 3, 15),
                orderedJar=spass).save()
    Transaction(uuid='68602918-9018-44df-b1fc-36e750c6000e', amount=5.45, date=datetime.date(2020, 2, 15),
                orderedJar=spass).save()


@pytest.mark.usefixtures('setup_db')
def test_returns_saved_transactions(db):
    response_json = load_transactions()
    assert len(response_json['jars']) == 4
    jar = find_by_jar_name(response_json['jars'], 'Notwendigkeiten')
    assert jar['name'] == "Notwendigkeiten"
    assert jar['uuid'] == 'daf921e4-cfab-4ee6-a152-062817c3100f'
    assert jar['order'] == 2
    assert jar['type'] == 'expense'

    uuids = [transaction['uuid'] for transaction in response_json['transactions']]
    assert len(response_json['transactions']) == 4
    assert '68602918-9018-44df-b1fc-36e750c6000e' not in uuids
    assert 'e247c198-07b5-4a1a-9a1e-72bf67b1ef0f' in uuids


@pytest.mark.usefixtures('setup_db')
def test_add_new_jar(db):
    body = {
        'name': 'Drogen',
        'uuid': '46a9f293-e3e7-4c50-ba5d-4ced0f950fee',
        'type': 'expense',
        'order': 4
    }
    response = client.post('/api/jars', data=body, content_type='application/json')
    assert response.status_code == 200

    response_json = load_transactions()

    assert len(response_json['jars']) == 5
    jar = find_by_jar_name(response_json['jars'], 'Drogen')
    assert jar['name'] == 'Drogen'
    assert jar['uuid'] == '46a9f293-e3e7-4c50-ba5d-4ced0f950fee'
    assert jar['type'] == 'expense'
    assert jar['order'] == 4


@pytest.mark.usefixtures('setup_db')
def test_update_jar(db):
    body = {
        'name': 'Drogen',
        'uuid': 'daf921e4-cfab-4ee6-a152-062817c3100f',  # Notwendigkeiten ID
        'type': 'expense',
        'order': 2
    }
    response = client.post('/api/jars', data=body, content_type='application/json')
    assert response.status_code == 200

    response_json = load_transactions()

    assert len(response_json['jars']) == 4

    jar = find_by_jar_name(response_json['jars'], 'Drogen')
    assert jar['name'] == 'Drogen'
    assert jar['uuid'] == 'daf921e4-cfab-4ee6-a152-062817c3100f'

    jar_names = [jar['name'] for jar in response_json['jars']]
    assert 'Notwendigkeiten' not in jar_names


@pytest.mark.usefixtures('setup_db')
def test_change_order_of_jars(db):
    body = {
        'name': 'Passives Einkommen',
        'uuid': 'ae1ea2bc-05e8-4979-9830-597c4f79984c',
        'type': 'expense',
        'order': 1
    }
    response = client.post('/api/jars', data=body, content_type='application/json')
    assert response.status_code == 200

    response_json = load_transactions()

    jars = response_json['jars']
    assert len(jars) == 4
    passives_einkommen = find_by_jar_name(jars, 'Passives Einkommen')
    assert passives_einkommen['order'] == 1
    spass = find_by_jar_name(jars, 'Spaß')
    assert spass['order'] == 2
    notwendigkeiten = find_by_jar_name(jars, 'Notwendigkeiten')
    assert notwendigkeiten['order'] == 3


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

    transaction = find_transaction_by_id(response_json['transactions'], 'e268fdd9-aef4-4af9-9545-93758d486fa1')
    assert transaction['amount'] == 123
    assert transaction['date'] == '2020-03-12'


@pytest.mark.usefixtures('setup_db')
def test_delete_transaction(db):
    response = client.delete('/api/transactions/e247c198-07b5-4a1a-9a1e-72bf67b1ef0f')
    assert response.status_code == 200

    response_json = load_transactions()
    uuids = [transaction['uuid'] for transaction in response_json['transactions']]
    assert len(uuids) == 3
    assert 'e247c198-07b5-4a1a-9a1e-72bf67b1ef0f' not in uuids


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


def find_by_jar_name(jars, name):
    found = [jar for jar in jars if jar['name'] == name]
    if not len(found) == 1:
        raise ValueError(f'Jar not found for name {name}')
    return found[0]


def find_transaction_by_id(transactions, uuid):
    found = [transaction for transaction in transactions if uuid == transaction['uuid']]
    if not len(found) == 1:
        raise ValueError(f'Transaction not found for id {uuid}')
    return found[0]
