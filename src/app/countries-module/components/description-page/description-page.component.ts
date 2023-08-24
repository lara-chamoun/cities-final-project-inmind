import { ActivatedRoute } from '@angular/router';
import { MyDataService } from '../../services/my-data.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { AuthenticationService } from 'src/app/auth-module/services/authentication.service';
import { IndexedDbService } from '../../services/indexed-db.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';



interface CountryData {
  currencies?: { [code: string]: { name: string, symbol: string, code: string } };
  languages?: { [code: string]: string };
  capital?: string;
  region?: string;
  name?: { common: string, official: string, nativeName: { [code: string]: string } };
  flags?: { png: string, svg: string, alt: string };
}

@Component({
  selector: 'app-description-page',
  templateUrl: './description-page.component.html',
  styleUrls: ['./description-page.component.scss']
})


export class DescriptionPageComponent {
   countriesBorder: any[] = []; 
   

   col11BackgroundImageStyle: SafeStyle | undefined;

   imageId: number=1; // The image ID from your database
   imageSrc: string='';

  userName: string='';
  isAdmin: boolean = false; // Initialize based on the user's role

  @ViewChild('userNameElement', { static: false }) userNameElement!: ElementRef;

  countryId: string = '';
  countryData: CountryData = {}; 

  constructor(private route: ActivatedRoute,private myDataService: MyDataService,private authService: AuthenticationService,private indexedDbService:IndexedDbService,private domSanitizer: DomSanitizer) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.countryId = params.get('countryId') || '';
     
      if (this.countryId) {
        this.myDataService.getCountryData(this.countryId).subscribe(
          data => {
            console.log("API response:", data);
            this.countryData = data;
            console.log("Country data inside subscribe:", this.countryData);
          },
          error => {
            console.error("API error:", error);
          }
        );
      }
    });
     
      this.isAdmin=this.authService.hasAdminRole();

      this.indexedDbService.getImage(this.imageId).then(
        (imageUrl) => {
          console.log('imageurl '+imageUrl);
          this.imageSrc = imageUrl;
          this.col11BackgroundImageStyle=imageUrl;
        },
        (error) => {
          console.error('Error getting image:', error);
          // Handle error as needed
        }
      );

   


    const givenName = this.authService.getGivenNameFromAccessToken();
    if (givenName) {
      this.userName = givenName;
    }


    this.route.paramMap.subscribe(params => {
      this.countryId = params.get('countryId') || '';
     
      if (this.countryId) {
        this.myDataService.getCountryBorders(this.countryId).subscribe(
          data => {
            const borderingCountryCodes: string[] = data.borders;
            this.fetchBorderingCountriesData(borderingCountryCodes);
          },
          error => {
            console.error("API error:", error);
          }
        );
      }
    });
    
      
  }
  fetchBorderingCountriesData(borderingCountryCodes: string[]): void {
    for (const countryCode of borderingCountryCodes) {
      this.myDataService.getCountryData(countryCode).subscribe(
        data => {
          this.countriesBorder.push(data);
        },
        error => {
          console.error(`Error fetching details for country ${countryCode}:`, error);
        }
      );
    }
  }

  encodeCountryName(countryId: string): string {
    const encodedName = encodeURIComponent(countryId);
    return encodedName;
  }
  getCurrenciesString(): string {
    let currenciesString = '';
    for (const currency of Object.values(this.countryData?.currencies || {})) {
      currenciesString += `${currency.name} (${currency.symbol})\n`;
    }
    return currenciesString;
  }
  getLanguagesString(): string {
    let languagesString = '';
    for (const language of Object.values(this.countryData?.languages || {})) {
      languagesString += `${language}\n`;
    }
    return languagesString;
  
  }
  

  saveChanges() {
    const currencyInput = document.querySelector('.transparent-input[data-bold-text="Currency"]') as HTMLInputElement;
    const languageInput = document.querySelector('.transparent-input[data-bold-text="Language"]') as HTMLInputElement;
    const capitalInput = document.querySelector('.transparent-input[data-bold-text="Capital City"]') as HTMLInputElement;
    const regionInput = document.querySelector('.transparent-input[data-bold-text="Region"]') as HTMLInputElement;

    const data = {
      currency: currencyInput.value,
      language: languageInput.value,
      capital: capitalInput.value,
      region: regionInput.value
    };

    this.indexedDbService.saveFormData(data)
      .then(() => {
        console.log('Form data saved to IndexedDB');
        // Optionally, you can display a success message to the user
      })
      .catch((error) => {
        console.error('Error saving form data to IndexedDB', error);
        // Handle the error and provide feedback to the user
      });
  }


  handleFileInput(event: any): void {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      this.indexedDbService.saveImage(selectedImage)
        .then(() => {
          console.log('Image saved to IndexedDB');
        })
        .catch(error => {
          console.error('Error saving image:', error);
        });
    }
  }




}
