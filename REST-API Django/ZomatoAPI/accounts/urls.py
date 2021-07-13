from django.urls import path
from . import views
from accounts.views import registration_view
# ApiListView

from rest_framework.authtoken.views import obtain_auth_token

app_name = 'accounts'

urlpatterns = [
    path('login/',views.login,name='login'),
    path('register/',views.register,name='register'),
    path('logout/',views.logout,name='logout'),
    path('api/reg/',registration_view,name='apireg'),
    path('api/login',obtain_auth_token,name='apilogin'),
    path('api/password-reset/',views.passwordReset,name='passwordReset'),
    # path('list/',ApiListView.as_view(),name='listpai')
]
