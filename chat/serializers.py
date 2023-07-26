from rest_framework import serializers

from chat.models import Room


class RoomModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Room
        fields = '__all__'
        read_only_fields = ('id', )
