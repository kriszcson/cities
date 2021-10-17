import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from 'src/app/models/city.model';
import { CityService } from 'src/app/services/cities.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  cities: City[];
  isLoading = true;

  constructor(
    private readonly cityService: CityService
  ) {
    this.cityService.getCities().subscribe((cities) => {
      this.cities = cities;
      this.isLoading = false;
    })
  }

  ngOnInit(): void {
  }

}
