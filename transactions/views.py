from django.http import JsonResponse


def transactions(request):
    return JsonResponse({
        "transactions": [
            {
                "jar": "Einkommen",
                "amount": "2000",
                "date": "2020-03-01",
                "description": "bling bling"
            },
            {
                "jar": "Spaß",
                "amount": "100",
                "date": "2020-03-06",
                "description": "Koks"
            },
            {
                "jar": "Spaß",
                "amount": "200",
                "date": "2020-03-06",
                "description": "Nutten"
            },
            {
                "jar": "Notwendigkeiten",
                "amount": "5.45",
                "date": "2020-03-05",
                "description": "Essen für die Nutten"
            }
        ],
        "jars": [
            "Einkommen", "Notwendigkeiten", "Spaß", "Passives Einkommen"
        ]
    })
