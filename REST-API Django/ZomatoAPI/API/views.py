from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

# Create your views here.
from rest_framework import viewsets

from .serializer import RestaurantSerializer,FoodsSerializer,RestaurantFoodSerializer,UserSerializers,FoodsCategorySerializer,FoodsXSerializer
from .models import Foods,Restaurant,FoodCategory
from accounts.models import User

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated

from rest_framework.authtoken.models import Token

from rest_framework.generics import  ListAPIView
from rest_framework.filters import SearchFilter,OrderingFilter



class RestaurantViewSet(viewsets.ModelViewSet):
    queryset = Restaurant.objects.all().order_by('res_avg_rating').reverse()
    serializer_class = RestaurantSerializer

class FoodsCategoryViewSet(viewsets.ModelViewSet):
    queryset = FoodCategory.objects.all()
    serializer_class = FoodsCategorySerializer

class FoodsViewSet(viewsets.ModelViewSet):
    queryset = Foods.objects.all().order_by('name')
    serializer_class = FoodsSerializer
    search_fields = ('name','price')



@api_view(['GET', 'POST'])
def restaurantList(request):
    if request.method == 'GET':
        data = restaurant.objects.all()
        serializer = RestaurantSerializer(data, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = RestaurantSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
def foodCart(request):
    try:
        x = request.headers['data'].split(',')
        cart = Foods.objects.filter(id__in=x)
        serializer = FoodsSerializer(cart, many=True)
        return Response(serializer.data)
    except Restaurant.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT', 'DELETE'])
def Restaurants_detail(request, pk):
    try:
        restaurant = RestaurantSerializer.objects.get(pk=pk)
    except Restaurant.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = RestaurantSerializer(restaurant, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        restaurant.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#loginView

# @api_view(['POST',])
# def registration_view(request):
#     if request.method == 'POST':
#         serializer = RegisterSerializer(data=request.data)
#         data = {}
#         if serializer.is_valid():
#             account = serializer.save()
#             data['response'] = "successfully registerd a new user"
#             data['email'] = account.email
#             data['username'] = account.username
#             token = Token.objects.get(user=account).key
#             data['token'] = token
#         else:
#             data = serializer.errors
#         return Response(data)



from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters

class FoodFilter(filters.FilterSet):
    min_price = filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = filters.NumberFilter(field_name="price", lookup_expr='lte')

    class Meta:
        model = Foods
        fields = ['name', 'price', 'min_price', 'max_price']


class ApiListView(ListAPIView):
    queryset = Foods.objects.all()
    serializer_class = FoodsSerializer
    search_fields = ('name','price')
    filterset_class = FoodFilter
    filter_backends = [OrderingFilter,SearchFilter]


@api_view(['GET', 'POST'])
def RestaurantAPI(request):
    if request.method == 'GET':
        try:
            restaurant_data = Restaurant.objects.get(name=request.headers['data'])
            data = Foods.objects.filter(res_name=restaurant_data)
        except:
            data = Foods.objects.all()
        serializer = RestaurantFoodSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = RestaurantFoodSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','POST'])
def restItemAdd(request):
    if request.method == 'GET':
        user = User.objects.get(email=request.headers['email'])
        rest = Restaurant.objects.get(user=user)
        data = Foods.objects.filter(res_name=rest)
        serializer = FoodsXSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    if request.method == 'POST':
        user = User.objects.get(email=request.headers['email'])
        serializer = FoodsXSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET', 'POST'])
def userApi(request):
    if request.method == 'GET':
        try:
            data = User.objects.filter(username=request.user)
            # data = User.objects.all()
        except:
            data = User.objects.all()
        serializer = UserSerializers(data, context={'request': request}, many=True)

        return Response(serializer.data)

@api_view(['GET', 'POST'])
def foodCatAPI(request):
    if request.method == 'GET':
        data = FoodCategory.objects.all()
        serializer = FoodsCategorySerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)


#Restaurant manager food view
@api_view(['GET', 'POST'])
def RestaurantManagerAPI(request):
    if request.method == 'GET':
        user = User.objects.get(email=request.headers['data'])
        restaurant_data = Restaurant.objects.get(user=user)
        data = Foods.objects.filter(res_name=restaurant_data)
        serializer = RestaurantFoodSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = RestaurantFoodSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
