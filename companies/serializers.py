from rest_framework import serializers
from . import models


class CreateCompanySerializer(serializers.ModelSerializer):
    employer = serializers.HiddenField(default=serializers.CurrentUserDefault)

    class Meta:
        model = models.Company
        fields = ('employer', 'name', 'location', 'description', 'website', 'logo')


class CompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Company
        fields = ('name', 'location', 'description', 'website', 'logo')
