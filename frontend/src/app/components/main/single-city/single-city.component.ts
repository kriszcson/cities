import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/models/city.model';
import { SingleCityService } from 'src/app/services/single-city.service';

@Component({
  selector: 'app-single-city',
  templateUrl: './single-city.component.html',
  styleUrls: ['./single-city.component.scss']
})
export class SingleCityComponent implements OnInit {

  city: City;
  isLoading = true;

  constructor(
    private readonly activatedRouter: ActivatedRoute,
    private readonly router: Router,
    private readonly singleCityService: SingleCityService,
  ) {
    this.activatedRouter.queryParams.subscribe(params => {
      const cityName = params.cityName;
      if (cityName) {
        this.singleCityService.getCityByName(cityName).subscribe((city) => {
          this.city = city;
          if (!this.city) {
            this.router.navigate(['/404']);
          }
          this.isLoading = false;
        })
      }
    })
  }

  ngOnInit(): void {
  }

}
