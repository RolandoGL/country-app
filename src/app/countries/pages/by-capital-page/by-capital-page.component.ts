import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit {
  public countries: Country[] = []
  public initialValue: string = ''
  public isLoading: Boolean = false
  constructor( private _countryService: CountriesService ){}

  ngOnInit(): void {
    this.countries = this._countryService.cacheStore.byCapital.countries
    this.initialValue = this._countryService.cacheStore.byCapital.term
  }

  searchByCapital( term: string):void{
    this.isLoading = true
    this._countryService.searchCapital( term )
    .subscribe( (res: Country[]) => {
      this.countries = res
      this.isLoading = false
    })
  }
}
