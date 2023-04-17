from rest_framework import serializers
from . import models


class CreateUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.User
        fields = ('first_name', 'last_name', 'email', 'phone_number', 'password', 'user_type')


class VerifyUserSerializer(serializers.Serializer):
    session_id = serializers.UUIDField()
    code = serializers.CharField(max_length=4)


class CreateTokenSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=128)
