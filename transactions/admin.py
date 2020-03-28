from django.contrib import admin

from .models import Transaction, Jar

# Register your models here.

admin.site.register(Transaction)
admin.site.register(Jar)
