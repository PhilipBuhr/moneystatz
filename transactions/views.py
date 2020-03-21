import json

from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt

from transactions.services import find_jars, find_transactions, update_jar, update_transaction, DATE_FORMAT


@csrf_exempt
def transactions(request):
    if request.method == 'GET':
        from_date = request.GET.get('from')
        to_date = request.GET.get('to')
        response_body = {"transactions": find_transactions(from_date, to_date), 'jars': find_jars()}
        return JsonResponse(response_body)
    if request.method == 'POST':
        body = parse_body(request)
        transaction = update_transaction(body)
        return JsonResponse({
            'transaction': {
                'uuid': transaction.uuid,
                'amount': transaction.amount,
                'date': transaction.date.strftime(DATE_FORMAT),
                'jar': transaction.jar.name
            }
        })


@csrf_exempt
def jars(request):
    if not request.method == 'POST':
        return HttpResponse(status=405, content=b'Method not allowed. Allowed Methods: POST')
    request_body = parse_body(request)
    name = request_body['jar']
    jar = update_jar(name)
    return JsonResponse({'jar': jar.name})


def parse_body(request):
    return json.loads(request.body.decode('utf-8'))
