import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-verify-registration',
  templateUrl: './verify-registration.component.html',
  styleUrls: ['./verify-registration.component.css']
})
export class VerifyRegistrationComponent implements OnInit{
  form!: FormGroup;
  constructor(
      private formBuilder: FormBuilder,
      private userServices: UserService,
      private router: Router,
    ) {
    this.form = this.formBuilder.group({session_id: '', code: ''} );
  }

  ngOnInit(): void {
      this.form.patchValue({
        session_id: this.userServices.session_id
      });
  }

  submit() {
    this.userServices.verifyCreation(this.form).subscribe((user: any) => {
      if (user.user_type === 'Employee') {
        this.router.navigate(['/login'])
      }
      else {
        const navigationExtras = {
          queryParams: { id: user.id }
        };
        this.router.navigate(['/register-company'], navigationExtras);
      }
    });
  }

}
