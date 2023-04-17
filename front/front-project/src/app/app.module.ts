import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import {ReactiveFormsModule} from "@angular/forms";
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
    JobPostDetailsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'home', component: CompaniesComponent },
      { path: 'register', component: RegistrationComponent },
      { path: 'login', component: LoginComponent },
      { path: 'verify-registration', component: VerifyRegistrationComponent },
      { path: 'register-company', component: CompanyRegisterComponent },
      { path: '', redirectTo: 'home', pathMatch: "full" },
    ])
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
