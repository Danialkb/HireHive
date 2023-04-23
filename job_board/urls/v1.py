from rest_framework.routers import DefaultRouter
from job_board import views

router = DefaultRouter()

router.register(r'job-posts', views.JobPostViewSet)
router.register(r'applicants', views.ApplicantViewSet)

urlpatterns = router.urls
