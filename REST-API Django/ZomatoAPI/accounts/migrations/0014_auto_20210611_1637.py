# Generated by Django 3.2.4 on 2021-06-11 11:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0013_remove_user_location'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='latitude',
            field=models.CharField(blank=True, max_length=60),
        ),
        migrations.AddField(
            model_name='user',
            name='longitude',
            field=models.CharField(blank=True, max_length=60),
        ),
    ]
