from django.urls import path

from . import consumers


websocket_urlpatterns = [
    path('ws/applicants/<applicant_id>/', consumers.JobPostApplicantConsumer.as_asgi()),
]
