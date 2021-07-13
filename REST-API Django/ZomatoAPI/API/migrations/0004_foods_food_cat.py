# Generated by Django 3.0.7 on 2021-05-21 07:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0003_auto_20210521_1158'),
    ]

    operations = [
        migrations.AddField(
            model_name='foods',
            name='food_cat',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='API.FoodCategory'),
            preserve_default=False,
        ),
    ]