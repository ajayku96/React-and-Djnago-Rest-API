# Generated by Django 3.0.7 on 2021-05-15 19:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20210516_0037'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='address',
            field=models.CharField(max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='type',
            field=models.CharField(choices=[('cus', 'Customer'), ('man', 'Manager'), ('adm', 'admin')], default='cus', max_length=3, null=True),
        ),
    ]
