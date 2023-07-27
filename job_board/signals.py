from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.conf import settings
from django.core.mail import send_mail
from django.db.models.signals import post_save
from django.dispatch import receiver

from chat.models import Room
from users.models import User
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


@receiver(post_save, sender=models.JobPost)
def send_message_to_employees(sender, instance, **kwargs):
    employees = User.objects.filter(user_type='Employee')
    send_mail(
        subject='New job post!!',
        message=f'This job post may be of interest for you!\n{instance.title} {instance.location} {instance.salary}\n{instance.description}',
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[e.email for e in employees],
        fail_silently=False
    )


@receiver(post_save, sender=models.Applicant)
def create_chat_room(sender, instance, **kwargs):
    Room.objects.bulk_create([Room(user_id=instance.user_id), Room(user_id=instance.job_post.user.id)])
