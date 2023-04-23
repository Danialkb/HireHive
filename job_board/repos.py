from typing import Protocol, OrderedDict

from rest_framework.generics import get_object_or_404

from job_board.models import JobPost


class JobPostReposInterface(Protocol):
    @staticmethod
    def get_job_post(data: OrderedDict) -> JobPost: ...


class JobPostReposV1:

    @staticmethod
    def get_job_post(data: OrderedDict) -> JobPost:
        return get_object_or_404(JobPost, **data)

