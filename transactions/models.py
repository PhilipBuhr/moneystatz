from django.db import models


class Jar(models.Model):
    name = models.CharField(max_length=255)


class Transaction(models.Model):
    uuid = models.CharField(max_length=36, primary_key=True)
    amount = models.FloatField(null=True)
    date = models.DateField()
    jar = models.ForeignKey(Jar, on_delete=models.CASCADE)
