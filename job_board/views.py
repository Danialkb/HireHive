from rest_framework.decorators import action
from rest_framework.response import Response

from . import models, serializers, permissions
from rest_framework.viewsets import ModelViewSet
from utils import mixins
from . import services


class JobPostViewSet(ModelViewSet):
    serializer_class = serializers.JobPostSerializer
    queryset = models.JobPost.objects.all()
    permission_classes = permissions.IsEmployerOrReadOnly,
    job_post_service: services.JobPostServiceInterface = services.JobPostServiceV1()

    @action(detail=True, methods=['GET'])
    def applicants(self, request, *args, **kwargs):
        job_post = self.job_post_service.get_job_post(data={'id': kwargs['pk']})
        applicants = job_post.applicants.all()
        applicants_serializer = serializers.ApplicantSerializer(applicants, many=True)

        return Response(applicants_serializer.data)


class ApplicantViewSet(ModelViewSet):
    serializer_class = serializers.ApplicantSerializer
    queryset = models.Applicant.objects.all()
