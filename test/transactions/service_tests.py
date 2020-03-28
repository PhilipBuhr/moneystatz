from transactions.models import OrderedJar
from transactions.services import update_jar


def test_update_jar_order(db):
    OrderedJar(name='Einkommen', uuid='15407508-1d87-46db-adf1-7a32c0999385', order=0, type='income').save()
    OrderedJar(name='Spaß', uuid='aa598ef0-6419-4506-b637-9b2c29e97cb6', order=1, type='expense').save()
    OrderedJar(name='Notwendigkeiten', uuid='daf921e4-cfab-4ee6-a152-062817c3100f', order=2, type='expense').save()
    OrderedJar(name='Passives Einkommen', uuid='ae1ea2bc-05e8-4979-9830-597c4f79984c', order=3, type='expense').save()

    update_jar({
        'name': 'Passives Einkommen',
        'uuid': 'ae1ea2bc-05e8-4979-9830-597c4f79984c',
        'type': 'expense',
        'order': 1
    })

    jars = OrderedJar.objects.order_by('order')
    assert jars[0].name == 'Einkommen'
    assert jars[0].order == 0
    assert jars[1].name == 'Passives Einkommen'
    assert jars[1].order == 1
    assert jars[2].name == 'Spaß'
    assert jars[2].order == 2
    assert jars[3].name == 'Notwendigkeiten'
    assert jars[3].order == 3
