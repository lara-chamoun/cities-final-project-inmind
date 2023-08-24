import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {
  email: string = '';
  password: string = '';
  loginError: string = '';

  constructor(private authService: AuthenticationService, private router: Router) {}



  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      () => {
        // Redirect to the home page on successful login
        this.router.navigate(['/home']);
      },
      error => {
        // Handle login error
        console.error('Login error:', error);
        this.loginError = 'Email or password is incorrect'; 
      }
    );
  }
}



