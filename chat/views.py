from rest_framework.viewsets import ModelViewSet

from chat.models import Room
from chat.serializers import RoomModelSerializer


class RoomViewSet(ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomModelSerializer

