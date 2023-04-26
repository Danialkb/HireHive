from rest_framework import serializers
from users.models import User
from . import models


class CompanySerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = models.Company
        fields = ('id', 'user', 'name', 'location', 'description', 'website', 'logo')
