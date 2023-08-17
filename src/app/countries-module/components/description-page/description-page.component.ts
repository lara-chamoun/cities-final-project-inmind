import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyDataService } from '../../services/my-data.service';

@Component({
  selector: 'app-description-page',
  templateUrl: './description-page.component.html',
  styleUrls: ['./description-page.component.scss']
})
export class DescriptionPageComponent implements OnInit {
  countryName: string = '';
  countryData: any = [];

  constructor(private route: ActivatedRoute,private myDataService: MyDataService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.countryName = params.get('countryName') || ''; // Use the nullish coalescing operator to handle null
      // Now you can use this.countryName to fetch data for the specific country
      console.log(this.countryName);
      if (this.countryName) {
        this.myDataService.getCountryData(this.countryName).subscribe(data => {
          this.countryData = data[0]; // Assuming the API returns an array with a single country object
          console.log(this.countryData);
        });
      }
    });
      
  }
  }

