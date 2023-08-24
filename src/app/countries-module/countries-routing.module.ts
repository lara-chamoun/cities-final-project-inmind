import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MaincountriesPageComponent } from './pages/maincountries-page/maincountries-page.component';
import { CountriesPageComponent } from './components/countries-page/countries-page.component';
import { DescriptionPageComponent } from './components/description-page/description-page.component';

import { AuthGuard } from '../auth-module/services/auth-guard.service';

const routes: Routes = [{
  path: '', 
  component: MaincountriesPageComponent, 
  children: [ 
      { 
          path: '', 
          component: CountriesPageComponent,  canActivate: [AuthGuard] 
      },
      { 
        path: 'description/:countryId', 
        component: DescriptionPageComponent,  canActivate: [AuthGuard] 
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
