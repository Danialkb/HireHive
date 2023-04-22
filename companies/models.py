import uuid

from django.db import models

from users.models import User


class Company(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user = models.OneToOneField(to=User, on_delete=models.CASCADE, related_name='company', default=None)
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255, blank=True)
    website = models.URLField(blank=True)
    description = models.TextField(blank=True)
    logo = models.ImageField(upload_to='company_logos/', blank=True, null=True)

    def __str__(self):
        return self.name
