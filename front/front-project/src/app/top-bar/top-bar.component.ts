import {Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {NavigationEnd, Router} from "@angular/router";
import {User} from "../models";
import {UserService} from "../user.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit{
  isAuthenticated!: boolean;
  user!: User;

  constructor(private location: Location, private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
      this.isAuthenticated = localStorage.getItem('access_token') !== null;
      this.userService.getUser().subscribe((user: any) => {
        this.user = user;
      });
  }

  submit() {
    const navigationExtras = {
      queryParams: { userType: this.user.user_type }
    };
    this.router.navigate(['/job-posts'], navigationExtras);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.location.go(this.location.path());
    window.location.reload();
  }

  login() {
    this.router.navigate(['/login']);
  }

}
