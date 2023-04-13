from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from users import views

urlpatterns = [
    path(r'users/', views.UserViewSet.as_view({'post': 'create_user'})),
    path(r'users/verify/', views.UserViewSet.as_view({'post': 'verify_user'})),
    path(r'users/token/', views.UserViewSet.as_view({'post': 'create_token'})),
    path(r'users/token/verify/', views.UserViewSet.as_view({'post': 'verify_token'})),
    path(r'users/token/refresh/', TokenRefreshView.as_view()),
]
