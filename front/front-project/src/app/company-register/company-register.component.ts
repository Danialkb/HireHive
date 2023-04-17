import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../user.service";
import {CompanyService} from "../company.service";

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.css']
})
export class CompanyRegisterComponent {
  form!:  FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private companyServices: CompanyService,
    ) {
  }



}
