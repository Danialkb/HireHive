import uuid

from django.db import models
from django.utils import timezone

from companies.models import Company
from users.models import User
from . import choices


# class Category(models.Model):
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4)
#     name = models.CharField(max_length=255)
#     description = models.TextField(blank=True)
#
#     def __str__(self):
#         return self.name


class JobPost(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='job_posts', default=None)
    # category = models.ForeignKey(to=Category, on_delete=models.CASCADE, related_name='job_posts', default=None)
    title = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=255)
    salary = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class Applicant(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    job_post = models.ForeignKey(to=JobPost, on_delete=models.CASCADE, related_name='applicants')
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    covering_letter = models.TextField(default='')
    resume = models.FileField(upload_to='applicant_resumes/', blank=True, null=True)
    status = models.CharField(
        max_length=18,
        choices=choices.ApplicantStatusChoices.choices,
        blank=True,
        null=True,
        default=choices.ApplicantStatusChoices.UnderConsideration
    )

    def __str__(self):
        return f'{self.user}'
