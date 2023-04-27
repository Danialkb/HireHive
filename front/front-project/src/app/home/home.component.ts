import {Component, OnInit} from '@angular/core';
import {User} from "../models";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchTitle: string = '';
  constructor(private router: Router) {

  }

  ngOnInit(): void {
  }

  searchJob() {
    this.router.navigate(['/job-posts'], {queryParams: {title: this.searchTitle}});
  }



}
