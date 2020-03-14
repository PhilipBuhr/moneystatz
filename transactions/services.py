import datetime

from transactions.models import Jar, Transaction

DATE_FORMAT = '%Y-%m-%d'


def find_jars():
    return [jar.name for jar in Jar.objects.all()]


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
            'jar': transaction.jar.name,
        }
        result.append(json)
    return result


def update_jar(name):
    jar = Jar(name=name)
    jar.save()
    return jar


def update_transaction(transaction):
    jar = Jar.objects.get(name=transaction['jar'])
    transaction = Transaction(
        uuid=transaction['uuid'],
        date=datetime.datetime.strptime(transaction['date'], DATE_FORMAT),
        amount=transaction['amount'],
        jar=jar
    )
    transaction.save()
    return transaction
