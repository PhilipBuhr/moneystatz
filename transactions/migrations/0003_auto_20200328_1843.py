# Generated by Django 3.0.4 on 2020-03-28 18:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transactions', '0002_auto_20200328_1729'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='transaction',
            name='jar',
        ),
        migrations.AddField(
            model_name='orderedjar',
            name='type',
            field=models.CharField(choices=[('income', 'income'), ('expense', 'expense')], default='expense', max_length=255),
        ),
        migrations.DeleteModel(
            name='Jar',
        ),
    ]
