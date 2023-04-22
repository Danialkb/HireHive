from django.urls import path, include

urlpatterns = [
    path('', include('users.urls.v1')),
    path('', include('companies.urls.v1')),
    path('', include('job_board.urls.v1')),
]
