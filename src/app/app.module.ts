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
import { DescriptionPageAdminComponent } from './countries-module/components/description-page-admin/description-page-admin.component';


 
@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    SignuppageComponent,
    CountriesPageComponent,
    DescriptionPageComponent,
    DescriptionPageAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule, MatIconModule,
    HttpClientModule,
    AuthModuleModule, // Import your AuthModule
  
 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }