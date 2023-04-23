import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JobPost} from "./models";
import { Observable } from "rxjs";
import {FormBuilder} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class JobBoardService {
  URL = 'http://localhost:8000/api/v1';
  constructor(private http: HttpClient, private formB: FormBuilder) { }

  getEmployerJobPosts(user_id: Number): Observable<JobPost[]> {
    return this.http.get<JobPost[]>(`${this.URL}/users/${user_id}/job_posts/`);
  }

  getJobPosts(): Observable<JobPost[]> {
    return this.http.get<JobPost[]>(`${this.URL}/job-posts/`)
  }

  getJobPost(id: string): Observable<JobPost> {
    return this.http.get<JobPost>(`${this.URL}/job-posts/${id}/`)
  }

  createJobPost(post: JobPost): Observable<JobPost> {
    let form = this.formB.group({
      title: post.title,
      description: post.description,
      location: post.location,
      salary: post.salary
    })
    return this.http.post<JobPost>(`${this.URL}/job-posts/`, form.getRawValue());
  }

  deleteJobPost(id: string) {
    return this.http.delete(`${this.URL}/job-posts/${id}/`);
  }

  sendRespond(form: FormData) {
    return this.http.post(`${this.URL}/applicants/`, form);
  }

  getApplicants(postId: string) {
    return this.http.get(`${this.URL}/job-posts/${postId}/applicants/`)
  }

}
