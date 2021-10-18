import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { exhaustMap, map, take, tap } from "rxjs/operators";

import { environment } from "src/environments/environment";
import { AuthService } from "./auth.service";
import { User } from "../models/user.model";
import { City } from "../models/city.model";

@Injectable()
export class CityService {
    user: User | null = null;

    constructor(
        private http: HttpClient,
        private readonly authService: AuthService
    ) { }

    getCities(): Observable<City[]> {
        return this.http.get<any>(
            `${environment.BACKEND_URL}/cities`)
            .pipe(map((data) => {
                return data.cities.map((city: any) => {
                    return {
                        id: city.city_id,
                        name: city.city_name,
                        country: city.city_country,
                        fullDesc: city.city_long_desc,
                        shortDesc: city.city_short_desc,
                        imgUrl: city.city_img_url
                    }
                })
            }))
    }
}