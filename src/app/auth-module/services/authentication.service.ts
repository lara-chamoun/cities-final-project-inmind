import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { throwError,catchError } from 'rxjs';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SignupForm } from '../models/signup-form.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = environment.authUrl; // Use the authUrl from the environment
  private refreshTokenUrl = `${this.apiUrl}/RefreshToken`;  


  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }



  login(email: string, password: string) {
       const credentials = {
      "Username": email,
      "Password": password
    };

    return this.http.post<any>(`${this.apiUrl}/Login()`, credentials)
    .pipe(
      tap(response => {
          if (response && response.Login && response.Login.AccessToken) {
              localStorage.setItem('access_token', response.Login.AccessToken);
              localStorage.setItem('refresh_token', response.Login.RefreshToken);
          }
      }),
      catchError(error => {
        console.error('Login error:', error);
        throw error; // Re-throw the error to continue propagating it
      })
    );
  
  }
  signupUser(form: SignupForm) {

    return this.http.post<any>(`${this.apiUrl}/SignUp()`, form)
      .pipe(
        tap(response => {
          console.log("User successfully registered.")
        }),
        catchError(error => {
          console.error('SignUp error:', error);
          throw error; // Re-throw the error to continue propagating it
        })
      );
  }
  signupAdmin(form: SignupForm) {
    return this.http.post<any>(`${this.apiUrl}/CreateAdminUser()`, form)
      .pipe(
        tap(response => {
          console.log("Admin successfully registered.")
        }),
        catchError(error => {
          console.error('SignUp error:', error);
          throw error; // Re-throw the error to continue propagating it
        })
      );
  }

  getGivenNameFromAccessToken(): string | null {
    const accessToken = this.getAccessToken();

    if (accessToken) {
      const decodedToken = this.jwtHelper.decodeToken(accessToken);
      console.log(decodedToken.given_name);
      return decodedToken.given_name || null;
    }

    return null;
  }

  hasAdminRole(): boolean {
    const accessToken = this.getAccessToken();

    if (accessToken) {
      const decodedToken = this.jwtHelper.decodeToken(accessToken);
      const roles = decodedToken.realm_access?.roles || [];
      return roles.includes('Admin');
    }

    return false;
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  refreshAccessToken() {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      // Handle the case where there's no refresh token available
      return throwError('No refresh token available');
    }
  
    const refreshTokenPayload = {
      "RefreshToken": refreshToken
    };
  
    return this.http.post<any>(this.refreshTokenUrl, refreshTokenPayload)
      .pipe(
        tap(response => {
          if (response && response.AccessToken) {
            localStorage.setItem('access_token', response.AccessToken);
          }
        })
      );
  }
  
}

























