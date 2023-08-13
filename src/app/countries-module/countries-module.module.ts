import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesListComponent } from './countries-list/countries-list.component';
import { CountriesPageComponent } from './countries-page/countries-page.component';



@NgModule({
  declarations: [
    CountriesListComponent,
    CountriesPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CountriesModuleModule { }
