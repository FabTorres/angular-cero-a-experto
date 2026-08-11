import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { combineLatest, map, Observable, of } from 'rxjs';
import { Country, CountryObject, TopLevel } from '../interfaces/country.interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CountryService {

  private baseUrl = 'https://api.restcountries.com/countries/v5';
  private http = inject(HttpClient);
  private readonly apiKey = environment.apiKey;

  private _regions = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania'
  ];

  get regions(): string[] {
    return [...this._regions];
  }

  /* getCountriesByRegion( region: string ): Observable<Object[]> {
    if(!region)  return of([]);

    const url = `${this.baseUrl}?region=${region}&response_fields=names.common,codes.alpha_3,borders`;
    return this.http.get<Object[]>(url);
  }*/

  getCountriesByRegion(region: string): Observable<Country[]> {

    if (!region) return of([]);

    const url = `${this.baseUrl}?region=${region}&response_fields=names.common,codes.alpha_3,borders`;

    return this.http.get<TopLevel>(url, this.httpOptions).pipe(
      map(response =>
        response.data.objects.map(country => ({
          name: country.names.common,
          cca3: country.codes.alpha_3,
          borders: country.borders,
        }))
      )
    );
  }

  getCountryByAlphaCode(alphaCode: string): Observable<Country> {
    const url = `${this.baseUrl}?codes.alpha_3=${alphaCode}&response_fields=names.common,codes.alpha_3,borders`;

    return this.http.get<TopLevel>(url, this.httpOptions).pipe(
      map(response => this.mapCountry(response.data.objects[0]))
    );
  }

  getCountryNamesByCodeArray( countryCodes: string[]): Observable<Country[]> {
    if (!countryCodes || countryCodes.length == 0) return of([]);

    const countriesRequests: Observable<Country>[] = countryCodes.map(code =>
      this.getCountryByAlphaCode(code)
    );

    // Con Foreach
    /* const countriesRequests: Observable<Country>[] = [];
    countryCodes.forEach(code => {
      const request = this.getCountryByAlphaCode(code);
      countriesRequests.push(request);
    }); */

    return combineLatest( countriesRequests );
  }


  private mapCountry(country: CountryObject): Country {
    return {
      name: country.names.common,
      cca3: country.codes.alpha_3,
      borders: country.borders,
    };
  }

  private get httpOptions() {
    return {
      headers: new HttpHeaders({
        Authorization: this.apiKey
      })
    };
  }

}
