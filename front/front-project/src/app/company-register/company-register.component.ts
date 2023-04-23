import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../user.service";
import {CompanyService} from "../company.service";

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.css']
})
export class CompanyRegisterComponent {
  form!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private companyServices: CompanyService,
    private route: ActivatedRoute,
  ) {
    this.form = this.formBuilder.group({
      user: 0,
      name: '',
      location: '',
      description: '',
      website: '',
      logo: null
    });
  }

  onLogoSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({
        logo: file
      });
    }
  }

  submit() {
    const user_id = Number(this.route.snapshot.queryParamMap.get('id'))

    this.form.patchValue({
      user: user_id
    });

    const formData = new FormData();
    formData.append('user', this.form.value.user);
    formData.append('name', this.form.value.name);
    formData.append('location', this.form.value.location);
    formData.append('description', this.form.value.description);
    formData.append('website', this.form.value.website);
    // @ts-ignore
    formData.append('logo', this.form.get('logo').value);

    this.companyServices.createCompany(formData).subscribe(() => {
      this.router.navigate(['/login'])
    });
  }

}
