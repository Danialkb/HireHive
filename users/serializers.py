from rest_framework import serializers
from . import models
from companies.serializers import CompanySerializer
from companies.models import Company


class CreateUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.User
        fields = ('id', 'first_name', 'last_name', 'email', 'phone_number', 'password', 'user_type')


class GetUserInfoSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)

    class Meta:
        model = models.User
        fields = ('id', 'first_name', 'company', 'last_name', 'email', 'phone_number', 'password', 'user_type')


class VerifyUserSerializer(serializers.Serializer):
    session_id = serializers.UUIDField()
    code = serializers.CharField(max_length=4)


class CreateTokenSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=128)


class GetUserSerializer(serializers.Serializer):
    access_token = serializers.CharField(max_length=255)

