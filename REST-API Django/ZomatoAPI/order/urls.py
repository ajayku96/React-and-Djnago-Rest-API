from django.urls import path
from . import views

app_name = 'order'

urlpatterns = [
    path('create/', views.orderCreate, name='order_create'),
    path('orders/', views.orders, name='order_detail'),
    path('restorders/', views.ordersRestDetails, name='rest_detail'),
    path('food-orders-details/', views.orderedFoodDetails, name='order_detail'),
    path('food-manager-add-help-rest-id/', views.restIDforUploadData, name='restIDforUploadData'),
    path('order-update/', views.orderUpdate, name='orderUpate'),
    
    path('food-manager-delete/', views.foodDeleteManager, name='foodManagerDelete'),
    path('food-manager-update/', views.foodUpdate, name='foodManagerUpdate'),

    path('food-delevery-details/', views.ordersDeliverBoy, name='foodDeliveryBoy'),
    path('food-pickup-update/', views.orderUpdatePickUp, name='orderUpdatePickUp'),
    path('food-delivery-update/', views.orderUpdateDelivery, name='orderUpdateDelivery'),
    path('food-delivery-update-cooardinates/', views.orderUpdateDeliveryCoordinates, name='orderUpdateDeliveryCoordinates'),

    path('user-food-update/', views.ordersUpdateUser, name='ordersUpdateUser'),
    path('order-Details-for-user/', views.orderedFoodDetails, name='orderedFoodDetails'),
    path('user-deliveryAgency-info/', views.updateInfoForBuyerAndRestaurant, name='updateInfoForBuyerAndRestaurant'),
    path('user-Order-Cancel/', views.updateDeliveryCancelByUser, name='updateDeliveryCancelByUser')
    
]