import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesPageComponent } from './countries-page/countries-page.component';
import { DescriptionPageComponent } from './description-page/description-page.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
 
    CountriesPageComponent,
    DescriptionPageComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class CountriesModuleModule { }
