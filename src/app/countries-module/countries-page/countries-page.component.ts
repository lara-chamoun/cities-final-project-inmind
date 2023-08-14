import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-countries-page',
  templateUrl: './countries-page.component.html',
  styleUrls: ['./countries-page.component.scss']
})
export class CountriesPageComponent {
  constructor(private router: Router) {}

  navigateToNewPage() {
    this.router.navigate(['/description']); // Adjust the route path as needed
}
}