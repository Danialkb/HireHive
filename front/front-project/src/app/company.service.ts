import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Company} from './models'
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  URL: string = 'http://127.0.0.1:8000/api/v1';
  constructor(private http: HttpClient) { }

  getCompanies() {
    return this.http.get(`${this.URL}/companies/`);
  }

  createCompany(form: FormData) {
    return this.http.post(`${this.URL}/companies/`, form);
  }

}
