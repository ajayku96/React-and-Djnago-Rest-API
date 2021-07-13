from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

class UserManager(BaseUserManager):
    def create_user(self, email, username, password=None):

        if not email:
            raise ValueError('Users must have an email address')

        if not username:
            raise ValueError('User must have user name')

        user = self.model(
            email=self.normalize_email(email),
            username=username,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email,username, password=None):

        user = self.create_user(
            email,
            password=password,
            username=username
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

user_types =(
    ("cus", "Customer"),
    ("man", "Manager"),
    ("da", "Delivery Agent"),
)

class User(AbstractBaseUser):
    username = models.CharField(
        verbose_name='Username',
        max_length=50,
        unique=True, )
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    full_name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    address = models.CharField(max_length=500,blank=True)
    type = models.CharField(
        max_length=3,
        choices=user_types
    )
    mobile = models.CharField(max_length=15)
    latitude = models.CharField(max_length=60,blank=True)
    longitude = models.CharField(max_length=60,blank=True)


    image = models.ImageField(blank=True)
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin

@receiver(post_save,sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)