from rest_framework import serializers

from .models import Foods,Restaurant,FoodCategory
from accounts.models import User
from accounts.serializers import UserSerializer

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ('id','name','description', 'location','res_avg_rating','res_img')

class FoodsSerializer(serializers.ModelSerializer):
    res_name = RestaurantSerializer()
    class Meta:
        model = Foods
        fields = ('id','res_name', 'name','description','food_cat','food_rating','price','food_img')

class FoodsXSerializer(serializers.ModelSerializer):
    class Meta:
        model = Foods
        fields = ('res_name','name','description','food_cat','food_rating','price','food_img')

class FoodsCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodCategory
        fields = ('id','category','description')

class RestaurantFoodSerializer(serializers.ModelSerializer):
    res_name = RestaurantSerializer()
    class Meta:
        model = Foods
        fields = ('id','res_name','name','description','food_cat','price','food_img','food_rating',)
        
class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','full_name','email','image','type','address','mobile')

#only for update / Cause of image
class FoodsManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Foods
        fields = ('id', 'name','description','food_cat','price')




#only for DeliverBoy
class DeliveryBoyRestaurantSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Restaurant
        fields = ('id','user','name','description', 'latitude','longitude','location','res_avg_rating','res_img')


class FoodsSerializer(serializers.ModelSerializer):
    res_name = DeliveryBoyRestaurantSerializer()
    class Meta:
        model = Foods
        fields = ('id','res_name', 'name','description','food_cat','food_rating','price','food_img')