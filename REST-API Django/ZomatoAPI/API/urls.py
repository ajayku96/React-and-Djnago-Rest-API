from django.urls import include, path,re_path
from django.conf.urls import url
from rest_framework import routers
from . import views
from django.conf import settings
from django.views.static import serve
from .views import restaurantList,ApiListView,RestaurantAPI,Restaurants_detail,userApi,foodCart,restItemAdd,foodCatAPI,RestaurantManagerAPI



router = routers.DefaultRouter()
router.register(r'restaurant', views.RestaurantViewSet)
router.register(r'food', views.FoodsViewSet)
router.register(r'foodCategory',views.FoodsCategoryViewSet)
# router.register(r'profile', views.userApi)
# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    re_path(r'restro/',restaurantList),
    path('x/', include('accounts.urls')),
    path('list/',ApiListView.as_view(),name='api'),
    path('restfoodlist/',RestaurantAPI,name='restfoodlistapi'),
    path('foodCart/',foodCart,name='foodcart'),
    path('profile/',userApi),
    path('itemAdd/',restItemAdd),
    path('foodCat/',foodCatAPI),
    path('restfoodMangerlist/',RestaurantManagerAPI,name='restfoodlistapi'),#manager
]
urlpatterns += [
    url(r'^media/(?P<path>.*)$', serve, {
        'document_root': settings.MEDIA_ROOT,
    }),
]