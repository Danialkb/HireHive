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
  user!: User
  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit(): void {
    this.userService.getUser().subscribe((user: any) => {
      this.user = user;
    });
  }

  submit() {
    const navigationExtras = {
      queryParams: { id: this.user.id, userType: this.user.user_type }
    };
    this.router.navigate(['/job-posts'], navigationExtras);
  }



}
