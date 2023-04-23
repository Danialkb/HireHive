from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from . import serializers, models


class CompanyViewSet(ModelViewSet):
    serializer_class = serializers.CompanySerializer
    queryset = models.Company.objects.all()




