import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MaincountriesPageComponent } from './pages/maincountries-page/maincountries-page.component';
import { CountriesRoutingModule } from './countries-routing.module';


@NgModule({
  declarations: [
 MaincountriesPageComponent
    
  ],
  imports: [
    CommonModule,
    MatIconModule,
    CountriesRoutingModule
  ]
})
export class CountriesModuleModule { }
