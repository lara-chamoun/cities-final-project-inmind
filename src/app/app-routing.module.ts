import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignuppageComponent } from './auth-module/signuppage/signuppage.component';
import { LoginpageComponent } from './auth-module/loginpage/loginpage.component';
import { CountriesPageComponent } from './countries-module/countries-page/countries-page.component';

const routes: Routes = [
  { path: '', component: LoginpageComponent }, //default route
  { path: 'signup', component: SignuppageComponent },
  { path: 'countries', component: CountriesPageComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
