import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SignuppageComponent } from './auth-module/components/signuppage/signuppage.component';
import { LoginpageComponent } from './auth-module/components/loginpage/loginpage.component';
import { CountriesPageComponent } from './countries-module/components/countries-page/countries-page.component';
import { DescriptionPageComponent } from './countries-module/components/description-page/description-page.component';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from  '@angular/common/http';


import { AuthModuleModule } from './auth-module/auth-module.module';

import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './auth-module/services/interceptor.service';

import { ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment.development';



export function tokenGetter() {
  return localStorage.getItem('access_token'); // Adjust this to your token storage method
}
 
@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    SignuppageComponent,
    CountriesPageComponent,
    DescriptionPageComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule, MatIconModule,
    HttpClientModule,
    AuthModuleModule, // Import your AuthModule
    FormsModule,
    ReactiveFormsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: [environment.authUrl], // Whitelist your API domain
        disallowedRoutes: [], // Routes to exclude from token sending
      }
    })
    
  
 
    
  ],
   providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }