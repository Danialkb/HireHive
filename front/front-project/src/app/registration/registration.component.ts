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
  notValid: boolean = false;
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
      user_type: '',
    });
  }

  submit() {
    // @ts-ignore
    const new_user_type: string = this.form.get('user_type').value.charAt(0).toUpperCase() + this.form.get('user_type').value.slice(1);
    this.form.patchValue({
      user_type: new_user_type// or 'employee', depending on the desired value
    });

    this.userServices.createUser(this.form).subscribe(response => {
      // @ts-ignore
      this.userServices.setSessionId(response.session_id)
      this.router.navigate(['/verify-registration'])
    },
      (error: any) => {
        if(error.status === 400) {
          this.notValid = true;
        }
      });
  }

  togglePasswordVisibility(): void {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const eyeIcons = document.querySelectorAll('.input-eye i');

    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      (eyeIcons[0] as HTMLInputElement).style.display = 'none';
      (eyeIcons[1] as HTMLInputElement).style.display = 'block';
    } else {
      passwordInput.type = 'password';
      (eyeIcons[0] as HTMLInputElement).style.display = 'block';
      (eyeIcons[1] as HTMLInputElement).style.display = 'none';
    }
  }

}
