import { Country } from './../../interfaces/country.interface';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'countries-table',
  templateUrl: './country-table.component.html',
  styles: ``
})
export class CountryTableComponent {
  @Input() countries: Country[] = []
}
