from django.contrib import admin
from API.models import Foods,Restaurant,FoodCategory

# Register your models here.

admin.site.register(FoodCategory)
@admin.register(Foods)
class Foods(admin.ModelAdmin):
    list_display = ['name',]

@admin.register(Restaurant)
class Restaurant(admin.ModelAdmin):
    list_display = ['name',]