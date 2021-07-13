# Generated by Django 3.1.7 on 2021-03-26 08:33

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=60)),
                ('emp_img', models.ImageField(upload_to='Employee')),
                ('emp_mobile', models.CharField(max_length=15)),
                ('emp_avg_rating', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Restaurant',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=60)),
                ('res_img', models.ImageField(upload_to='Restaurant')),
                ('location', models.CharField(max_length=15)),
                ('res_avg_rating', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Foods',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=60)),
                ('food_img', models.ImageField(upload_to='Foods')),
                ('price', models.FloatField()),
                ('res_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.restaurant')),
            ],
        ),
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cus_img', models.ImageField(upload_to='Customer')),
                ('cus_mobile', models.CharField(max_length=15)),
                ('email', models.CharField(max_length=30)),
                ('name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
