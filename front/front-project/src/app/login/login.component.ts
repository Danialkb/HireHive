import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../models";
import {UserService} from "../user.service";
import {AuthInterceptor} from "../interceptor/auth.interceptor";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form!: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userServices: UserService,
  ) {
    this.form = this.formBuilder.group({
      'email': '',
      'password': '',
    });
  }

  submit() {
    this.userServices.createToken(this.form).subscribe((response: any) => {
        AuthInterceptor.accessToken = response.access;
        console.log(response);
        this.router.navigate(['/home']);
      });
  }

}
