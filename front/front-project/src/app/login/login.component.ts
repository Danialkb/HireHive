import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../user.service";
import {AuthInterceptor} from "../interceptor/auth.interceptor";
import {catchError, EMPTY} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form!: FormGroup;
  notValid: boolean = false;
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
      if(response.detail === 'Invalid username or password') {
        this.notValid = true;
      } else {
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
        this.router.navigate(['/home']);
      }
      }
    );
  }

}
