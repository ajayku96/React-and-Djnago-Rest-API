# Generated by Django 3.0.7 on 2021-06-10 08:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0010_order_rest_approval'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='pick_up_by',
            field=models.CharField(blank=True, max_length=50),
        ),
    ]