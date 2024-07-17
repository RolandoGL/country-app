import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {
  public isLoading: Boolean = false
  public countries: Country[] = []
  public initialValue: string = ''

  constructor( private _countryService: CountriesService){}

  ngOnInit(): void {
    this.initialValue = this._countryService.cacheStore.byCountries.term
    this.countries = this._countryService.cacheStore.byCountries.countries
  }

  public searchCountry( country: string ):void{
    this.isLoading = true
    this._countryService.searchCountry( country )
    .subscribe( res => {
      this.countries = res
      this.isLoading = false
    })
  }
}
