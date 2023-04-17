from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from . import serializers, models
from utils import mixins


class CompanyViewSet(ModelViewSet, mixins.ActionSerializerMixin):
    ACTION_SERIALIZERS = {
        'create': serializers.CreateCompanySerializer,
    }
    serializer_class = serializers.CompanySerializer
    queryset = models.Company.objects.all()
    permission_classes = (IsAuthenticated, )
