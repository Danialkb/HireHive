from django.contrib import admin
from . import models

admin.site.register(models.JobPost)
admin.site.register(models.Applicant)
