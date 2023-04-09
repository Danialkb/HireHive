import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) {
    this.form = this.formBuilder.group({
      name: '',
      surname: '',
      email: '',
      code: '',
      password: '',
    });
  }

  submit() {

  }

}
