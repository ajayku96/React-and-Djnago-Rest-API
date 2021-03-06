# Generated by Django 3.1.7 on 2021-03-26 08:33

from django.db import migrations, models
import django.db.models.deletion
import order.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('API', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=120)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(max_length=15)),
                ('address', models.CharField(max_length=250)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('paid', models.BooleanField(default=False)),
                ('invoice_no', models.CharField(blank=True, default=order.models.Order.increment_invoice_number, max_length=70, null=True)),
            ],
            options={
                'ordering': ('-created',),
            },
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('quantity', models.PositiveIntegerField(default=1)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items', to='order.order')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='order_items', to='API.foods')),
                ('restaurant_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.restaurant')),
            ],
        ),
    ]
