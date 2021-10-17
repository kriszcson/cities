import { Component, Input, OnInit } from '@angular/core';
import { City } from 'src/app/models/city.model';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  @Input('cities') cities: City[];

  constructor() { }

  ngOnInit(): void {
  }

  getBgImageSrc(cityName: any): string {
    return `../../../../assets/images/${cityName}`;

  }

}
