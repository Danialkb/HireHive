import {Component, OnInit} from '@angular/core';
import {JobBoardService} from "../job-board.service";
import {ActivatedRoute, Router} from "@angular/router";
import {JobPost} from "../models";

@Component({
  selector: 'app-job-post-details',
  templateUrl: './job-post-details.component.html',
  styleUrls: ['./job-post-details.component.css']
})
export class JobPostDetailsComponent implements OnInit{
  jobPost!: JobPost;
  showDeleteButton: boolean = false;
  createTime: string = '';
  constructor(
    private jobService: JobBoardService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    const jobId = String(this.route.snapshot.paramMap.get('jobPostId'));

    this.showDeleteButton = this.getUserTypeFromParam() === 'Employer';

    this.jobService.getJobPost(jobId).subscribe((post: JobPost) => {
      this.jobPost = post;
    });

    this.createTime = String(this.jobPost.created_at.getUTCFullYear());
    console.log(this.jobPost.created_at.getUTCFullYear());

  }

  delete() {
    const jobId = String(this.route.snapshot.paramMap.get('jobPostId'));
    this.jobService.deleteJobPost(jobId).subscribe(() => {
      console.log('Deleted');
    });

    const navigationExtras = {
      queryParams: { id: this.getIdFromParam(), userType: this.getUserTypeFromParam() }
    };

    this.router.navigate(['/job-posts'], navigationExtras);
  }

  getIdFromParam(): Number {
    return Number(this.route.snapshot.queryParamMap.get('id'));
  }

  getUserTypeFromParam(): string | null {
    return this.route.snapshot.queryParamMap.get('userType')
  }

}
