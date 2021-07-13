from rest_framework import serializers

from .models import Order,OrderItem
from API.serializer import FoodsSerializer,RestaurantSerializer,DeliveryBoyRestaurantSerializer

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id','full_name','created','updated','paid','invoice_no','email','phone','address','rest_approval','order_picked','pick_up_by','order_delivered','canceled']

class OrderItemSerializer(serializers.ModelSerializer):
    order = OrderSerializer()

    # order = OrderSerializer(read_only=True,many=True)
    # restaurant = RestaurantSerializer(read_only=True,many=True)
    # product = FoodsSerializer(read_only=True,many=True)
    
    class Meta:
        model = OrderItem
        fields = ('order','product','price','quantity')

class OrderMangerItemSerializer(serializers.ModelSerializer):
    order = OrderSerializer()
    product = FoodsSerializer()  
    class Meta:
        model = OrderItem
        fields = ('order','product','price','quantity')


# PUT delivery Agent Only
class OrderDeliveryPUTSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['order_picked','pick_up_by','order_delivered']



#orderCreate by User Application
class OrderCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['full_name','created_by','paid','invoice_no','email','phone','address']


#orderCreate by User Application
class OrderUpdateTransParentView(serializers.ModelSerializer):
    order = OrderSerializer()
    product = FoodsSerializer()
    class Meta:
        model = OrderItem
        fields = ['order','product','price','quantity']

#order cancel by User
class OrderCancelByUser(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['canceled']


