import uuid

from django.db import models
from companies.models import Company
from users.models import User


class Category(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class JobPost(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    company = models.ForeignKey(to=Company, on_delete=models.CASCADE, related_name='job_posts')
    categories = models.ManyToManyField(Category, related_name='job_posts')
    title = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=255)
    salary = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return self.title


class Applicant(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    job_post = models.ForeignKey(to=JobPost, on_delete=models.CASCADE, related_name='applicants')
    user = models.OneToOneField(to=User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    resume = models.FileField(upload_to='applicant_resumes/', blank=True, null=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
