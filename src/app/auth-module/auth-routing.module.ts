import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import { SignuppageComponent } from './components/signuppage/signuppage.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';


const routes: Routes = [{
  path: '', 
  component: AuthPageComponent, 
  children: [ 
      { 
          path: '', 
          component: LoginpageComponent, 
      },
      { 
        path: 'signup', 
        component: SignuppageComponent, 
    }

  ]
}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],

  exports: [RouterModule]
})
export class AuthRoutingModule { }
