import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';




const routes: Routes = [
  
    {
      path: '',
      loadChildren: () => import('./auth-module/auth-module.module').then(m => m.AuthModuleModule)
    },
    {
      path: 'home',
      loadChildren: () => import('./countries-module/countries-module.module').then(m => m.CountriesModuleModule)
    },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
