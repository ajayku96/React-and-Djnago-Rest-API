from django.shortcuts import render
from .models import OrderItem,Order
from API.models import Foods,Restaurant
from API.serializer import FoodsSerializer,FoodsManagerSerializer
from accounts.models import User

from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

# Create your views here.
from rest_framework import viewsets
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from rest_framework.authtoken.models import Token
from .serializer import OrderSerializer,OrderItemSerializer,OrderMangerItemSerializer,OrderDeliveryPUTSerializer,OrderCreationSerializer,OrderUpdateTransParentView,OrderCancelByUser
from accounts.serializers import UserUpdateCoardinatesSerializer,deliveryAgencyInfoForBuyer

from API.serializer import RestaurantSerializer


@api_view(['GET', 'POST'])
def orderCreate(request):
    if request.method == 'POST':
        items = request.headers['items']
        price = request.headers['price']
        quantity = request.headers['quantity']
        list_of_food = items.split(',')
        list_of_price = price.split(',')
        list_of_quantity = quantity.split(',')
        print(list_of_food,list_of_price,list_of_quantity)
        
        serializer = OrderCreationSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            order = Order.objects.get(invoice_no=serializer.data['invoice_no'])
           
            for food,price,quantity in zip(list_of_food,list_of_price,list_of_quantity):
                food_order = Foods.objects.get(id=food)
                x = OrderItem.objects.create(order=order,product=food_order,price=price,quantity=quantity)
                x.save()
            print(serializer.data['invoice_no'])
            return Response(serializer.data['invoice_no'])
        return Response('order unsuccessfull', status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def orders(request):
    if request.method == 'GET':
        email = request.headers['email']
        data = Order.objects.filter(email=email)
        serializer = OrderSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)


#manager recieved orders
@api_view(['GET', 'POST'])
def ordersRestDetails(request):
    if request.method == 'GET':
        user = User.objects.get(email=request.headers['email'])
        rest = Restaurant.objects.filter(user=user)[0]
        items = OrderItem.objects.filter(product__res_name=rest)
        serializer = OrderMangerItemSerializer(items, context={'request': request}, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
def orderedFoodDetails(request):
    if request.method == 'GET':
        foodid = Foods.objects.get(id=request.headers['id'])
        serializer = FoodsSerializer(foodid, context={'request': request})
        return Response(serializer.data)


#OrderDetails
@api_view(['GET'])
def orderedFoodDetails(request):
    if request.method == 'GET':
        order = Order.objects.get(invoice_no=request.headers['ordernumber'])
        print(order)
        orderItems = OrderItem.objects.filter(order=order)
        print(orderItems)
        serializer = OrderItemSerializer(orderItems, context={'request': request},many=True)
        return Response(serializer.data)


#order update by rest-manager, delivery boy
@api_view(['PUT'])
def orderUpdate(request):
    if request.method == 'PUT': 
        id = request.headers['id']
        full_name = request.headers['name']
        email = request.headers['email']
        phone = request.headers['phone']
        address = request.headers['address']
        rest_update = request.headers['update']
        order = Order.objects.get(id=id)
        order = OrderSerializer(order, data={'full_name':full_name,'email':email,'phone':phone,'address':address,'rest_approval':rest_update}) 
        if order.is_valid(): 
            order.save() 
            return Response(order.data) 
        return Response(order.errors, status=status.HTTP_400_BAD_REQUEST) 


#food update by rest-manager, delivery boy
@api_view(['PUT'])
def foodUpdate(request):
    if request.method == 'PUT': 
        id = request.headers['id']
        food_name = request.headers['name']
        price = request.headers['price']
        description = request.headers['description']
        # resid = request.headers['resid']
        foodcat = request.headers['foodcat']
        
        food = Foods.objects.get(id=id)
        order = FoodsManagerSerializer(food, data={'name':food_name,'description':description,'price':price,'food_cat':foodcat}) 
        if order.is_valid(): 
            order.save() 
            return Response(order.data) 
        return Response(order.errors, status=status.HTTP_400_BAD_REQUEST) 


#manager Food Delete
@api_view(['DELETE'])
def foodDeleteManager(request):
    if request.method == 'DELETE': 
        id = request.headers['id']
        order = Foods.objects.get(id=id).delete()
        return Response(order.data) 
# @api_view(["DELETE"])


# @api_view(['GET'])
# def restItemAdd(request):
#     if request.method == 'GET':
#         email = User.objects.get(email=request.headers['email'])
#         rest = Restaurant.objects.get(user=user)
#         data = Foods.objects.filter(res_name=rest)
#         serializer = FoodsXSerializer(data, context={'request': request}, many=True)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)




#Delivery Boy
@api_view(['GET'])
def ordersDeliverBoy(request):
    if request.method == 'GET':
        x = []
        order = Order.objects.filter(rest_approval=True,order_delivered=False)
        for i in order:
            x.append(i.id)
        orderItem = OrderItem.objects.filter(order__in=x)
        serializer = OrderMangerItemSerializer(orderItem, context={'request': request}, many=True)
        return Response(serializer.data)


#order update by delivery boy
@api_view(['PUT'])
def orderUpdatePickUp(request):
    if request.method == 'PUT': 
        id = request.headers['id']
        rest_update = request.headers['update']
        print(rest_update)
        pickupby = request.headers['by']
        order = Order.objects.get(id=id)
        order = OrderDeliveryPUTSerializer(order, data={'order_picked':rest_update,'pick_up_by':pickupby}) 
        if order.is_valid(): 
            order.save() 
            return Response(order.data) 
        return Response(order.errors, status=status.HTTP_400_BAD_REQUEST) 

#order_delivered
@api_view(['PUT'])
def orderUpdateDelivery(request):
    if request.method == 'PUT': 
        id = request.headers['id']
        deliveryStatus = request.headers['update']
        order = Order.objects.get(id=id)
        order = OrderDeliveryPUTSerializer(order, data={'order_delivered':deliveryStatus}) 
        if order.is_valid(): 
            order.save() 
            return Response(order.data) 
        return Response(order.errors, status=status.HTTP_400_BAD_REQUEST) 


#opdate_Coardinates_Delivery_Boy
@api_view(['PUT'])
def orderUpdateDeliveryCoordinates(request):
    if request.method == 'PUT': 
        id = request.headers['email']
        user = User.objects.get(email=id)
        longitude = request.headers['longitude']
        latitude = request.headers['latitude']
        order = UserUpdateCoardinatesSerializer(user, data={'longitude':longitude,'latitude':latitude}) 
        if order.is_valid(): 
            order.save() 
            return Response(order.data) 
        return Response(order.errors, status=status.HTTP_400_BAD_REQUEST) 


#manager recieved orders
@api_view(['GET', 'POST'])
def ordersUpdateUser(request):
    if request.method == 'GET':
        order = Order.objects.get(invoice_no=request.headers['order'])
        items = OrderItem.objects.filter(order=order)
        serializer = OrderUpdateTransParentView(items, context={'request': request}, many=True)
        return Response(serializer.data)

#manager recieved orders
@api_view(['GET'])
def restIDforUploadData(request):
    if request.method == 'GET':
        user = User.objects.get(email=request.headers['email'])
        rest = Restaurant.objects.filter(user=user)
        serializer = RestaurantSerializer(rest, context={'request': request}, many=True)
        return Response(serializer.data)


#deliveryBoy Location for Buyer and Restaurant
@api_view(['GET'])
def updateInfoForBuyerAndRestaurant(request):
    if request.method == 'GET':
        user = User.objects.get(email=request.headers['email'])
        serializer = deliveryAgencyInfoForBuyer(user,context={'request': request})
        return Response(serializer.data)


#user ordercancel put method
@api_view(['PUT'])
def updateDeliveryCancelByUser(request):
    if request.method == 'PUT':
        order_number = request.headers['ordernumber']
        status = request.headers['status']
        cancelorder = Order.objects.get(invoice_no=order_number)
        serializer = OrderCancelByUser(cancelorder,data={'canceled':status})
        if serializer.is_valid(): 
            serializer.save() 
            return Response(serializer.data) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 