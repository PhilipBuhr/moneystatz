import datetime

from transactions.models import Transaction, OrderedJar

DATE_FORMAT = '%Y-%m-%d'


def find_jars():
    result = []
    for jar in OrderedJar.objects.all():
        result.append({
            'uuid': jar.uuid,
            'name': jar.name,
            'order': jar.order,
            'type': jar.type
        })
    return result


def find_transactions(from_date, to_date):
    transactions = Transaction.objects.filter(
        date__gte=datetime.datetime.strptime(from_date, DATE_FORMAT)
    ).filter(
        date__lte=datetime.datetime.strptime(to_date, DATE_FORMAT)
    )
    result = []
    for transaction in transactions:
        json = {
            'uuid': transaction.uuid,
            'amount': transaction.amount,
            'date': transaction.date.strftime(DATE_FORMAT),
            'jar': transaction.orderedJar.name,
        }
        result.append(json)
    return result


def update_jar(jar_body):
    all_jars = [jar for jar in OrderedJar.objects.order_by('order') if jar.uuid != jar_body['uuid']]
    updated_jar = OrderedJar(
        name=jar_body['name'],
        uuid=jar_body['uuid'],
        type=jar_body['type'],
        order=jar_body['order']
    )
    all_jars.insert(jar_body['order'], updated_jar)
    _save_new_order(all_jars)
    return updated_jar


def _save_new_order(all_jars):
    for index, new_jar in enumerate(all_jars):
        new_jar.order = index
        new_jar.save()


def update_transaction(transaction):
    jar = OrderedJar.objects.get(name=transaction['jar'])
    transaction = Transaction(
        uuid=transaction['uuid'],
        date=datetime.datetime.strptime(transaction['date'], DATE_FORMAT),
        amount=transaction['amount'],
        orderedJar=jar
    )
    transaction.save()
    return transaction


def delete_transaction(uuid):
    transaction = Transaction.objects.get(uuid=uuid)
    transaction.delete()
