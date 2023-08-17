import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  httpPostExample(email:string, password:string) {

    this.http.post("http://173.249.40.235:5005/api/User/Login()",
        {
          "Username": email,
          "Password": password
        
        })
       
    }
}
