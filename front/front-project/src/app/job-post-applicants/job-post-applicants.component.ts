import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {User} from "../models";
import {UserService} from "../user.service";
import {JobBoardService} from "../job-board.service";

@Component({
  selector: 'app-job-post-applicants',
  templateUrl: './job-post-applicants.component.html',
  styleUrls: ['./job-post-applicants.component.css']
})
export class JobPostApplicantsComponent implements OnInit{
  Applicants!: any[];
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private jobService: JobBoardService,
  ) {
  }

  ngOnInit() {
    this.jobService.getApplicants(this.getJobIdFromParam()).subscribe((applicants: any) => {
      this.Applicants = applicants;
    });
  }

  getJobIdFromParam(): string {
    return String(this.route.snapshot.paramMap.get('jobPostId'))
  }
}
