import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front-project';
  showTopBar!: boolean;
  constructor(private router: Router) {
  }
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showTopBar = !(event.urlAfterRedirects === '/login' || event.urlAfterRedirects === '/register' || event.urlAfterRedirects === '/verify-registration' || event.urlAfterRedirects === '/register-company');
      }
    });
  }
}
