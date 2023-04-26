import {Component, OnInit} from '@angular/core';
import {JobPost} from "../models";
import {JobBoardService} from "../job-board.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
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
  searchTitle: string = '';
  constructor(
    private jobBoard: JobBoardService,
    private route: ActivatedRoute,
    private router: Router,
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
    this.isEmployer = this.getUserTypeFromParam() === 'Employer';


    if(this.isEmployer) {
      this.jobBoard.getEmployerJobPosts().subscribe((jobs: JobPost[]) => {
        this.jobPosts = jobs;
      });
    }
    else {
      this.jobBoard.getJobPosts().subscribe((jobs: JobPost[]) => {
        this.jobPosts = jobs;
      });
    }

  }

  search() {
    this.jobService.searchPostsByTitle(this.searchTitle).subscribe((jobs) => {
      this.jobPosts = jobs;
    });
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

  getTitleFromParam(): string {
    return String(this.route.snapshot.queryParamMap.get('title'));
  }

  refreshPage() {
    this.location.go(this.location.path());
    window.location.reload();
  }

}
