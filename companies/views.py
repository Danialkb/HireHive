from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from . import serializers, models


class CompanyViewSet(ModelViewSet):
    serializer_class = serializers.CompanySerializer
    queryset = models.Company.objects.all()
