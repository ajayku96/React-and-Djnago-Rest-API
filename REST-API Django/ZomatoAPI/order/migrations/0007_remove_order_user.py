# Generated by Django 3.0.7 on 2021-06-01 19:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0006_order_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='user',
        ),
    ]