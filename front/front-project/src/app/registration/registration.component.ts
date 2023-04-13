import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userServices: UserService,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      password: '',
    });
  }

  submit() {
    this.userServices.createUser(this.form).subscribe(response => {
      // @ts-ignore
      this.userServices.setSessionId(response.session_id)
      this.router.navigate(['/verify-registration'])
    });
  }

}
