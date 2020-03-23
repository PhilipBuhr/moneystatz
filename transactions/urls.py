from django.urls import path

from . import views

urlpatterns = [
    path('transactions', views.transactions, name='transactions'),
    path('transactions/<str:uuid>', views.transaction, name='delete_transaction'),
    path('jars', views.jars, name='jars'),
]
