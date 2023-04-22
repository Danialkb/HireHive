from . import models, serializers, permissions
from rest_framework.viewsets import ModelViewSet
from utils import mixins


class JobPostViewSet(ModelViewSet):
    serializer_class = serializers.JobPostSerializer
    queryset = models.JobPost.objects.all()
    permission_classes = permissions.IsEmployerOrReadOnly,
