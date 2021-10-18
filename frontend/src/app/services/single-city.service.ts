import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "src/environments/environment";
import { AuthService } from "./auth.service";
import { User } from "../models/user.model";
import { City } from "../models/city.model";

@Injectable()
export class SingleCityService {
    user: User | null = null;

    constructor(
        private http: HttpClient,
        private readonly authService: AuthService
    ) { }

    getCityByName(cityName: string): Observable<City> {
        return this.http.get<any>(
            `${environment.BACKEND_URL}/cities/${cityName}`)
            .pipe(map((data) => {
                return {
                    id: data.city_id,
                    name: data.city_name,
                    country: data.city_country,
                    fullDesc: data.city_long_desc,
                    shortDesc: data.city_short_desc,
                    imgUrl: data.city_img_url
                }
            }))
    }
}