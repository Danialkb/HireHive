from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.db.models.signals import post_save
from django.dispatch import receiver

from . import models


@receiver(post_save, sender=models.Applicant)
def send_applicant_notification(sender, instance, **kwargs):
    channel_layer = get_channel_layer()
    group_send = async_to_sync(channel_layer.group_send)
    group_send(
        f'{instance.id}',
        {
            'type': 'send_notification',
            'status': instance.status,
        }
    )
