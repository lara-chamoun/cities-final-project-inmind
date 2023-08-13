import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
<<<<<<< HEAD
import { SignuppageComponent } from './auth-module/signuppage/signuppage.component';
import { LoginpageComponent } from './auth-module/loginpage/loginpage.component';
import { CountriesPageComponent } from './countries-module/countries-page/countries-page.component';
=======
import { LoginpageComponent } from './loginpage/loginpage.component';
import { SignuppageComponent } from './signuppage/signuppage.component';
import { CountriespageComponent } from './countriespage/countriespage.component';
>>>>>>> 96071f7f61093b9473df1f8f4ffd00375f294270
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from  '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    SignuppageComponent,
<<<<<<< HEAD
    CountriesPageComponent
=======
    CountriespageComponent
>>>>>>> 96071f7f61093b9473df1f8f4ffd00375f294270
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatIconModule,
    MatFormFieldModule, MatInputModule, FormsModule, NgIf, MatButtonModule, MatIconModule,
    HttpClientModule
 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }