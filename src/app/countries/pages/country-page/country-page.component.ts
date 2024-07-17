import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private CountriesService: CountriesService,  private router: Router) { }
  public country?: Country

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.CountriesService.searchCountryByAlphaCode( id ))
    )
    .subscribe( country =>{
      if(!country){
        return this.router.navigateByUrl('')
      }
      this.country = country
      return
    })
  }

  // searchCountry(code: string): void {
  //   this.CountriesService.searchCountryByAlphaCode( code )
  //     .subscribe(res => this.country = res)
  // }
}
