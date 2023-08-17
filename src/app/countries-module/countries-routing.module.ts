import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MaincountriesPageComponent } from './pages/maincountries-page/maincountries-page.component';
import { CountriesPageComponent } from './components/countries-page/countries-page.component';
import { DescriptionPageComponent } from './components/description-page/description-page.component';



const routes: Routes = [{
  path: '', 
  component: MaincountriesPageComponent, 
  children: [ 
      { 
          path: '', 
          component: CountriesPageComponent, 
      },
      { 
        path: 'description/:countryName', 
        component: DescriptionPageComponent, 
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
export class CountriesRoutingModule { }
