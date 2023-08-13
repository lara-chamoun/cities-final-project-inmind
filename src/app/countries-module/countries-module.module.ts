import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesListComponent } from './countries-list/countries-list.component';
import { CountriesPageComponent } from './countries-page/countries-page.component';
import { DescriptionPageComponent } from './description-page/description-page.component';



@NgModule({
  declarations: [
    CountriesListComponent,
    CountriesPageComponent,
    DescriptionPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CountriesModuleModule { }
