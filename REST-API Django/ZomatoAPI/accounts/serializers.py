from rest_framework import serializers
from accounts.models import User


class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['username','full_name','email', 'password','password2','type','mobile']
        extra_kwargs = {
            'password' : {'write_only': True}
        }

    def save(self):
        account = User(email=self.validated_data['email'], 
        username= self.validated_data['username'],
        type = self.validated_data['type'],
        full_name = self.validated_data['full_name'],
        mobile = self.validated_data['mobile'],
        )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        
        if password != password2:
            raise serializers.ValidationError({'password':'password must match'})
        account.set_password(password)
        account.save()
        return account

#for DeliverBoy
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','full_name','email','longitude','latitude', 'address','mobile']

#for DeliverBoy
class UserUpdateCoardinatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['longitude','latitude']


#for Buyer to get DeliveryBoy Information
class deliveryAgencyInfoForBuyer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['full_name','mobile','latitude','longitude']


#updatePassword
class UserUpdatePassword(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['password']