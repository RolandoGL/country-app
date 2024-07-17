import { Component, Input } from '@angular/core';
import { Country } from '../../../countries/interfaces/country.interface';

@Component({
  selector: 'shared-country-table',
  templateUrl: './country-table.component.html',
  styles: ``
})
export class CountryTableComponent {
  @Input() public countries: Country[] = []
}
