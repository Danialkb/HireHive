from channels.generic.websocket import AsyncWebsocketConsumer
import json


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name  # Use the channel_name as the unique identifier for the consumer
        )

        await self.accept()

    async def disconnect(self, _):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name  # Use the channel_name as the unique identifier for the consumer
        )

    async def receive(self, text_data=None, bytes_data=None):
        data = json.loads(text_data)
        message = data['message']
        room = data['room']

        await self.channel_layer.group_send(
            f'chat_{room}',
            {
                'type': 'chat_message',
                'message': message,
                'room': room
            }
        )

    async def chat_message(self, event):
        message = event['message']
        room = event['room']
        await self.send(
            text_data=json.dumps({
                'message': message,
                'room': room
            })
        )
