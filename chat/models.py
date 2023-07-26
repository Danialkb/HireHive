import uuid

from django.db import models

from users.models import User


class Room(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=200, default=f'chat{id}')
    user = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='rooms')
    created_at = models.DateTimeField(auto_now_add=True)
