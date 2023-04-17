import {Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit{
  isAuthenticated!: boolean;

  constructor(private location: Location, private router: Router) {
  }

  ngOnInit(): void {
      this.isAuthenticated = localStorage.getItem('access_token') != null;
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
