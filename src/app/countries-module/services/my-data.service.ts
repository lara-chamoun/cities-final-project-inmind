import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class MyDataService {

  
  private apiUrl=environment.baseUrl;

  constructor(private http: HttpClient) { }


  getAllData(){
    return this.http.get(
      `${this.apiUrl}/all?fields=name,region,flags,cca3`
    );
  }

  getSearchData(inputtext: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/name/${inputtext}?fields=name,region,flags`
    );
  }
  

  getCountriesByRegion(region: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/region/${region}?fields=name,region,flags`;
    return this.http.get(apiUrl);
  }
  

  getCountryData(passedid: string): Observable<any> {
    console.log('passedid'+passedid);
    console.log("API URL:", `${this.apiUrl}/alpha/${passedid}?fields=name,capital,region,flags,code,languages,currencies`);
    return this.http.get(
    
      `${this.apiUrl}/alpha/${passedid}?fields=name,capital,region,flags,code,languages,currencies`
    );
  }
  getCountryBorders(passedid: string): Observable<any> {
    console.log('passedid'+passedid);
    console.log("API URL:", `${this.apiUrl}/alpha/${passedid}?fields=name,capital,region,flags,code,languages,currencies`);
    return this.http.get(
    
      `${this.apiUrl}/alpha/${passedid}?fields=borders`
    );
  }
  
}
