import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = 'http://173.249.40.235:5005/api/User';

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    console.log("access set1");
    const credentials = {
      "Username": email,
      "Password": password
    };
    console.log("access set2");
    return this.http.post<any>(`${this.apiUrl}/Login()`, credentials)
      .pipe(
        tap(response => {
            console.log(response.Login.AccessToken);
            if (response && response.Login && response.Login.AccessToken) {
                localStorage.setItem('access_token', response.Login.AccessToken);
            
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
