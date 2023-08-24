import { Router } from '@angular/router';
import { MyDataService } from '../../services/my-data.service';
import { Observable, forkJoin } from 'rxjs';
import { AuthenticationService } from 'src/app/auth-module/services/authentication.service';

import { Component, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';





@Component({
  selector: 'app-countries-page',
  templateUrl: './countries-page.component.html',
  styleUrls: ['./countries-page.component.scss']
})
export class CountriesPageComponent {

  userName: string='';
  @ViewChild('userNameElement', { static: false }) userNameElement!: ElementRef;

  countriesData: any = [];

  originalCountriesData: any=[];

  searchcountriesData: any= [];
  searchText: string = ''; // Add this line to define searchText

  regions: string[] = ['Asia', 'Europe', 'Africa', 'Americas', 'Oceania'];
  selectedRegions: { [key: string]: boolean } = {};
  
  showFilterForm = false;

  constructor(private router: Router, private myDataService: MyDataService,private authService: AuthenticationService,private changeDetector: ChangeDetectorRef) {}



  ngOnInit(): void {
    this.myDataService.getAllData().subscribe((data) => {
      this.countriesData = data;
      this.originalCountriesData=data;

      console.log(data);
      const givenName = this.authService.getGivenNameFromAccessToken();
    if (givenName) {
      this.userName = givenName;
    }

    });
    if(this.authService.hasAdminRole()){
      console.log("Admin is logged in.");
    }
    else{
      console.log("User is logged in.");
    }

  }



  searchCountries(inputText: string): void {
    if (inputText.length >= 1) {
      this.countriesData = this.originalCountriesData.filter((country: any) => country.name.common.toLowerCase().startsWith(inputText.toLowerCase()));
    } else {
      // If inputText is empty, reset to the original data
      this.countriesData = [...this.originalCountriesData]; // Create a copy to prevent modifying original
    }
  }


  applyFilter() {
    this.showFilterForm = !this.showFilterForm;
    const selectedRegionKeys = Object.keys(this.selectedRegions).filter(key => this.selectedRegions[key]);
  
    if (selectedRegionKeys.length > 0) {
      const observables: Observable<any>[] = [];
  
      selectedRegionKeys.forEach(region => {
        observables.push(this.myDataService.getCountriesByRegion(region));
      });
  
      // Combine the observables and process the combined data
      forkJoin(observables).subscribe(dataArray => {
        const combinedData = [].concat(...dataArray);
        this.countriesData = combinedData;
        this.originalCountriesData=combinedData;
      });
    } else {
      // No regions selected, show all countries or handle accordingly
      this.myDataService.getAllData().subscribe((data: any) => {
        this.countriesData = data;
        this.originalCountriesData=data;
      });
    }
  }
  
  
  
  encodeCountryName(countryId: string): string {
    const encodedName = encodeURIComponent(countryId);
    return encodedName;
  }
  
  
  handleIconClick() {
    console.log("Icon clicked!");
    this.searchCountries(this.searchText);
    // You can perform other actions here if needed
}

  navigateToNewPage() {
    this.router.navigate(['/description']); // Adjust the route path as needed
  }

  UserLogout(){
    this.authService.logout();
  }

}
