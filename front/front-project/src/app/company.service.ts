import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Company} from './models'

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  URL: string = 'http://127.0.0.1:8000/api/v1';
  constructor(private client: HttpClient) { }

  getCompanies() {
    return this.client.get(`${this.URL}/companies/`);
  }

}
