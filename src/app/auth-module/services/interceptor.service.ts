import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {  // Unauthorized
          
          const refreshToken = this.authService.getRefreshToken();

          if (!refreshToken) {
            return throwError(error);
          }

          return this.authService.refreshAccessToken().pipe(
            switchMap(() => {
              const newAccessToken = this.authService.getAccessToken();
          
              if (!newAccessToken) {
                return throwError('Failed to refresh token');
              }
              console.log("Token is refreshed.")
              const newRequest = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${newAccessToken}`
                }
              });
          
              return next.handle(newRequest);
            }),
            catchError(error => {
              return throwError(error);
            })
          );
          
        }
        return throwError(error);
      })
    );
  }
}

