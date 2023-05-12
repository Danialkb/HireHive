import json

from channels.generic.websocket import AsyncWebsocketConsumer


class JobPostApplicantConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.applicant_id = self.scope['url_route']['kwargs']['applicant_id']

        await self.channel_layer.group_add(
            f'{self.applicant_id}',
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            f'{self.applicant_id}',
            self.channel_name
        )

    async def send_notification(self, event: dict):

        await self.send(text_data=json.dumps(event))

    # async def notify_applicant(self, event: dict):
    #     status = event.get('status')
    #
    #     notification = {
    #         'message': f'Your application status is "{status}".'
    #     }
    #
    #     await self.send_notification(notification)


