from django.db import models


class ApplicantStatusChoices(models.TextChoices):
    UnderConsideration = 'UnderConsideration'
    Denied = 'Denied'
    Invited = 'Invited'
