import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/app/models/city.model';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  @Input('cities') cities: City[];

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  getBgImageSrc(cityName: any): string {
    return `../../../../assets/images/${cityName}`;

  }

  getSingleCity(cityName: string): void {
    this.router.navigate(['/cities'], { queryParams: { cityName }, queryParamsHandling: 'merge' });
  }
}
