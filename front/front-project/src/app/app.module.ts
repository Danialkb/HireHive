import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import { JobPostListComponent } from './job-post-list/job-post-list.component';
import { CompaniesComponent } from './companies/companies.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { RegistrationComponent } from './registration/registration.component';
import { VerifyRegistrationComponent } from './verify-registration/verify-registration.component';
import { LoginComponent } from './login/login.component';
import {AuthInterceptor} from "./interceptor/auth.interceptor";
import { CompanyRegisterComponent } from './company-register/company-register.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { JobPostDetailsComponent } from './job-post-details/job-post-details.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { EmployeeRespondsComponent } from './employee-responds/employee-responds.component';
import { JobPostApplicantsComponent } from './job-post-applicants/job-post-applicants.component';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    JobPostListComponent,
    CompaniesComponent,
    UserdetailsComponent,
    RegistrationComponent,
    VerifyRegistrationComponent,
    LoginComponent,
    CompanyRegisterComponent,
    CompanyDetailsComponent,
    JobPostDetailsComponent,
    HomeComponent,
    FooterComponent,
    EmployeeRespondsComponent,
    JobPostApplicantsComponent,
  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot([
            {path: 'home', component: HomeComponent},
            {path: 'companies', component: CompaniesComponent},
            {path: 'register', component: RegistrationComponent},
            {path: 'login', component: LoginComponent},
            {path: 'verify-registration', component: VerifyRegistrationComponent},
            {path: 'job-posts', component: JobPostListComponent},
            {path: 'job-posts/:jobPostId', component: JobPostDetailsComponent},
            {path: 'job-posts/:jobPostId/applicants', component: JobPostApplicantsComponent},
            {path: 'register-company', component: CompanyRegisterComponent},
            {path: '', redirectTo: 'home', pathMatch: "full"},
        ]),
        FormsModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
