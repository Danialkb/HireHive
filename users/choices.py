from django.db import models


class UserTypeChoices(models.TextChoices):
    Employee = 'Employee'
    Employer = 'Employer'
