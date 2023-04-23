from typing import Protocol, OrderedDict

from job_board.models import JobPost
from job_board.repos import JobPostReposInterface, JobPostReposV1


class JobPostServiceInterface(Protocol):
    def get_job_post(self, data: OrderedDict) -> JobPost: ...


class JobPostServiceV1:
    job_post_repos: JobPostReposInterface = JobPostReposV1()

    def get_job_post(self, data: OrderedDict) -> JobPost:
        return self.job_post_repos.get_job_post(data=data)

