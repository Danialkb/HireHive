import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {User} from "./models";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  URL: string = 'http://127.0.0.1:8000/api/v1';
  session_id: string = "";
  constructor(private http: HttpClient) { }

  createUser(form: FormGroup) {
    return this.http.post(`${this.URL}/users/`, form.getRawValue());
  }

  verifyCreation(form: FormGroup) {
    return this.http.post(`${this.URL}/users/verify/`, form.getRawValue());
  }

  setSessionId(s_id: string) {
    this.session_id = s_id;
  }

  createToken(form: FormGroup) {
    return this.http.post(`${this.URL}/users/token/`, form.getRawValue(), {withCredentials: true});
  }

  refreshToken(refresh: string) {
    return this.http.post(`${this.URL}/users/token/refresh/`, {'refresh': refresh}, {withCredentials: true})
  }

  getUser(): Observable<User> {
    return this.http.post<User>(`${this.URL}/users/user/`, {'access_token': localStorage.getItem('access_token')});
  }

}
