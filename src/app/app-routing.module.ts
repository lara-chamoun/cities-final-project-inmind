import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignuppageComponent } from './signuppage/signuppage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';

const routes: Routes = [
  { path: '', component: LoginpageComponent }, //default route
  { path: 'signup', component: SignuppageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
