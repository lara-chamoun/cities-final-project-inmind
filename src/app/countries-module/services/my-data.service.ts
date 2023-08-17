import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MyDataService {

  constructor(private http: HttpClient) { }


  getAllData(){
    return this.http.get(
      'https://restcountries.com/v3.1/all?fields=name,region,flags'
    );
  }

  getSearchData(inputtext: string): Observable<any> {
    return this.http.get(
      `https://restcountries.com/v3.1/name/${inputtext}?fields=name,region,flags`
    );
  }
  
  getFilterData(selectedRegionKeys: string[]): Observable<any> {
    const queryString = selectedRegionKeys.join(',');
  
    return this.http.get(
      `https://restcountries.com/v3.1/region/${queryString}?fields=name,region,flags`
    );
  }

  getCountryData(passedname: string): Observable<any> {
    return this.http.get(
      `https://restcountries.com/v3.1/name/${passedname}?fields=name,capital,region,flags,code,capital,lang`
    );
  }
  
}
