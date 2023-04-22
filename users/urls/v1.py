from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from users import views

urlpatterns = [
    path(r'users/', views.UserViewSet.as_view({'post': 'create_user'})),
    path(r'users/user/', views.UserViewSet.as_view({'post': 'get_user'})),
    path(r'users/<int:id>/job_posts/', views.UserViewSet.as_view({'get': 'get_job_posts'})),
    path(r'users/verify/', views.UserViewSet.as_view({'post': 'verify_user'})),
    path(r'users/token/', views.UserViewSet.as_view({'post': 'create_token'})),
    path(r'users/token/verify/', views.UserViewSet.as_view({'post': 'verify_token'})),
    path(r'users/token/refresh/', TokenRefreshView.as_view()),
]
