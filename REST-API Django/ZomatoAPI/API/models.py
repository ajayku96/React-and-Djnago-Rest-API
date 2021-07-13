from django.db import models
from accounts.models import User

class Restaurant(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=60)
    description = models.TextField(max_length=200,null=True)
    res_img = models.ImageField(upload_to="Restaurant")
    location = models.CharField(max_length=50)
    latitude = models.CharField(max_length=50,blank=True)
    longitude = models.CharField(max_length=50,blank=True)
    res_avg_rating = models.FloatField()
    def __str__(self):
        return self.name

class FoodCategory(models.Model):
    category = models.CharField(max_length=20)
    description = models.CharField(max_length=200,null=True)
    def __str__(self):
        return self.category

class Foods(models.Model):
    res_name = models.ForeignKey(Restaurant,on_delete=models.CASCADE)
    name = models.CharField(max_length=60)
    description = models.TextField(max_length=200,null=True)
    food_cat = models.ForeignKey(FoodCategory,on_delete=models.CASCADE)
    food_img = models.ImageField(upload_to="Foods")
    food_rating = models.FloatField()
    price = models.FloatField()
    
    def __str__(self):
        return self.name