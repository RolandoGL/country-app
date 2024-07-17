import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit {
  public countries: Country[] = []
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  public isLoading: Boolean = false
  public selectedRegion?: Region
  constructor( private _countriesService: CountriesService ){}

  ngOnInit(): void {
    this.selectedRegion = this._countriesService.cacheStore.byRegion.region
    this.countries = this._countriesService.cacheStore.byRegion.countries
    console.log(this.selectedRegion)
  }

  public searchRegion( region: Region ){
    this.selectedRegion = region
    this.isLoading = true
    this._countriesService.searchRegion( region )
    .subscribe( res => {
      this.countries = res
      this.isLoading = false
    } )
  }
}
