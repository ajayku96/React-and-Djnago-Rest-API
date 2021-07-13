from django.contrib import auth
from django.shortcuts import render, redirect
from .forms import RegisterForm
from .models import User
from django.contrib.auth.hashers import make_password
from accounts.serializers import UserUpdatePassword
# Create your views here.

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from accounts.serializers import RegisterSerializer,UserUpdatePassword
from rest_framework.authtoken.models import Token

from rest_framework.generics import  ListAPIView
from rest_framework.filters import SearchFilter,OrderingFilter



@api_view(['POST',])
def registration_view(request):
    if request.method == 'POST':
        serializer = RegisterSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            account = serializer.save()
            data['response'] = "successfully registerd a new user"
            data['email'] = account.email
            data['username'] = account.username
            token = Token.objects.get(user=account).key
            data['token'] = token
        else:
            data = serializer.errors
        return Response(data)




# @permission_classes((IsAuthenticatedOrReadOnly))
# class ApiListView(ListAPIView):
#     queryset = User.objects.all()
#     serializer_class = RegisterSerializer
#     filter_backends = (SearchFilter,OrderingFilter)
#     search_fields = ('username','email',)











def register(request):
    if request.user.is_authenticated:
        return redirect('/')
    else:
        form = {}
        if request.method == 'POST':
            email = request.POST['email']
            username = request.POST['username']
            password = request.POST['pass1']
            password2 = request.POST['pass2']
            form_data = {"email": email, "username": username, "password": password, "password2": password2, }
            form = RegisterForm(form_data)
            if form.is_valid():
                user = User(email=email, password=make_password(password), username=username)
                user.save()
                user = auth.authenticate(email=email, password=password)
                if user is not None:
                    auth.login(request, user)
                    # return redirect('Dashboard:info')
                return redirect('accounts:register')
            else:
                return render(request, 'accounts/register.html', {"form": form})
        return render(request, 'accounts/register.html', {"form": form})


def login(request):
    form = {}
    if request.user.is_authenticated:
    #     return redirect('Dashboard:info')
    # else:
        if request.method == 'POST':
            email = request.POST['email']
            password = request.POST['password']
            print(email, password)
            user = auth.authenticate(email=email, password=password)
            if user is not None:
                auth.login(request, user)
                print('authenticated')
                # return redirect('Dashboard:info')
            else:
                errors = "User name or password is incorrect"
                return render(request, 'accounts/login.html', {"errors": errors})
        return render(request, 'accounts/login.html', {"form": form})


def logout(request):
    auth.logout(request)
    # return redirect('Dashboard:info')


@api_view(['PUT'])
def passwordReset(request):
    if request.method == 'PUT':
        email = request.headers['email']
        password = request.headers['pass']
        password2 = request.headers['pass2']
        if password == password2:
            print('password matched')
            password = make_password(password)
        user = User.objects.get(email=email)

        serializer = UserUpdatePassword(user,data={"password":password})
        if serializer.is_valid(): 
            serializer.save() 
            return Response("changed") 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

    