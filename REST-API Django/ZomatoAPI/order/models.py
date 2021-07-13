from django.db import models
from API.models import Foods,Restaurant
from accounts.models import User

class Order(models.Model):
    def increment_invoice_number():
        last_invoice = Order.objects.all().order_by('id').last()
        if not last_invoice:
            return 'FoodApp#4400'
        invoice_no = last_invoice.invoice_no
        invoice_int = int(invoice_no.split('FoodApp#44')[-1])
        width = 4
        new_invoice_int = invoice_int + 1
        formatted = (width - len(str(new_invoice_int))) * "0" + str(new_invoice_int)
        new_invoice_no = 'FoodApp#44' + str(formatted)
        return new_invoice_no

    full_name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    address = models.CharField(max_length=250)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    paid = models.BooleanField(default=False)
    created_by = models.CharField(max_length=100)
    invoice_no = models.CharField(max_length=70, default=increment_invoice_number, null=True, blank=True)
    rest_approval = models.BooleanField(default=False)
    order_picked = models.BooleanField(default=False)
    pick_up_by = models.CharField(max_length=50,blank=True)
    order_delivered = models.BooleanField(default=False)
    canceled = models.BooleanField(default=False,blank=True)
    
    class Meta:
        ordering = ('-created',)

    def __str__(self):
        return self.invoice_no

    def get_total_cost(self):
        return sum(item.get_cost() for item in self.items.all())

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='order', on_delete=models.CASCADE)
    product = models.ForeignKey(Foods, related_name='order_items', on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)
    
    
    def __str__(self):
        return '{}'.format(self.id)

    def get_cost(self):
        return self.price * self.quantity
