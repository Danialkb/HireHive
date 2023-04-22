import {Component, OnInit} from '@angular/core';
import {JobPost} from "../models";
import {JobBoardService} from "../job-board.service";
import {ActivatedRoute, Route} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-job-post-list',
  templateUrl: './job-post-list.component.html',
  styleUrls: ['./job-post-list.component.css']
})
export class JobPostListComponent implements OnInit {
  jobPosts!: JobPost[];
  isClicked = false;
  newJobPost!: JobPost;
  isEmployer: boolean = false;
  constructor(
    private jobBoard: JobBoardService,
    private route: ActivatedRoute,
    private jobService: JobBoardService,
    private location: Location
  ) {
    this.newJobPost = {
      id: '',
      company_name: '',
      title: '',
      description: '',
      location: '',
      salary: 0.0,
      created_at: new Date()
    }
  }

  ngOnInit(): void {
    const user_id = this.getIdFromParam();
    this.isEmployer = this.getUserTypeFromParam() === 'Employer';


    if(this.isEmployer) {
      this.jobBoard.getEmployerJobPosts(user_id).subscribe((jobs: JobPost[]) => {
        this.jobPosts = jobs;
      });
    }
    else {
      this.jobBoard.getJobPosts().subscribe((jobs: JobPost[]) => {
        this.jobPosts = jobs;
      });
    }

  }

  showForm() {
    this.isClicked = !this.isClicked;
  }

  createPost() {
    this.isClicked = !this.isClicked;

    this.jobService.createJobPost(this.newJobPost).subscribe((post: JobPost) => {
      this.refreshPage();
    });

  }

  getIdFromParam(): Number {
    return Number(this.route.snapshot.queryParamMap.get('id'));
  }

  getUserTypeFromParam(): string | null {
    return this.route.snapshot.queryParamMap.get('userType')
  }

  refreshPage() {
    this.location.go(this.location.path());
    window.location.reload();
  }

}
