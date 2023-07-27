from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from chat.models import Room
from chat.serializers import RoomModelSerializer


class RoomViewSet(ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomModelSerializer
    permission_classes = (IsAuthenticated, )

    def list(self, request, *args, **kwargs):
        data = Room.objects.filter(user__id=request.user.id)
        serializer = RoomModelSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data)


