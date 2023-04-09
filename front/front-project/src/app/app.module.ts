import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import { JobPostListComponent } from './job-post-list/job-post-list.component';
import { CompaniesComponent } from './companies/companies.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    JobPostListComponent,
    CompaniesComponent,
    UserdetailsComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'home', component: CompaniesComponent },
      { path: 'register', component: RegistrationComponent },
      { path: '', redirectTo: 'home', pathMatch: "full" },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
