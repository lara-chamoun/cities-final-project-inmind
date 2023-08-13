import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { SignuppageComponent } from './signuppage/signuppage.component';
import { CountriespageComponent } from './countriespage/countriespage.component';
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
    CountriespageComponent
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
