import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "src/environments/environment";
import { GetUser } from "../models/get.user.model";
import { UpdateUser } from "../models/update.user.model";

@Injectable()
export class UsersService {

    constructor(
        private http: HttpClient,
    ) { }

    getUsers(): Observable<GetUser[]> {
        return this.http.get<any>(
            `${environment.BACKEND_URL}/users`)
            .pipe(map((data) => {
                return data.map((user: any) => {
                    return {
                        id: user.user_id,
                        name: user.user_name,
                        email: user.user_email,
                        password: user.user_password,
                        role: user.user_role,
                    }
                })
            }))
    }

    updateUser(user: UpdateUser): any {
        return this.http.put<UpdateUser>(
            `${environment.BACKEND_URL}/users`, {
            user_email: user.oldEmail,
            user_name: user.name,
            user_password: user.password,
            user_role: user.role,
            user_new_email: user.newEmail
        })
    }

    deleteUser(id: string): any {
        return this.http.delete<any>(
            `${environment.BACKEND_URL}/users/${id}`)
    }
}