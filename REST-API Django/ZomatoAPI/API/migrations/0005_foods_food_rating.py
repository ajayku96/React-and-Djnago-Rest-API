# Generated by Django 3.0.7 on 2021-05-21 09:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0004_foods_food_cat'),
    ]

    operations = [
        migrations.AddField(
            model_name='foods',
            name='food_rating',
            field=models.FloatField(default=5),
            preserve_default=False,
        ),
    ]