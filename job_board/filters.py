from django_filters import FilterSet
from . import models


class JobPostFilterSet(FilterSet):

    class Meta:
        model = models.JobPost
        fields = ('title', )
