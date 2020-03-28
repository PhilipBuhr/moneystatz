from django.db import models


class OrderedJar(models.Model):
    uuid = models.CharField(max_length=36, primary_key=True)
    name = models.CharField(max_length=255)
    order = models.IntegerField()


class Transaction(models.Model):
    uuid = models.CharField(max_length=36, primary_key=True)
    amount = models.FloatField(null=True)
    date = models.DateField()
    orderedJar = models.ForeignKey(OrderedJar, on_delete=models.CASCADE, null=True)
