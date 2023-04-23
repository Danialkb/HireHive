import {Component, OnInit} from '@angular/core';
import {JobBoardService} from "../job-board.service";
import {ActivatedRoute, Router} from "@angular/router";
import {JobPost} from "../models";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-job-post-details',
  templateUrl: './job-post-details.component.html',
  styleUrls: ['./job-post-details.component.css']
})
export class JobPostDetailsComponent implements OnInit{
  jobPost!: JobPost;
  showDeleteButton: boolean = false;
  showRespondButton: boolean = false;
  showRespondForm: boolean = false;
  createTime: string = '';
  form!: FormGroup;
  constructor(
    private jobService: JobBoardService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      covering_letter: '',
      resume: null
    });
  }

  ngOnInit() {
    const jobId = this.getJobIdFromParam();

    this.showDeleteButton = this.getUserTypeFromParam() === 'Employer';
    this.showRespondButton = this.getUserTypeFromParam() === 'Employee';

    this.jobService.getJobPost(jobId).subscribe((post: JobPost) => {
      this.jobPost = post;
    });

    // this.createTime = String(this.jobPost.created_at.getUTCFullYear());

  }

  respond() {
    this.showRespondForm = !this.showRespondForm;
    this.jobService.sendRespond(this.getFormData()).subscribe(() => {
      console.log(this.getFormData());
    });

  }

  delete() {
    const jobId = this.getJobIdFromParam();
    this.jobService.deleteJobPost(jobId).subscribe(() => {
      console.log('Deleted');
    });

    const navigationExtras = {
      queryParams: { id: this.getIdFromParam(), userType: this.getUserTypeFromParam() }
    };

    this.router.navigate(['/job-posts'], navigationExtras);
  }

  onResumeSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({
        resume: file
      });
    }
  }

  showForm() {
    this.showRespondForm = !this.showRespondForm;
  }

  getFormData(): FormData {
    const formdata = new FormData();
    formdata.append('user', String(this.getIdFromParam()));
    formdata.append('job_post', String(this.getJobIdFromParam()));
    formdata.append('covering_letter', this.form.value.covering_letter);
    formdata.append('resume', this.form.value.resume);


    return formdata;
  }

  getIdFromParam(): Number {
    return Number(this.route.snapshot.queryParamMap.get('id'));
  }

  getUserTypeFromParam(): string | null {
    return this.route.snapshot.queryParamMap.get('userType')
  }

  getJobIdFromParam(): string {
    return String(this.route.snapshot.paramMap.get('jobPostId'))
  }

}
