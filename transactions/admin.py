from django.contrib import admin

from .models import Transaction, OrderedJar

# Register your models here.

admin.site.register(Transaction)
admin.site.register(OrderedJar)
