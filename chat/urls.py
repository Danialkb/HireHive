from rest_framework.routers import DefaultRouter

from chat.views import RoomViewSet

router = DefaultRouter()

router.register(r'chats', RoomViewSet)

urlpatterns = router.urls
