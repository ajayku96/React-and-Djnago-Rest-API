# Generated by Django 3.0.7 on 2021-06-09 10:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0009_remove_order_res_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='rest_approval',
            field=models.BooleanField(default=False),
        ),
    ]
