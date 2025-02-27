import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private apiURL:string = 'https://restcountries.com/v3.1'
  public cacheStore: CacheStore= {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  }
  constructor( private _httpClient: HttpClient ) {
    this.loadFromLocalStorage()
  }

  private saveToLocalStorage(){
    localStorage.setItem('cacheStore', JSON.stringify( this.cacheStore ) )
  }

  private loadFromLocalStorage(){
    if( !localStorage.getItem('cacheStore')) return

    this.cacheStore = JSON.parse( localStorage.getItem('cacheStore')! )
  }

  private getCountriesRequest( url:string ):Observable<Country[]>{
    return this._httpClient.get<Country[]>(url)
    .pipe(
      catchError( () => of([]) ),
      delay( 1000 )
    )
  }

  searchCountryByAlphaCode( code: string ):Observable<Country | null>{
    return this._httpClient.get<Country[]>(`${this.apiURL}/alpha/${code}`)
            .pipe(
              map( countries => countries.length > 0 ? countries[0] : null ),
              catchError( () => of( null ) ),
              delay( 1000 )
            )
  }

  searchCapital( term: string ): Observable<Country[]>{
    const url = `${this.apiURL}/capital/${term}`
    return this.getCountriesRequest( url )
            .pipe(
              tap( countries => this.cacheStore.byCapital = { term, countries }),
              tap( ()=> this.saveToLocalStorage() )
            )
  }

  searchCountry( term: string ):Observable<Country[]>{
    const url = `${this.apiURL}/name/${term}`
    return this.getCountriesRequest( url )
          .pipe(
            tap( countries => this.cacheStore.byCountries = { term, countries }),
            tap( ()=> this.saveToLocalStorage() )
          )
  }

  searchRegion( region: Region ):Observable<Country[]>{
    const url = `${this.apiURL}/region/${region}`
    return this.getCountriesRequest( url )
           .pipe(
            tap( countries => this.cacheStore.byRegion = { region, countries}),
            tap( ()=> this.saveToLocalStorage() )
           )
  }
}
