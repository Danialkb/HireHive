from rest_framework.decorators import action
from rest_framework.response import Response

from . import models, serializers, permissions
from rest_framework.viewsets import ModelViewSet
from rest_framework import filters
from . import services
from utils import mixins


class JobPostViewSet(mixins.ActionPermissionMixin, ModelViewSet):
    ACTION_PERMISSIONS = {
        'update': (permissions.IsEmployerAndOwner(), ),
        'destroy': (permissions.IsEmployerAndOwner(), )
    }
    serializer_class = serializers.JobPostSerializer
    queryset = models.JobPost.objects.all()
    permission_classes = permissions.IsEmployerOrReadOnly,
    job_post_service: services.JobPostServiceInterface = services.JobPostServiceV1()
    filter_backends = [filters.SearchFilter]
    search_fields = ['title']

    @action(detail=True, methods=['GET'], permission_classes=[permissions.IsEmployerAndOwner, ])
    def applicants(self, request, *args, **kwargs):
        self.check_object_permissions(request, models.JobPost.objects.get(id=kwargs['pk']))
        job_post = self.job_post_service.get_job_post(data={'id': kwargs['pk']})
        applicants = job_post.applicants.all()
        applicants_serializer = serializers.ApplicantSerializer(applicants, many=True)

        return Response(applicants_serializer.data)


class ApplicantViewSet(ModelViewSet):
    serializer_class = serializers.ApplicantSerializer
    queryset = models.Applicant.objects.all()
