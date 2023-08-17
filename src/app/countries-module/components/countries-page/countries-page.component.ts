import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MyDataService } from '../../services/my-data.service';



@Component({
  selector: 'app-countries-page',
  templateUrl: './countries-page.component.html',
  styleUrls: ['./countries-page.component.scss']
})
export class CountriesPageComponent {
  countriesData: any = [];

  searchcountriesData: any= [];
  searchText: string = ''; // Add this line to define searchText

  regions: string[] = ['Asia', 'Europe', 'Africa', 'Americas', 'Oceania'];
  selectedRegions: { [key: string]: boolean } = {};
  
  showFilterForm = false;

  constructor(private router: Router, private myDataService: MyDataService) {}



  ngOnInit(): void {
    this.myDataService.getAllData().subscribe((data) => {
      this.countriesData = data;
      console.log(data);
    });
  }



  searchCountries(inputText: string): void {
    if (inputText.length >= 1) {
      this.myDataService.getSearchData(inputText).subscribe((data: any) => {
        this.countriesData = data.filter((country: any) => country.name.common.toLowerCase().startsWith(inputText.toLowerCase()));
      });
    } else {
      // If inputText is empty, get all countries
      this.myDataService.getAllData().subscribe((data: any) => {
        this.countriesData = data;
      });
    }
  }



  applyFilter() {

    this.showFilterForm = !this.showFilterForm;
    // Filter countries based on selectedRegions
    const selectedRegionKeys = Object.keys(this.selectedRegions).filter(key => this.selectedRegions[key]);
  
    console.log('Selected region keys:', selectedRegionKeys); // Log the selected region keys
  
    if (selectedRegionKeys.length > 0) {
      const apiUrl = `https://restcountries.com/v3.1/region/${selectedRegionKeys.join(',')}?fields=name,region,flags`;
      console.log('API URL:', apiUrl); // Log the API URL
  
      this.myDataService.getFilterData(selectedRegionKeys).subscribe((data) => {
        // Process filteredData here
        console.log(data);
        this.countriesData = data;
      });
    } else {
      // No regions selected, show all countries or handle accordingly
      this.myDataService.getAllData().subscribe((data: any) => {
        this.countriesData = data;
      });
    }
  }
  
  
  encodeCountryName(countryName: string): string {
    return encodeURIComponent(countryName);
  }
  
  handleIconClick() {
    console.log("Icon clicked!");
    this.searchCountries(this.searchText);
    // You can perform other actions here if needed
}

  navigateToNewPage() {
    this.router.navigate(['/description']); // Adjust the route path as needed
  }

}
