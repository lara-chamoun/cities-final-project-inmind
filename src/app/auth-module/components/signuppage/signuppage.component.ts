import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { SignupForm } from '../../models/signup-form.model';
import { AuthenticationService } from '../../services/authentication.service';
import { Validators,ValidatorFn,AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-signuppage',
  templateUrl: './signuppage.component.html',
  styleUrls: ['./signuppage.component.scss']
})
export class SignuppageComponent implements OnInit {
  isSubmitted = false;

  signUpForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    admin: new FormControl(false),
    termsAndConditions: new FormControl(false, [this.termsAndConditionsValidator()])
  });

  constructor(private authservice:AuthenticationService) {}

ngOnInit(): void {}

termsAndConditionsValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value === true) {
      return null; // Checkbox is checked
    }
    return { 'termsAndConditionsRequired': true }; // Checkbox is not checked
  };
}

onSignUpSubmit() {
  this.isSubmitted = true;
  if (this.signUpForm.valid) {
    const formData = this.signUpForm.value;
    const form: SignupForm={

      Firstname:formData.firstName!!,
      Lastname:formData.lastName!!,
      Email:formData.email!!,
      Password:formData.password!!,
      RoleName:formData.admin ? 'admin' : 'user'

    }
    
    if (formData.admin) {
      // Call signupUser specifically for administrators
      this.authservice.signupAdmin(form).subscribe(
        response => {
          console.log("Admin successfully registered.", response);
        
        },
        error => {
          console.error('Admin signup error:', error);
        
        }
      );
    } else {
      // Call signupUser for regular users
      this.authservice.signupUser(form).subscribe(
        response => {
          console.log("User successfully registered.", response);
       
        },
        error => {
          console.error('User signup error:', error);
        }
      );
    }


}
}

}