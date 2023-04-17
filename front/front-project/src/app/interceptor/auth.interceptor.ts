import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, switchMap} from 'rxjs';
import {UserService} from "../user.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('access_token');
    if (token){
      const newReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      })
      // @ts-ignore
      return next.handle(newReq).pipe(catchError((err: HttpErrorResponse) => {
        if(err.status === 401) {
          // @ts-ignore
          return this.userService.refreshToken(localStorage.getItem('refresh_token')).pipe(
            switchMap((res: any) => {
              localStorage.setItem('access_token', res.access);
              return next.handle(newReq);
            })
          )
        }
      }));
    }

    return next.handle(request);
  }
}
