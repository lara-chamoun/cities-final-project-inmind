import { Component } from '@angular/core';


@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent {


  constructor() {}



}



// import { Component } from '@angular/core';
// import { AuthenticationService } from '../authentication.service';

// @Component({
//   selector: 'app-loginpage',
//   templateUrl: './loginpage.component.html',
//   styleUrls: ['./loginpage.component.scss']
// })
// export class LoginpageComponent {
//   email: string;
//   password: string;

//   constructor(private authService: AuthenticationService) {}

//   onSubmit() {
//     this.authService.httpPostExample(this.email, this.password)
//     .subscribe(
//       response => {
//         // Handle success
//         console.log('Response:', response);
//         // Redirect or perform other actions on success
//       },
//       error => {
//         // Handle error
//         console.error('Error:', error);
//       }
//     );
//   }

// }
